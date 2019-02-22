import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,Loading, LoadingController
  , } from 'ionic-angular';
import { TripService } from '../services/trip.service';
import { JointripPage } from '../jointrip/jointrip';


@IonicPage()
@Component({
  selector: 'page-tripdetails',

  templateUrl: 'tripdetails.html',
})
export class TripdetailsPage {

  public trip_details: any ;
  public trip_id:number;
  public jt:boolean;
  public loading: Loading;
  public userId: number;
  public passengers:any;

  public same_user: boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public tripService: TripService,
              public loadingCtrl: LoadingController,) {
              this.trip_id = navParams.get('tid');
              this.userId = navParams.get('userId');

  }
public trip_type:string;
public trip_date:string;
public currentDate: string = new Date().toLocaleDateString();
public trip_time:string;
public trip_drivername:string;
public trip_driverphone:string;
public trip_drivercollage:string;
public trip_driverdepartment:string;
public car_type:string;
public car_module:string;
public car_color:string;
public car_number:string;
public driver_id:number;
public user_trips;
public user_joined:boolean=false;
public passengers_length:number;

public driver_trips;
  public driver_length:number;
  public duration1;
  public duration2;
  public duration3;
  public duration4;
  public duration5;
  public duration6;
  public same_passenger_trip:boolean=false;
  public same_driver_trip:boolean=false;
  public same_passenger_type:boolean=false;
  public same_driver_type:boolean=false;
  public current_date = new Date()

  ionViewDidLoad() {
    console.log('ionViewDidLoad TripdetailsPage');
    this.loading = this.loadingCtrl.create();
    this.loading.present();

    this.tripService.getTripDetails(this.trip_id).subscribe(data => {
      this.trip_details = JSON.parse(data['_body']).Data;
      console.log('tripdetailsresult', this.trip_details);
      this.trip_type = this.trip_details.trip.type
      this.trip_date = this.trip_details.trip.date
      this.trip_time = this.trip_details.trip.time
      this.trip_drivername = this.trip_details.trip.driver.name
      this.trip_driverphone = this.trip_details.trip.driver.phone
      this.trip_drivercollage = this.trip_details.trip.driver.collage
      this.trip_driverdepartment = this.trip_details.trip.driver.department
      this.car_type = this.trip_details.car.type
      this.car_module = this.trip_details.car.model
      this.car_color = this.trip_details.car.color
      this.car_number = this.trip_details.car.number
      this.driver_id = this.trip_details.trip.driver.id
      this.passengers = this.trip_details.passes
      this.passengers_length = this.passengers.length
    });

    this.tripService.getDriverTrips(this.userId).subscribe(data => {
      this.driver_trips = JSON.parse(data["_body"]).Data;

      this.driver_trips.forEach(driver_trip => {
        this.duration1 = (this.current_date.valueOf() -
          (new Date(driver_trip.date)).valueOf()) / (3600 * 1000)
        this.duration2 = (this.current_date.valueOf()
          - new Date(this.trip_date).valueOf()) / (3600 * 1000)
        this.duration3 = this.duration1 - this.duration2
        console.log("current duration is " + this.duration3);

        if (driver_trip.type == "Go To Academy" && this.trip_type == "Go To Academy")
        { this.same_driver_type = true }
        else if (driver_trip.type == "Return From Academy" && this.trip_type == "Return From Academy")
         { this.same_driver_type = true }
        else { this.same_driver_type = false }

        if (this.same_driver_type == true && 23 >= this.duration3 && this.duration3 > -23) {
          this.same_driver_trip = true
        }

      });

    });

    this.tripService.getAllTrips(this.userId).subscribe(data => {
      this.user_trips = JSON.parse(data["_body"]).Data;
      console.log("User Trips : ", this.user_trips);
      console.log('user id is ' + this.userId);
      this.user_trips.forEach(trip => {
        if (this.trip_id == trip.trips.id) {
          this.user_joined = true
        }
      });
      this.user_trips.forEach(passenger_trip => {
        this.duration4 = (this.current_date.valueOf() -
          (new Date(passenger_trip.trips.date)).valueOf()) / (3600 * 1000)
        this.duration5 = (this.current_date.valueOf()
          - new Date(this.trip_date).valueOf()) / (3600 * 1000)
        this.duration6 = this.duration4 - this.duration5
        console.log("current duration is " + this.duration3);

        if (passenger_trip.trips.type == "Go To Academy" && this.trip_type == "Go To Academy") { this.same_passenger_type = true }
        else if (passenger_trip.trips.type == "Return From Academy" && this.trip_type == "Return From Academy") { this.same_passenger_type = true }
        else { this.same_passenger_type = false }

        if (this.same_passenger_type == true && 23 >= this.duration6 && this.duration6 > -23) {
          this.same_passenger_trip = true
        }
      });

    })

    this.loading.dismiss().then(() => {
    })

  }



  userJoinTrip(){
    console.log("Test join" , this.trip_details);
    this.tripService.joinTrip(this.trip_details.trip.id).subscribe(res => {
      console.log("Data" , res);
      this.navCtrl.setRoot(JointripPage,{userId:this.userId});
    },err=>{
      console.log(err);
    });
  }



  close(){
    this.viewCtrl.dismiss();
}

}
