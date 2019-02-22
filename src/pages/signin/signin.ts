import { Component } from '@angular/core';
import { IonicPage, Loading, LoadingController
 ,Alert, AlertController, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { EmailValidator } from '../../validators/email';
import { AuthProvider } from '../../providers/auth/auth';
import { UserService } from '../services/user.service';
import { JointripPage } from '../jointrip/jointrip';


import { RegesterPage } from '../regester/regester';
import { ResetPasswordPage } from '../reset-password/reset-password';

@IonicPage({
  name: 'signin'
})

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})


export class SigninPage {


public loginForm: FormGroup;
public loading: Loading;
public user: {email: string, password: string} = {email : "" , password : ""};
public myPhotoURL:any = 'assets/imgs/head edited.png';
public user_data:any;

  constructor(public userService: UserService,
  public navCtrl: NavController,
  public loadingCtrl: LoadingController,
  public alertCtrl: AlertController,
  public authProvider: AuthProvider,
  public formBuilder: FormBuilder,
  public navParams: NavParams,
  ) {


   this.loginForm = formBuilder.group({
      email: ['',
      Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['',
      Validators.compose([Validators.required,Validators.minLength(6)])]
    });

}

     ionViewDidLoad() {
    console.log('ionViewDidLoad RegesterPage');
  if(localStorage.getItem("key")){
    this.userService.getUserDetails().subscribe(data=>{
      let user = JSON.parse(data["_body"]).Data;
      console.log("User Data" , user);
      this.navCtrl.setRoot(JointripPage, { userId: user.id});
    });
  }
  }

loginUser(): void {
  if (!this.loginForm.valid) {
    console.log(
      `Form is not valid yet, current value: ${this.loginForm.value}`
    );
  } else {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.user.email = email;
    this.user.password = password;
    console.log(this.user);

    this.loading = this.loadingCtrl.create();
    this.loading.present();

    this.userService.login(this.user).subscribe(data =>{
      console.log(data);
      this.loading.dismiss().then(() => {
        let user = JSON.parse(data["_body"]).Data;
        let token = user.token;
        localStorage.setItem("key" , token);
        console.log("Car : " , user.user_details.car);
        console.log("user : " , user.user_details.id);
        this.user_data=user.user_details;
        console.log("user data"+this.user_data);

          this.navCtrl.setRoot(JointripPage, { userId: user.user_details.id});

      });
    },
    error => {
      console.log(error);

      this.loading.dismiss().then(() => {
        const alert: Alert = this.alertCtrl.create({
          message: JSON.parse(error["_body"]).Message,
          buttons: [{ text: 'Ok', role: 'cancel' }]
        });
        alert.present();
      });

    });


  }
}

goToSignup(): void {
  this.navCtrl.push(RegesterPage);
}

goToResetPassword(): void {
  this.navCtrl.push(ResetPasswordPage);
}
}


