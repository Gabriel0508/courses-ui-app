import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NotificationState } from './notification.reducers';

export const selectNotificationState =
  createFeatureSelector<NotificationState>('notification');

export const selectNotificationMessage = createSelector(
  selectNotificationState,
  (state) => state.message
);

export const selectNotificationType = createSelector(
  selectNotificationState,
  (state) => state.notificationType
);
