import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  authState,
  User,
  updateProfile,
} from '@angular/fire/auth';
import { from, map, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {}

  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  register(
    email: string,
    password: string,
    displayName?: string
  ): Observable<any> {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(
      switchMap((userCredential: any) => {
        // After successful registration, update the user's profile
        if (displayName) {
          return from(
            updateProfile(userCredential.user, {
              displayName: displayName || null, // Use null if no display name is provided
            })
          ).pipe(
            map(() => userCredential) // Return the original userCredential
          );
        } else {
          return of(userCredential); // If no profile info, just return the userCredential
        }
      })
    );
  }

  loginWithGoogle(): Observable<any> {
    const provider = new GoogleAuthProvider();
    return from(signInWithPopup(this.auth, provider));
  }

  logout(): Observable<void> {
    return from(signOut(this.auth));
  }

  logoutPromise(): Promise<void> {
    return signOut(this.auth);
  }

  getAuthState(): Observable<User | null> {
    return authState(this.auth);
  }

  getUser() {
    return this.auth.currentUser;
  }

  updateProfile(displayName: string): Observable<void> {
    const user = this.auth.currentUser;
    if (!user) {
      return from(Promise.reject('No user is currently signed in.'));
    }

    return from(updateProfile(user, { displayName: displayName }));
  }
}
