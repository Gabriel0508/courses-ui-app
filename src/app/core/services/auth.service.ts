import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  authState,
} from '@angular/fire/auth';
import { catchError, from, Observable, of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {}

  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  register(email: string, password: string): Observable<any> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  loginWithGoogle(): Observable<any> {
    const provider = new GoogleAuthProvider();
    return from(signInWithPopup(this.auth, provider));
  }

  logout(){
    // return from(signOut(this.auth)).pipe(
    //   tap(() => console.log('logout goes here'))
    // )
    signOut(this.auth).then((result) => result).catch(error => console.log(error));
    return of(null)
  }

  getAuthState(): Observable<User | null> {
    return authState(this.auth);
  }

  // logout(): Observable<void> {
  //   console.log('Logging out user...');

  //   try {
  //     // Attempt to sign out with direct error handling
  //     return from(signOut(this.auth).catch(error => {
  //       console.error('Firebase signOut error:', error);
  //       throw error;
  //     })).pipe(
  //       catchError(error => {
  //         console.error('Logout error in observable:', error);
  //         // Return the error as an observable instead of throwing
  //         return throwError(() => error?.message || 'Logout failed');
  //       })
  //     );
  //   } catch (error) {
  //     console.error('Unexpected error in logout method:', error);
  //     return throwError(() => 'Unexpected error during logout');
  //   }
  // }

  // logout(): Observable<any> {
  //   return from(Promise.resolve().then(() => signOut(this.auth))).pipe(
  //     catchError((error) => {
  //       console.error('Simple logout error:', error);
  //       return of(null); // Always return success even if there's an error
  //     })
  //   );
  // }

  // logout(): Observable<void> {
  //   return from(
  //     this.ngZone.runOutsideAngular(() => {
  //       return signOut(this.auth);
  //     })
  //   );
  // }
}
