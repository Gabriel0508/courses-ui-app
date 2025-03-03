import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from '../core/services/auth.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.getAuthState().pipe(
    take(1),
    map((isAuthenticated) => {
      console.log('before map');
      
      if (!isAuthenticated) {
        console.log('access denied');
        router.navigate(['/login']);
        return false;
      }
      return true;
    })
  );
};
