import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Alert,AlertController,LoadingController,Loading, } from 'ionic-angular';


/**
 * Generated class for the SchedulePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-schedule',
  templateUrl: 'maketrip.html',
})
export class MaketripPage {
  public loading: Loading;
  public isenable:boolean;

  public day: string;
  public time:string;
  public type:string;



  times = ['8:30','10:30','12:30','2:30','4:30','6:30'];
  days = ['Saterday','Sunday','Monday','Tuseday','Wensday','Thursday'];
  Types = ['Go To Academy','Return From Academy'];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,) {


  }


ionViewDidLoad() {
      console.log('ionViewDidLoad SchedulePage');
    ;}









}
