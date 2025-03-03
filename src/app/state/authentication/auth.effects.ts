import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from 'src/app/core/services/auth.service';
import { AuthActions } from './auth.actions';
import {
  catchError,
  exhaustMap,
  from,
  map,
  mergeMap,
  of,
  switchMap,
  tap,
} from 'rxjs';

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
          map(() =>
            AuthActions.loginSuccess({ user: this.authService.getUser() })
          ),
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

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      mergeMap(() =>
        from(this.authService.logout()).pipe(
          map(() => AuthActions.logoutSuccess()),
          catchError((error) => of(AuthActions.logoutFailure({ error })))
        )
      )
    )
  );

  // getAuthState$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(AuthActions.getAuthState),
  //     exhaustMap(() =>
  //       this.authService.getAuthState().pipe(
  //         map((user) => {
  //           console.log('user', user);
  //           return user
  //             ? AuthActions.loginSuccess({ user })
  //             : AuthActions.logoutSuccess();
  //         }),
  //         catchError((error) => of(AuthActions.loginFailure({ error })))
  //       )
  //     )
  //   )
  // );

  authSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          AuthActions.loginSuccess,
          AuthActions.loginWithGoogleSuccess,
          AuthActions.registerSuccess
        ),
        exhaustMap(() => this.router.navigate(['/dashboard']))
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
