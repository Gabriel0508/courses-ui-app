import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, map } from 'rxjs';
import { showNotificationActions } from './notification.actions';

@Injectable()
export class NotificationEffects {
  showNotification$ = createEffect(() =>
    this.actions$.pipe(
      ofType(showNotificationActions.showNotification),
      tap(({ message, notificationType }) => {
        this.snackBar.open(message, '✕', {
          duration: 5000,
          panelClass: [`${notificationType}-snackbar`],
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }),
      map(() => showNotificationActions.clearNotification())
    )
  );

  constructor(private actions$: Actions, private snackBar: MatSnackBar) {}
}
