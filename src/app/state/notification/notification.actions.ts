import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const showNotificationActions = createActionGroup({
  source: 'Notification',
  events: {
    'show notification': props<{
      message: string;
      notificationType: 'success' | 'error' | 'warn';
    }>(),
    'clear notification': emptyProps(),
  },
});
