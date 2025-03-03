import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { User } from 'firebase/auth';

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,

  on(AuthActions.login, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(AuthActions.loginSuccess, (state, { user }) => {
    let copy = JSON.parse(JSON.stringify(user));
    return{
    ...state,
    user: copy,
    isLoading: false,
    error: null,
  }}),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),

  on(AuthActions.register, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(AuthActions.registerSuccess, (state, { user }) => ({
    ...state,
    user,
    isLoading: false,
    error: null,
  })),
  on(AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  on(AuthActions.loginWithGoogle, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(AuthActions.loginWithGoogleSuccess, (state, { user }) => ({
    ...state,
    user,
    isLoading: false,
    error: null,
  })),
  on(AuthActions.loginWithGoogleFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  on(AuthActions.logout, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(AuthActions.logoutSuccess, (state) => ({
    ...state,
    user: null,
    isLoading: false,
    error: null,
  })),
  on(AuthActions.logoutFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  //TODO: check if this is needed
  on(AuthActions.authStateChanged, (state, { user }) => ({
    ...state,
    user: user ? {...user } : null,
    isLoading: false,
    error: null,
  }))
);
