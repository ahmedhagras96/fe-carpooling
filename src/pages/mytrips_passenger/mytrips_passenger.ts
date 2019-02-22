import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Loading,
  LoadingController, } from 'ionic-angular';
import { TripService } from '../services/trip.service';
import { MytripPage } from '../mytrip/mytrip';
import { JointripPage } from '../jointrip/jointrip';
import { LocationSelect } from '../location-select/location-select';
import { MytripsPage } from '../mytrips_driver/mytrips';

@IonicPage()
@Component({
  selector: 'page-mytrips_passenger',
  templateUrl: 'mytrips_passenger.html',
})
export class Mytrips_passengerPage {

  public myt:boolean;
  public user_trips;
  public user_trips_location;
  public userId: number;
  public check_passenger:boolean=true;
  public loading:Loading

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public tripService: TripService,
              public loadingCtrl: LoadingController,
            ) { this.myt = navParams.get('myt');
            this.userId = navParams.get('userId')

  }



  ionViewDidLoad() {
    console.log('user id is '+this.userId);
    console.log('ionViewDidLoad TripPage');
    this.loading = this.loadingCtrl.create();
    this.loading.present();
    this.tripService.getAllTrips(this.userId).subscribe(data => {
      this.loading.dismiss().then(() =>{
      this.user_trips = JSON.parse(data["_body"]).Data;})
      console.log("User Trips : ", this.user_trips);
      console.log("User Trips location : ", this.user_trips_location);
      console.log('user id is '+this.userId);
    });

  }

  returntojoin(){
    this.navCtrl.setRoot(JointripPage,{userId:this.userId})
  }

  opentripmodule(tdate,ttime,ttriptype,id){
    console.log('trippp id is '+id);
    this.navCtrl.setRoot(MytripPage,{
  date: tdate,
  time:ttime,
  triptype: ttriptype,
  trip_id:id,
  userId:this.userId,
  check_passenger:this.check_passenger
  });
  }

  trips_driver(){
    this.navCtrl.setRoot(MytripsPage,{user_id:this.userId})
  }

  launchLocationview(lat,long){
    const latt:number=lat;
    const longt:number=long;
    this.navCtrl.setRoot(LocationSelect, {
      mylat:latt,mylong:longt,myt:this.myt=true,check_passenger:this.check_passenger,userId:this.userId});
      console.log('check'+lat);
      console.log('check'+long);
  }

}
