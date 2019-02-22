import { Component ,ChangeDetectorRef} from '@angular/core';
import { IonicPage, NavController, NavParams, Loading,
  LoadingController,Alert,AlertController,ToastController,ActionSheetController, Platform } from 'ionic-angular';
import { FormBuilder,FormControl,FormGroup, Validators } from '@angular/forms';

import { EmailValidator } from '../../validators/email';
import { idvalidator } from '../../validators/id';
import { collegeval } from '../../validators/collegeval';

// import { AngularFireAuth } from 'angularfire2/auth';

// import { pimage } from '../../providers/pimage/pimage';
import { AuthProvider } from '../../providers/auth/auth';
import { UserService } from '../services/user.service';
import { SetlocationPage } from '../setlocation/setlocation';

@IonicPage({
  name: 'signup'
})

@Component({
  selector: 'page-regester',
  templateUrl: 'regester.html',
})
export class RegesterPage  {

   public signupForm: FormGroup;
   public loading: Loading;
   public uuid: string;
   public myPhoto :any;
   public user : any = {};
   public myPhotoURL:any = 'assets/imgs/head edited.png';
   public car:object ;

  form: FormGroup;
  collages = ['Engineer', 'ComputerScience'];
  depincolleges = {
   Engineer: ["Construction and Building Engineering " , "Architectural Engineering", "Computer Engineering",
       "Electrical & Control Engineering", "Electronics & Communications Engineering", "Mechanical Engineering"],
   ComputerScience: ["Computer Science Program" , "Information System Program",
      "Multimedia & Graphics Program","Software Engineering Program"]};
   departments = [];

  constructor(
   public userService: UserService,
   public navCtrl: NavController,
   public navParams: NavParams,
  //  public auth:AngularFireAuth,
   public authProvider: AuthProvider,
  //  public pimage: pimage,
   public formBuilder: FormBuilder,
   public loadingCtrl: LoadingController,
   public alertCtrl: AlertController,
   public toastCtrl: ToastController,
   fb: FormBuilder,
   private _cdr: ChangeDetectorRef,
   public actionSheetCtrl: ActionSheetController,
   ) {


      this.signupForm = formBuilder.group({
        email: ['',
          Validators.compose([Validators.required,EmailValidator.isValid])],
        password: ['',
          Validators.compose([Validators.required,Validators.minLength(6)])],
        confirmpassword: ['',
          Validators.compose([Validators.required,Validators.minLength(6)])],
        name: ['',
          Validators.compose([Validators.required,Validators.maxLength(20)])],
        id: ['',
          Validators.compose([Validators.required,idvalidator.isValid])],
        phone: ['',
          Validators.compose([Validators.required,Validators.maxLength(13),Validators.minLength(7)])],
        college: new FormControl([''], Validators.compose([Validators.required,collegeval.isValid])),
        department: new FormControl([''], Validators.compose([Validators.required,collegeval.isValid])),

      },{validator: this.matchingPasswords('password', 'confirmpassword')});

 }



signupUser(): void {
 console.log("I'm here in signup");
  if (!this.signupForm.valid) {
    console.log(
      `Need to complete the form, current value: ${this.signupForm.value}`
    );
  } else {
    this.user['name'] = this.signupForm.value.name;
    this.user['email'] = this.signupForm.value.email;
    this.user['phone'] = this.signupForm.value.phone
    this.user['code'] = this.signupForm.value.id;
    this.user['password'] = this.signupForm.value.password;
    this.user['confirm_password'] = this.signupForm.value.confirmpassword;
    this.user['collage'] = this.signupForm.value.college;
    this.user['department'] = this.signupForm.value.department;

    this.loading = this.loadingCtrl.create();
    this.loading.present();

    this.userService.register(this.user)
    .subscribe(
      user => {
        this.loading.dismiss().then(() => {
  let user_data = JSON.parse(user["_body"]).Data;

        localStorage.setItem("key" , user_data["token"]);

        this.navCtrl.setRoot(SetlocationPage, { userId: user_data["user_details"].id});
        });

      },
      error => {
        console.log(error);
        if(error["status"] == 500){
          this.loading.dismiss().then(() => {
            const alert: Alert = this.alertCtrl.create({
              message: "Invalid Data [Duplicate Email or Id] !!",
              buttons: [{ text: "Ok", role: "cancel" }],

            });
            alert.present();
          });
        }else{
          this.loading.dismiss().then(() => {
            const alert: Alert = this.alertCtrl.create({
              message: JSON.parse(error["_body"]).Message,
              buttons: [{ text: "Ok", role: "cancel" }],

            });
            alert.present();
          });
        }

      }
    );

  }

}

matchingPasswords(passwordKey: string, confirmpasswordKey: string) {
    // TODO maybe use this https://github.com/yuyang041060120/ng2-validation#notequalto-1
    return (group: FormGroup): {[key: string]: any} => {
      let passwordinput = group.controls[passwordKey];
      let confirmpasswordinput = group.controls[confirmpasswordKey];

      if (passwordinput.value !== confirmpasswordinput.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }


  onCollegeChange(): void {
    let college = this.signupForm.get('college').value;
    this.departments = this.depincolleges[college];
    this._cdr.detectChanges();
    }




 ionViewDidLoad() {

  console.log('ionViewDidLoad RegesterPage');
  }





}


