import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,Platform,Loading,
  LoadingController, } from 'ionic-angular';
import { MytripPage } from '../mytrip/mytrip';
import { JointripPage } from '../jointrip/jointrip';
import { TripService } from '../services/trip.service';
import { LocationSelect } from '../location-select/location-select';
import { Mytrips_passengerPage } from '../mytrips_passenger/mytrips_passenger';


@IonicPage()
@Component({
  selector: 'page-mytrips',
  templateUrl: 'mytrips.html',
})
export class MytripsPage {

  public myt:boolean;
  public user_id: number;
  public user_trips;
  public driver_trips;
  public userId:number;
  public check_driver:boolean=true;
  public loading:Loading;

  public current_date = new Date()
  public check_date;
  public currenttime: string = new Date().toLocaleTimeString();
  public check_time;
  public duration;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public tripService: TripService,
              public platform: Platform,
              public loadingCtrl: LoadingController) {
                this.myt = navParams.get('myt');
                this.userId = navParams.get('userId')
                console.log("Userrrr" , this.userId);

                this.platform.registerBackButtonAction(() => {
                  this.navCtrl.setRoot(JointripPage)
                              })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MytripsPage');
    console.log('user id is ' + this.userId);
    this.loading = this.loadingCtrl.create();
    this.loading.present();
    this.tripService.getAllTrips(this.userId).subscribe(data => {
      this.user_trips = JSON.parse(data["_body"]).Data;
    })
    console.log(this.user_trips);

    this.tripService.getDriverTrips(this.userId).subscribe(data => {
      this.driver_trips = JSON.parse(data["_body"]).Data;
      this.driver_trips.forEach(driver_trip => {
        this.check_date = driver_trip.date
        this.duration = (this.current_date.valueOf() - (new Date(this.check_date)).valueOf()) / (3600 * 1000)
        if (this.duration >= 30) {
          this.tripService.deleteTrip(driver_trip.id).subscribe(data => {
          });
        }
      });
    });
    this.loading.dismiss()
  }

  returntojoin(){
    this.navCtrl.setRoot(JointripPage,{userId:this.userId})
  }

  opentripmodule(tlat,tlong,tdate,ttime,ttriptype,tpass1id,tpass2id,tpass3id,id){
    console.log("check_driver  "+this.check_driver);
    this.navCtrl.setRoot(MytripPage,{
  lat:tlat ,
  long: tlong,
  date: tdate,
  time:ttime,
  triptype: ttriptype,
  pass1id:tpass1id,
  pass2id:tpass2id,
  pass3id:tpass3id,
  trip_id:id,
  userId:this.userId,
  check_driver:this.check_driver,
  drivertrips_num:this.driver_trips.length
  });
  }


trips_passenger(){
  this.navCtrl.setRoot(Mytrips_passengerPage,{userId:this.userId})
}

launchLocationview(lat,long){
  const latt:number=lat;
  const longt:number=long;
  this.navCtrl.setRoot(LocationSelect, {
    mylat:latt,
    mylong:longt,
    myt:this.myt=true,
    userId:this.userId,
    check_driver:this.check_driver});
    console.log('check'+lat);
    console.log('check'+long);
}

}
