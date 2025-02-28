import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';
import * as _ from 'lodash-es';

export const getAuthState = createFeatureSelector<AuthState>('auth');

export const selectCurrentUser = createSelector(
  getAuthState,
  (state: AuthState) => (state.user ? _.cloneDeep(state.user) : null)
);

export const selectIsAuthenticated = createSelector(
  selectCurrentUser,
  (user) => !!user
);

export const selectIsLoading = createSelector(
  getAuthState,
  (state: AuthState) => state.isLoading
);

export const selectAuthError = createSelector(
  getAuthState,
  (state: AuthState) => state.error
);
