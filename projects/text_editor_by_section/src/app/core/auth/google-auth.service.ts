import { Injectable } from '@angular/core';

import { auth } from 'firebase/app';
import 'firebase/auth';
import {
  AngularFirestoreDocument,
  AngularFirestore
} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { User } from './user.model';
import { Store } from '@ngrx/store';
import { ActionAuthLogin } from './auth.actions';
import { LocalStorageService } from '../core.module';
import { AUTH_KEY } from './auth.effects';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  public authState: any;
  public user$: Observable<firebase.User>;
  logedIn: boolean;

  constructor(
    private storageService: LocalStorageService,
    private store: Store,
    private router: Router,
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) {
    this.user$ = afAuth.authState;

    if (this.user$) {
      this.logedIn = true;
    } else {
      this.logedIn = false;
    }
  }

  logout() {
    const uid = this.afAuth.currentUser.then(authState => {
      let uid = authState.uid;
      console.log(authState);
      const status = 'offline';
      this.setStatus(uid, status);
      this.authState = null;
      this.afAuth.signOut().then(() => this.router.navigate(['/']));
    });
  }

  setStatus(uid: string, status: string) {
    const path = 'users2/' + uid;
    const data = {
      status
    };
    this.db.object(path).update(data);
  }
  googleSignIn() {
    const provider = new auth.GoogleAuthProvider().addScope('email');
    this.oAuthLogin(provider);
  }

  oAuthLogin = async provider => {
    const credential: any = await this.afAuth.signInWithPopup(provider);
    if (credential) {
      console.log('displayName');
      console.log(credential.user.displayName);
      console.log('credential.user.displayName');
      console.log(credential.user.uid);
      console.log('credential');
      console.log(credential);
      this.updateUserData({
        uid: credential.user.uid,
        email: credential.additionalUserInfo.profile.email,
        displayName: credential.user.displayName,
        photoURL: ''
      });
      const status = 'online';
      this.setUserData(
        credential.additionalUserInfo.profile.email,
        credential.user.displayName,
        status,
        credential.user.uid
      );
      this.authState = credential;
      this.storageService.setItem(AUTH_KEY, { isAuthenticated: true });
      this.store.dispatch(new ActionAuthLogin());
    }
  };

  private updateUserData({ uid, email, displayName, photoURL }: User) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users2/${uid}`
    );

    const data = {
      uid,
      email,
      displayName,
      photoURL
    };

    return userRef.set(data, { merge: true });
  }
  setUserData(email: string, displayName: string, status: string, uid) {
    const path = `users2/${uid}`;
    const data = {
      status
    };
    this.db.object(path).update(data);
  }

  get() {
    this.user$.pipe(take(1)).subscribe((user: User) => {
      const path = `users2/${user.uid}`;

      this.db
        .object(path)
        .valueChanges()
        .pipe(take(1))
        .subscribe(data => {
          console.log('data');
          console.log(data);
        });
    });
  }
}
