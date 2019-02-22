import { Component ,ChangeDetectorRef} from '@angular/core';
import { IonicPage, NavController, NavParams, Loading,
  LoadingController,Alert,AlertController,ToastController,ActionSheetController, Platform } from 'ionic-angular';
import { FormBuilder,FormControl,FormGroup, Validators } from '@angular/forms';

import { EmailValidator } from '../../validators/email';
import { idvalidator } from '../../validators/id';
import { collegeval } from '../../validators/collegeval';

import { AngularFireAuth } from 'angularfire2/auth';

import { pimage } from '../../providers/pimage/pimage';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import firebase from 'firebase';
import { CarownershipPage } from '../carownership/carownership';

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

  form: FormGroup;
 collages = ['Engineer', 'ComputerScience'];
  depincolleges = {
   Engineer: ["Construction and Building Engineering " , "Architectural Engineering", "Computer Engineering",
       "Electrical & Control Engineering", "Electronics & Communications Engineering", "Mechanical Engineering"],
   ComputerScience: ["Computer Science Program" , "Information System Program",
      "Multimedia & Graphics Program","Software Engineering Program"]};
   departments = [];

  constructor(
   public navCtrl: NavController,
   public navParams: NavParams,
   public auth:AngularFireAuth,
   public authProvider: AuthProvider,
   public pimage: pimage,
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



 openMenu() {
  let actionSheet = this.actionSheetCtrl.create({
    title: 'Add your picture with',
    cssClass: 'action-sheets-basic-page',
    buttons: [
      {
        text: 'Camera',
        role: 'takePhoto()',

        handler: () => {
          this.pimage. openCamera();
          console.log('camera clicked');
        }
      },
      {
        text: 'Gallery',
        role: 'selectPhoto()',
        handler: () => {
          this.pimage. openImagePickerCrop();
          console.log('Gallery clicked');
        }
      },

      {
        text: 'Cancel',
        role: 'cancel', // will always sort to be on the bottom
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ]
  });
  actionSheet.present();
}







signupUser(): void {
 console.log("I'm here in signup");


  if (!this.signupForm.valid) {
    console.log(
      `Need to complete the form, current value: ${this.signupForm.value}`
    );
  } else {
    console.log("I'm here in else");
    const email: string = this.signupForm.value.email;
    const password: string = this.signupForm.value.password;
    const name: string = this.signupForm.value.name;
    const id: string = this.signupForm.value.id;
    const phone: string = this.signupForm.value.phone;
    const confirmpassword: string = this.signupForm.value.confirmpassword;
    const college: string = this.signupForm.value.college;
    const department: string = this.signupForm.value.department;
    this.pimage.uploadPhoto(this.myPhoto);
    this.uuid=this.pimage.photoUIID;
    console.log(this.uuid);



    this.authProvider.signupUser(email, password,confirmpassword, name, id, phone,college,
      department,this.uuid)
    .then(
      user => {
        this.loading.dismiss().then(() => {
          this.navCtrl.setRoot(CarownershipPage);
        });
      },
      error => {
        this.loading.dismiss().then(() => {
          const alert: Alert = this.alertCtrl.create({
            message: error.message,
            buttons: [{ text: "Ok", role: "cancel" }]
          });
          alert.present();
        });
      }
    );
    this.loading = this.loadingCtrl.create();
    this.loading.present();
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
    console.log("Depart");
    let college = this.signupForm.get('college').value;
    this.departments = this.depincolleges[college];
    this._cdr.detectChanges();
    console.log("Depart" );
    console.log("Test", this.departments);
    }




 ionViewDidLoad() {

  console.log('ionViewDidLoad RegesterPage');
  }





}


