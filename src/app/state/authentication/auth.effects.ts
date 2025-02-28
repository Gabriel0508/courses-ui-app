import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from 'src/app/core/services/auth.service';
import { AuthActions } from './auth.actions';
import { catchError, exhaustMap, map, mergeMap, of, switchMap, tap } from 'rxjs';

@Injectable()
export class AuthEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap((action) =>
        this.authService.login(action.email, action.password).pipe(
          tap(() => console.log('Firebase login successful')),
          map((user) => AuthActions.loginSuccess({ user })),
          catchError((error) => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      exhaustMap((action) =>
        this.authService.register(action.email, action.password).pipe(
          //TODO: check the display name
          map((user) => AuthActions.registerSuccess({ user })),
          catchError((error) => of(AuthActions.registerFailure({ error })))
        )
      )
    )
  );

  loginWithGoogle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginWithGoogle),
      exhaustMap(() =>
        this.authService.loginWithGoogle().pipe(
          map((user) => AuthActions.loginWithGoogleSuccess({ user })),
          catchError((error) =>
            of(AuthActions.loginWithGoogleFailure({ error }))
          )
        )
      )
    )
  );

  // logout$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(AuthActions.logout),
  //     mergeMap(() =>
  //       this.authService.logout().pipe(
  //         map(() => AuthActions.logoutSuccess()),
  //         catchError((error) =>
  //           of(AuthActions.logoutFailure({ error }))
  //         )
  //       )
  //     )
  //   )
  // );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => console.log('Logout action dispatched')),
      exhaustMap(() =>
        this.authService.logout().pipe(
          tap(() => console.log('Logout successful')),
          map(() => AuthActions.logoutSuccess()),
          catchError((error) => {
            console.error('Logout error in effect');
            return of(AuthActions.logoutFailure({ error: 'Unknown error' }));
          })
        )
      )
    )
  );

  getAuthState$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getAuthState),
      switchMap(() =>
        this.authService.getAuthState().pipe(
          map((user) => {
            console.log('user', user);
            return user
              ? AuthActions.loginSuccess({ user })
              : AuthActions.logoutSuccess();
          }),
          catchError((error) => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );

  authSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          AuthActions.loginSuccess,
          AuthActions.loginWithGoogleSuccess,
          AuthActions.registerSuccess
        ),
        tap(() => this.router.navigate(['/dashboard']))
      ),
    { dispatch: false }
  );

  logoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logoutSuccess),
        tap(() => this.router.navigate(['/login']))
      ),
    { dispatch: false }
  );
}
