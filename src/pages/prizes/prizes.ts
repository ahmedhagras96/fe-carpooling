import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Alert,AlertController, Loading, LoadingController } from 'ionic-angular';
import { UserService } from '../services/user.service';
import { JointripPage } from '../jointrip/jointrip';



@IonicPage()
@Component({
  selector: 'page-prizes',
  templateUrl: 'prizes.html',
})
export class PrizesPage {

public userId:number;
public myPhotoURL:any = 'assets/imgs/head edited.png';
public user_pts:number;
public all_prizes:any;
public loading: Loading;
public user: any = {};

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public userService:UserService) {
    this.userId = navParams.get('userId')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrizesPage');
    console.log('user id is '+this.userId);

    this.userService.getUserDetails().subscribe(data=>{
      this.user = JSON.parse(data["_body"]).Data;
    });

    this.userService.getAllPrizes().subscribe(data=>{
      this.all_prizes = JSON.parse(data["_body"]).Data;

      console.log("All Prizes : ", this.all_prizes);
    })
  }


  returntojoin(){
    this.navCtrl.setRoot(JointripPage,{userId:this.userId})
  }

  alert_prize(pts): void {
    const alert: Alert = this.alertCtrl.create({
      message: "Are you sure you get these prize these prize cost "+ pts+
       " point thats will subtract from your points",

      buttons: [
        { text: "No" },
        {
          text: "Yes",
          handler: data => {
             this.get_prize(pts);
          }
        }
      ]
    });
    alert.present();
  }

  public get_prize(pts){

    this.loading = this.loadingCtrl.create();
    this.loading.present();


    this.userService.givePrize({"points" : pts}).subscribe(data=>{
      this.loading.dismiss().then(() => {
        const alert: Alert = this.alertCtrl.create({
          message: JSON.parse(data["_body"]).Message + " , Your new Points :  " + JSON.parse(data["_body"]).Data,
          buttons: [{ text: 'Ok',
          handler: data => {
             this.navCtrl.setRoot(this.navCtrl.getActive().component,{userId:this.userId})
          }}]
        });
        alert.present();
      });
    },
    error=>{
      console.log(error);

      this.loading.dismiss().then(() => {
        const alert: Alert = this.alertCtrl.create({
          message: JSON.parse(error["_body"]).Message,
          buttons: [{ text: 'Ok', role: 'cancel' }]
        });
        alert.present();
      });
    });
console.log('your pts is '+pts)
}

}
