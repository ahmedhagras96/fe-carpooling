import { Injectable } from '@angular/core';
import 'firebase/auth';
import 'firebase/database';
import 'rxjs/add/operator/toPromise';
import 'firebase/storage';
import firebase from 'firebase';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {



  constructor( ) { }


  loginUser(email: string, password: string): Promise<any> {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

  signupUser(email: string, password: string,confirmpassword:string,
             name: string, id: string, phone:string,college:string,
             department:string,uuid:string): Promise<any> {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(newUserCredential => {
      firebase
        .database()
        .ref(`/userProfile/${newUserCredential.user.uid}`)
        .set({email:email,password:password,
              name:name,id:id,phone:phone,college:college,
              department:department,uuid:uuid});


    })
    .catch(error => {
      console.error({error});
      throw new Error(error);
    });
}






resetPassword(email: string): Promise<void> {
  return firebase.auth().sendPasswordResetEmail(email);
}

logoutUser(): Promise<void> {
  return firebase.auth().signOut();
}

}
