import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Loading, LoadingController,Alert,
  AlertController,ToastController,} from 'ionic-angular';
import { FormBuilder,FormControl,FormGroup, Validators } from '@angular/forms';
import { ProfileProvider } from "../../providers/profile/profile";
import { HomePage } from '../home/home';
/**
 * Generated class for the CarinfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-carinfo',
  templateUrl: 'carinfo.html',
})
export class CarinfoPage {
  public carForm: FormGroup;
   public loading: Loading;
   public college: string ;
   public userProfile: any;

  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public formBuilder: FormBuilder,
     public loadingCtrl: LoadingController,
     public alertCtrl: AlertController,
     public toastCtrl: ToastController,
     public profileProvider: ProfileProvider,)

    {
    this.carForm = formBuilder.group({
        ctype: ['',
        Validators.compose([Validators.required])],
        cmodel: ['',
        Validators.compose([Validators.required])],
        ccolor: ['',
        Validators.compose([Validators.required])],
        cnumber: ['',
        Validators.compose([Validators.required])],

    })
  }

  carinfo(): void {
    console.log("I'm here in carinfo");


     if (!this.carForm.valid) {
       console.log(
         `Need to complete the form, current value: ${this.carForm.value}`
       );
     } else {
       console.log("I'm here in else");
       const ctype: string = this.carForm.value.ctype;
       const cmodel: string = this.carForm.value.cmodel;
       const ccolor: string = this.carForm.value.ccolor;
       const cnumber:number = this.carForm.value.cnumber;

       this.profileProvider.updatecarinfo(ctype, cmodel,ccolor, cnumber)
       .then(
         user => {
           this.loading.dismiss().then(() => {
             this.navCtrl.setRoot(HomePage);
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


  ionViewDidLoad() {
    console.log('ionViewDidLoad CarinfoPage');
}

}
