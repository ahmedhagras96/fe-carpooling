import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Loading, LoadingController,Alert,
  AlertController,ToastController,} from 'ionic-angular';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { CarService } from '../services/car.service';
import { JointripPage } from '../jointrip/jointrip';
import { MaketripPage } from '../maketrip/maketrip';


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
   public car: any = {};
   public first_time:boolean=false;
   public userId:number;
   public no_car:boolean=false;

  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public formBuilder: FormBuilder,
     public loadingCtrl: LoadingController,
     public alertCtrl: AlertController,
     public toastCtrl: ToastController,
     public carService: CarService)

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
    this.userId = navParams.get("userId");
    this.no_car = navParams.get("no_car");
  }

  carinfo(): void {
    console.log("I'm here in carinfo");


     if (!this.carForm.valid) {
       console.log(
         `Need to complete the form, current value: ${this.carForm.value}`
       );
     } else {
       console.log("I'm here in else");

       this.car["number"] = this.carForm.value.cnumber;
       this.car["type"] = this.carForm.value.ctype;
       this.car["color"] = this.carForm.value.ccolor;
       this.car["model"] = this.carForm.value.cmodel;

       this.carService.createCar(this.car)
       .subscribe(
         data => {
           this.loading.dismiss().then(() => {
             console.log(data);
             if(this.no_car==true){
              this.navCtrl.setRoot(JointripPage,{userId:this.userId})
             }
             else{
             this.navCtrl.setRoot(MaketripPage,{first_time:this.first_time=true,userId:this.userId});
            }
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
    console.log('user id is '+this.userId);


}

}
