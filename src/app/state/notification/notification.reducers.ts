import { createReducer, on } from '@ngrx/store';
import { showNotificationActions } from './notification.actions';

export interface NotificationState {
  message: string | null;
  notificationType: 'success' | 'error' | 'warn' | null;
}

export const initialState: NotificationState = {
  message: null,
  notificationType: null,
};

export const notificationReducer = createReducer(
  initialState,
  on(
    showNotificationActions.showNotification,
    (state, { message, notificationType }) => ({
      message,
      notificationType,
    })
  ),
  on(showNotificationActions.clearNotification, () => initialState)
);
