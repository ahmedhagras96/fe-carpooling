import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Alert,AlertController,
  LoadingController,Loading, ModalController,Events,Platform } from 'ionic-angular';
import { LocationSelect } from '../location-select/location-select';
import { AddmarkProvider } from '../../providers/addmark/addmark';
import { FormBuilder,FormControl,FormGroup, Validators } from '@angular/forms';
import { collegeval } from '../../validators/collegeval';
import { JointripPage } from '../jointrip/jointrip';
import { TripService } from '../services/trip.service';


@IonicPage()
@Component({
  selector: 'page-maketrip',
  templateUrl: 'maketrip.html',
})
export class MaketripPage {
  public loading: Loading;
  public isenable:boolean;
  public isenabled:boolean=false;
  public mt:boolean=false;
  public pone:boolean=false;
  public latst=null;
  public longst=null;
  public time1:any;
  public trip: any = {};
  public first_time:boolean
  public remake1:any
  public tripform: FormGroup;
  minDate = new Date().toISOString();


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

  types = ['Go To Academy','Return From Academy'];
  public userId:number;

  public passenger_trips;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public modalCtrl: ModalController,
              public events:Events,
              public loc: AddmarkProvider,
              public formBuilder: FormBuilder,
              public tripService: TripService,
              public platform: Platform
              ) {
                this.tripform = formBuilder.group({
                  date: ['',
                  Validators.compose([Validators.required])],
                  time: ['',
                  Validators.compose([Validators.required])],
                  type: new FormControl([''], Validators.compose([Validators.required,collegeval.isValid])
                      )}
                )
                this.latst = navParams.get('lat');
                this.longst = navParams.get('long');
                this.isenabled=navParams.get('isenabled');
                this.first_time=navParams.get('first_time');
                this.userId=navParams.get('userId');
                }


ionViewDidLoad() {
      console.log(this.latst);
      console.log(this.longst);
      console.log('user id is '+this.userId);

      this.tripService.getDriverTrips(this.userId).subscribe(data => {
        this.driver_trips = JSON.parse(data["_body"]).Data;
        this.driver_length=this.driver_trips.length
        console.log(this.driver_trips);
        });

        this.tripService.getAllTrips(this.userId).subscribe(data => {
          this.passenger_trips = JSON.parse(data["_body"]).Data;
          console.log("User Trips : ", this.passenger_trips);
        });

}

launchLocationPage(){
  this.navCtrl.setRoot(LocationSelect, {
    lat:this.latst,long:this.longst,mt:this.mt=true,first_time:this.first_time,userId:this.userId});
}

openjointrip(){
  this.navCtrl.setRoot(JointripPage,{userId:this.userId})
 }

startloc(){
  this.launchLocationPage()
 }


  save() {
    this.trip["time"] = this.tripform.value.time;
    this.trip["type"] = this.tripform.value.type;
    this.trip["date"] = this.tripform.value.date;
    this.trip["lat"] = this.latst;
    this.trip["lang"] = this.longst;
    this.loading = this.loadingCtrl.create();
    this.loading.present();

    this.driver_trips.forEach(driver_trip => {
      this.duration1 = (this.current_date.valueOf() -
        (new Date(driver_trip.date)).valueOf()) / (3600 * 1000)
      this.duration2 =  (this.current_date.valueOf()
        - new Date(this.tripform.value.date).valueOf()) / (3600 * 1000)
         this.duration3=this.duration1-this.duration2
         console.log("current duration is " + this.duration3);

        if(driver_trip.type == "Go To Academy" && this.tripform.value.type == "Go To Academy")
          {this.same_driver_type=true}
        else if(driver_trip.type == "Return From Academy" && this.tripform.value.type == "Return From Academy")
          {this.same_driver_type=true}
        else{this.same_driver_type=false}

      if (this.same_driver_type==true  && 23 >= this.duration3 && this.duration3 > -23 ) {
        this.same_driver_trip = true
      }

    });

         this.passenger_trips.forEach(passenger_trip => {
          this.duration4 = (this.current_date.valueOf() -
            (new Date(passenger_trip.trips.date)).valueOf()) / (3600 * 1000)
          this.duration5 =  (this.current_date.valueOf()
            - new Date(this.tripform.value.date).valueOf()) / (3600 * 1000)
             this.duration6=this.duration4-this.duration5
             console.log("current duration is " + this.duration3);

        if(passenger_trip.trips.type == "Go To Academy" && this.tripform.value.type == "Go To Academy")
          {this.same_passenger_type=true}
        else if(passenger_trip.trips.type == "Return From Academy" && this.tripform.value.type == "Return From Academy")
          {this.same_passenger_type=true}
        else{this.same_passenger_type=false}

      if (this.same_passenger_type==true && 23 >= this.duration6 && this.duration6 > -23 ) {
        this.same_passenger_trip = true
      }

    });

    if (this.same_driver_trip != true && this.same_passenger_trip != true) {
      this.tripService.createTrip(this.trip).subscribe(data => {
        console.log(data);
        this.loading.dismiss().then(()=>{
        this.navCtrl.setRoot(JointripPage, { userId: this.userId })
      })
      },
        error => {
        });
    } else {
      const alert: Alert = this.alertCtrl.create({
        message: "You are passenger or driver in the same trip type in this selected day please change type or day",
        buttons: [
          {
            text: "ok",
          }
        ]
      });
      this.loading.dismiss().then(()=>{
      alert.present();
      })
    }
    this.same_driver_trip = false;
    this.same_passenger_trip=false;

  }



  save1() {
    this.trip["time"] = this.tripform.value.time;
    this.trip["type"] = this.tripform.value.type;
    this.trip["date"] = this.tripform.value.date;
    this.trip["lat"] = this.latst;
    this.trip["lang"] = this.longst;
    console.log(this.trip);
      this.tripService.createTrip(this.trip).subscribe(data => {
        console.log(data);
        this.navCtrl.setRoot(this.navCtrl.getActive().component, { userId: this.userId });
      },
        error => {
        });


  }




}
