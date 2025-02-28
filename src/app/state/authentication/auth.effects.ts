import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from 'src/app/core/services/auth.service';
import { AuthActions } from './auth.actions';
import { catchError, exhaustMap, map, of, switchMap, tap } from 'rxjs';

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
          map((result) => AuthActions.loginSuccess({ user: result })),
          catchError((error) =>
            of(AuthActions.loginFailure({ error: error.message }))
          )
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      exhaustMap((action) =>
        this.authService.register(action.email, action.password).pipe(
          map((result) => AuthActions.registerSuccess({ user: result.user })),
          catchError((error) =>
            of(AuthActions.registerFailure({ error: error.message }))
          )
        )
      )

    )
  );

  loginWithGoogle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginWithGoogle),
      exhaustMap(() =>
        this.authService.loginWithGoogle().pipe(
          map((result) =>
            AuthActions.loginWithGoogleSuccess({ user: result.user })
          ),
          catchError((error) =>
            of(AuthActions.loginWithGoogleFailure({ error: error.message }))
          )
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      exhaustMap(() => {
        console.log('logout operator');
        return this.authService.logout().pipe(
          tap(() => localStorage.removeItem('authToken')),
          map(() => AuthActions.logoutSuccess()),
          catchError((error) =>
            of(AuthActions.logoutFailure({ error: error.message }))
          )
        );
      })
    )
  );

  // logout$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(AuthActions.logout),
  //     switchMap(() =>
  //       this.authService.logout().pipe(
  //         map((success) => {
  //           if (success) {
  //             // Optionally navigate to the login page
  //             this.router.navigate(['/login']);
  //             return AuthActions.logoutSuccess();
  //           } else {
  //             return AuthActions.logoutFailure({ error: 'Logout failed' });
  //           }
  //         }),
  //         catchError((error) => of(AuthActions.logoutFailure({ error: error })))
  //       )
  //     )
  //   )
  // );

  // logout$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(AuthActions.logout),
  //       tap(() => {
  //         localStorage.removeItem('authToken');
  //         console.log('Logout effect triggered');
  //       })
  //     ),
  //   { dispatch: false }
  // );

  getAuthState$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getAuthState),
      switchMap(() => {
        console.log('logout operator');
        return this.authService.getAuthState().pipe(
          tap(() => console.log('Firebase authState successful')),
          map((user) => AuthActions.authStateChanged({ user }))
        );
      })
    )
  );

  authSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          AuthActions.loginSuccess,
          AuthActions.loginWithGoogleSuccess,
          AuthActions.registerSuccess,
          AuthActions.getAuthState
        ),
        tap(() => this.router.navigate(['/home']))
      ),
    { dispatch: false }
  );

  // logoutSuccess$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(AuthActions.logoutSuccess),
  //       tap(() => this.router.navigate(['/login']))
  //     ),
  //   { dispatch: false }
  // );
}
