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
  UserCredential,
} from '@angular/fire/auth';
import { from, map, Observable } from 'rxjs';

interface AuthResult {
  user: User | null;
  credential?: any;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {}

  // login(email: string, password: string): Observable<any> {
  //   return from(signInWithEmailAndPassword(this.auth, email, password));
  // }
  login(email: string, password: string): Observable<AuthResult> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      map((userCredential: UserCredential) => ({
        user: userCredential.user,
        credential: userCredential
      }))
    );
  }

  register(email: string, password: string): Observable<any> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
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
}
