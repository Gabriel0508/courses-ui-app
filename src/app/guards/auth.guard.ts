import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated } from '../state/authentication/auth.selector';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectIsAuthenticated).pipe(
    take(1),
    map((isAuthenticated) => {
      if (!isAuthenticated) {
        console.log('access denied');
        router.navigate(['/login']);
        return false;
      }
      return true;
    })
  );
};
