
// import { Injectable } from '@angular/core';
// import firebase, { User } from 'firebase/app';
// import 'firebase/database';
// import 'firebase/auth';

// /*
//   Generated class for the ProfileProvider provider.

//   See https://angular.io/guide/dependency-injection for more info on providers
//   and Angular DI.
// */
// @Injectable()
// export class ProfileProvider {
//   public userProfile: firebase.database.Reference;
//   public currentUser: User;

//   constructor() { firebase.auth().onAuthStateChanged( user => {
//     if(user){
//       this.currentUser = user;
//       this.userProfile = firebase.database().ref(`/userProfile/${user.uid}`);
//     }
//   });
//   }

//   getUserProfile(): firebase.database.Reference{
//     return this.userProfile;
//   }

//   updatecarinfo(ctype:string,cmodel:string,ccolor:string,cnumber:number): Promise<any> {
//     return this.userProfile.update({ cartype:ctype,carmodel:cmodel,carcolor:ccolor,carnumber:cnumber });
//   }


//   updateName(name:string): Promise<any> {
//     return this.userProfile.update({ name });
//   }
//   updateid(id:string): Promise<any> {
//     return this.userProfile.update({id});
//   }
//   updatephone(phone:string): Promise<any> {
//     return this.userProfile.update({ phone });
//   }
//   updatectype(cartype:string): Promise<any> {
//     return this.userProfile.update({ cartype });
//   }
//   updatecmodel(carmodel:number): Promise<any> {
//     return this.userProfile.update({ carmodel });
//   }
//   updateccolor(carcolor:string): Promise<any> {
//     return this.userProfile.update({ carcolor });
//   }
//   updatecnumber(carnumber:number): Promise<any> {
//     return this.userProfile.update({ carnumber });
//   }
//   updatecollege(college:string): Promise<any> {
//     return this.userProfile.update({ college });
//   }
//   updatedep(department:string): Promise<any> {
//     return this.userProfile.update({ department });
//   }

//   updateEmail(newEmail: string, password: string): Promise<any> {
//     const credential:firebase.auth.AuthCredential = firebase.auth.
//       EmailAuthProvider.credential(
//         this.currentUser.email,
//         password
//       );
//     return this.currentUser
//       .reauthenticateWithCredential(credential)
//       .then(user => {
//         this.currentUser.updateEmail(newEmail).then(user => {
//           this.userProfile.update({ email: newEmail });
//         });
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   }

//   updatePassword(newPassword: string, oldPassword: string): Promise<any> {
//     const credential:firebase.auth.AuthCredential = firebase.auth
//       .EmailAuthProvider.credential(
//         this.currentUser.email,
//         oldPassword
//       );

//     return this.currentUser
//       .reauthenticateWithCredential(credential)
//       .then(user => {
//         this.currentUser.updatePassword(newPassword).then(user => {
//           console.log('Password Changed');
//         });
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   }

// }
