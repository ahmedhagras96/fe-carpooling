import { Component } from '@angular/core';
import {
  IonicPage, NavController, NavParams, Alert, AlertController,Loading,
  LoadingController,ModalController,  ViewController
} from 'ionic-angular';
import { MytripsPage } from '../mytrips_driver/mytrips';
import { Mytrips_passengerPage } from '../mytrips_passenger/mytrips_passenger';
import { TripService } from '../services/trip.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import QRCode from 'qrcode';
import { GoogleMapsProvider } from '../../providers/google-maps/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationSelect } from '../location-select/location-select';
import { MaketripPage } from '../maketrip/maketrip';
import { text } from '@angular/core/src/render3/instructions';
import { JointripPage } from '../jointrip/jointrip';


@IonicPage()
@Component({
  selector: 'page-mytrip',
  templateUrl: 'mytrip.html',

})
export class MytripPage {

  private headers = new Headers();
  public myt: boolean;
  public cdate: string = new Date().toISOString();
  public myPhotoURL: any = 'assets/imgs/head edited.png';

  public current_date = new Date()
  public check_date;
  public currenttime: string = new Date().toLocaleTimeString();
  public check_time;
  public duration;

  public tid: number;
  public start_passenger_go: boolean = false;
  public start_passenger_return: boolean = false;
  public end_passenger_go: boolean = false;
  public end_passenger_return: boolean = false;
  public start_driver_go: boolean = false;
  public start_driver_return: boolean = false;
  public end_driver_go: boolean = false;
  public end_driver_return: boolean = false;
  public start_driver_clicked: boolean = false;
  public end_driver_clicked: boolean = false;
  public trip_id: number;
  public dis: number;

  public lat2: number;
  public lon2: number;

  public trip_details: any;
  public trip_type: string;
  public trip_date;
  public trip_time;
  public trip_drivername: string;
  public trip_driverphone: string;
  public trip_drivercollage: string;
  public trip_driverdepartment: string;
  public car_type: string;
  public car_module: string;
  public car_color: string;
  public car_number: string;

  public userId: number;
  public driver_id: number;
  public check_driver: boolean = false;
  public check_passenger: boolean = false;
  public check_trip: boolean = true;
  public passengers: any;
  public passengers_array: any = {};
  public pass_confrim: boolean = false;
  public drivertrips_num: number;
  public check_confirm:boolean;
  public loading:Loading;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public tripService: TripService,
    public viewCtrl: ViewController,
    public qrscan: BarcodeScanner,
    public maps: GoogleMapsProvider,
    public alertCtrl: AlertController,
    public geolocation: Geolocation,
    public loadingCtrl: LoadingController
  ) {

    this.myt = navParams.get('myt');
    this.trip_id = navParams.get('trip_id');
    this.userId = navParams.get('userId');
    this.check_driver = navParams.get('check_driver');
    this.check_passenger = navParams.get('check_passenger');
    this.trip_id = navParams.get('trip_id')
    this.drivertrips_num = navParams.get('drivertrips_num')

  }

  code = "this.date+this.time";
  generated = '';
  scannedcode: string;
  check_pass_start = [];
  show_pass_start = [];
  tpassenger={name:"",condition:""};
  check_pass_end= [];


  ionViewDidLoad() {


    console.log('user id is ' + this.userId);
    console.log('ionViewDidLoad MytripsPage');
    console.log(this.cdate);
    console.log("current date is " + this.current_date);
    console.log("current date is " + this.currenttime);
    console.log("current lat is " + this.maps.ulat1);
    console.log("current long is " + this.maps.ulong1);

    this.loading = this.loadingCtrl.create();
    this.loading.present();
    this.tripService.getTripDetails(this.trip_id).subscribe(data => {
      this.trip_details = JSON.parse(data['_body']).Data;
      console.log('tripdetailsresult', this.trip_details);
      this.trip_type = this.trip_details.trip.type
      this.trip_date = this.trip_details.trip.date
      this.check_date = this.trip_details.trip.date
      this.duration = (this.current_date.valueOf() - (new Date(this.check_date)).valueOf()) / (3600 * 1000)
      console.log("current duration is " + this.duration);
      this.trip_time = this.trip_details.trip.time
      this.check_time = (this.trip_details.trip.time).valueOf()
      this.trip_drivername = this.trip_details.trip.driver.name
      this.trip_driverphone = this.trip_details.trip.driver.phone
      this.trip_drivercollage = this.trip_details.trip.driver.collage
      this.trip_driverdepartment = this.trip_details.trip.driver.department
      this.car_type = this.trip_details.car.type
      this.car_module = this.trip_details.car.model
      this.car_color = this.trip_details.car.color
      this.car_number = this.trip_details.car.number
      this.driver_id = this.trip_details.trip.driver_id
      this.passengers = this.trip_details.passes
      this.passengers_array = this.trip_details.passes
      console.log("trip passengers " + this.passengers_array);
      this.loading.dismiss().then(() => {
        this.passengers.forEach(passenger => {
          if (passenger.id == this.userId && passenger.is_confirm == 1) {
            this.check_confirm = true;
          }
        })
      });
    });

  }

  process() {
    const qrcode = QRCode;
    qrcode.toDataURL(this.code, { errorCorrectionLevel: 'H' }, function (err, url) {
      this.generated = url;
    })
  }

  confirm(confirm, user_id) {

    this.tripService.confirmJoinTrip(confirm, {"user_id":user_id, "trip_id": this.trip_details.trip.id}).
                subscribe(data=>{
                  console.log("Confirmed Users: ", data);
                  this.passengers = JSON.parse(data["_body"]).Data;

                  console.log(this.passengers);
                },error=>{

                });
    this.pass_confrim = true
  }

  getout(){
    const alert: Alert = this.alertCtrl.create({
      message: "Are you sure you want leave this trip ",

      buttons: [
        { text: "No" },
        {
          text: "Yes",
          handler: data => {
            this.confirm(0, this.userId);
            this.navCtrl.setRoot( Mytrips_passengerPage, { userId: this.userId });
          }
        }
      ]
    });
    alert.present();
  }

  launchLocationview(lat, long) {
    const latt: number = lat;
    const longt: number = long;
    this.navCtrl.setRoot(LocationSelect, {
      mylat: latt,
      mylong: longt,
      myt: this.myt = true,
      check_trip: this.check_trip,
      check_driver: this.check_driver,
      userId: this.userId,
      trip_id: this.trip_id
    });
    console.log('check' + lat);
    console.log('check' + long);
  }


  delete_trip(): void {
    const alert: Alert = this.alertCtrl.create({
      message: "Are you sure you want delet these trip ",

      buttons: [
        { text: "No" },
        {
          text: "Yes",
          handler: data => {
            this.deltrip();
          }
        }
      ]
    });
    alert.present();
  }


  deltrip() {
    this.tripService.deleteTrip(this.trip_id).subscribe(data=>{
      this.navCtrl.setRoot(MytripsPage, { userId: this.userId });
    });

  }

  return_to_driver() {
    this.navCtrl.setRoot(MytripsPage, { userId: this.userId });
  }

  return_to_passenger() {
    this.navCtrl.setRoot(Mytrips_passengerPage, { userId: this.userId });
  }



  passenger_start_go() {
    console.log("halllllloooooo ");
    const lat1 = 30.09580525639613;
    const lon1 = 31.373430956771813;
    this.loading = this.loadingCtrl.create();
    this.loading.present();
    this.geolocation.getCurrentPosition().then((position) => {
      this.lat2 = position.coords.latitude;
      this.lon2 = position.coords.longitude;
    })
      .then(() => {
        var R = 6371; // Radius of the earth in km
        var dLat = this.deg2rad(this.lat2 - lat1);  // deg2rad below
        var dLon = this.deg2rad(this.lon2 - lon1);
        var a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(this.lat2)) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2)
          ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        console.log("result is" + d);
        if (d >= 2) {
        this.start_passenger_go = true;
          console.log("Trip Service", this.tripService);
          this.tripService.checkStartUser(this.trip_details.trip.id, this.lat2, this.lon2).subscribe(data => {
            const alert: Alert = this.alertCtrl.create({
              message: "Well done!",
              buttons: [{ text: "Ok", role: "cancel" }]
            });
            this.loading.dismiss().then(()=>{
            alert.present();
            })
          },
            error => {
              const alert: Alert = this.alertCtrl.create({
                message: error,
                buttons: [{ text: "Ok", role: "cancel" }]
              });
              this.loading.dismiss().then(()=>{
              alert.present();
              })
            });

        }
        else {
          const alert: Alert = this.alertCtrl.create({
            message: "Sorry,are you sure you are far from college",
            buttons: [{ text: "Ok", role: "cancel" }]
          });
          this.loading.dismiss().then(()=>{
          alert.present();
          })
        }
      })


  }



  passenger_end_go() {
    const lat1 =30.09580525639613;
    const lon1 = 31.373430956771813;
    this.loading = this.loadingCtrl.create();
    this.loading.present();
    this.geolocation.getCurrentPosition().then((position) => {
      this.lat2 = position.coords.latitude;
      this.lon2 = position.coords.longitude;
    })
      .then(() => {
        var R = 6371; // Radius of the earth in km
        var dLat = this.deg2rad(this.lat2 - lat1);  // deg2rad below
        var dLon = this.deg2rad(this.lon2 - lon1);
        var a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(this.lat2)) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2)
          ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        console.log("result is" + d);
        if (2 >= d) {
        this.end_passenger_go = true
          this.tripService.checkEndUser(this.trip_details.trip.id, this.lat2, this.lon2).
            subscribe(data => {
              const alert: Alert = this.alertCtrl.create({
                message: "Well done!",
                buttons: [{ text: "Ok", role: "cancel" }]
              });
              this.loading.dismiss().then(()=>{
              alert.present();
            })
            },
              error => {
                const alert: Alert = this.alertCtrl.create({
                  message: error,
                  buttons: [{ text: "Ok", role: "cancel" }]
                });
                this.loading.dismiss().then(()=>{
                alert.present();
                })
              });
        }
        else {
          const alert: Alert = this.alertCtrl.create({
            message: "Sorry,are you sure you are near to acadmy",
            buttons: [{ text: "Ok", role: "cancel" }]
          });
          this.loading.dismiss().then(()=>{
          alert.present();
          })
        }
      })
  }



  passenger_start_return() {
    const lat1 = 30.09580525639613;
    const lon1 = 31.373430956771813;
    this.loading = this.loadingCtrl.create();
    this.loading.present();
    this.geolocation.getCurrentPosition().then((position) => {
      this.lat2 = position.coords.latitude;
      this.lon2 = position.coords.longitude;
    })
      .then(() => {
        var R = 6371; // Radius of the earth in km
        var dLat = this.deg2rad(this.lat2 - lat1);  // deg2rad below
        var dLon = this.deg2rad(this.lon2 - lon1);
        var a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(this.lat2)) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2)
          ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        console.log("result is" + d);
        if (2 >= d) {
        this.start_passenger_return = true
          this.tripService.checkStartUser(this.trip_details.trip.id, this.lat2, this.lon2).
            subscribe(data => {
              const alert: Alert = this.alertCtrl.create({
                message: "Well done!",
                buttons: [{ text: "Ok", role: "cancel" }]
              });
              this.loading.dismiss().then(()=>{
              alert.present();
              })
            },
              error => {
                const alert: Alert = this.alertCtrl.create({
                  message: error,
                  buttons: [{ text: "Ok", role: "cancel" }]
                });
                this.loading.dismiss().then(()=>{
                alert.present();
                })
              });
        }
        else {
          const alert: Alert = this.alertCtrl.create({
            message: "Sorry,are you sure you are near to acadmy",
            buttons: [{ text: "Ok", role: "cancel" }]
          });
          this.loading.dismiss().then(()=>{
          alert.present();
          })
        }
      })
  }


  passenger_end_return() {
    const lat1 = 30.09580525639613;
    const lon1 = 31.373430956771813;
    this.loading = this.loadingCtrl.create();
    this.loading.present();
    this.geolocation.getCurrentPosition().then((position) => {
      this.lat2 = position.coords.latitude;
      this.lon2 = position.coords.longitude;
    })
      .then(() => {
        var R = 6371; // Radius of the earth in km
        var dLat = this.deg2rad(this.lat2 - lat1);  // deg2rad below
        var dLon = this.deg2rad(this.lon2 - lon1);
        var a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(this.lat2)) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2)
          ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        console.log("result is" + d);
        if (d >= 2) {
        this.start_passenger_return = true
          this.tripService.checkEndUser(this.trip_details.trip.id, this.lat2, this.lon2).
            subscribe(data => {
              const alert: Alert = this.alertCtrl.create({
                message: "Well done!",
                buttons: [{ text: "Ok", role: "cancel" }]
              });
              this.loading.dismiss().then(()=>{
              alert.present();
              })
            },
              error => {
                const alert: Alert = this.alertCtrl.create({
                  message: error,
                  buttons: [{ text: "Ok", role: "cancel" }]
                });
                this.loading.dismiss().then(()=>{
                alert.present();
                })
              });
        }
        else {
          const alert: Alert = this.alertCtrl.create({
            message: "Sorry,but you are still near to acadmy",
            buttons: [{ text: "Ok", role: "cancel" }]
          });
          this.loading.dismiss().then(()=>{
          alert.present();
          })
        }
      })
  }


 driver_start() {
  this.loading = this.loadingCtrl.create();
  this.loading.present();
    this.tripService.checkStartDriver(this.trip_details.trip.id).subscribe(data => {

      let locations = JSON.parse(data["_body"]).Data;
      console.log(locations);

      locations.forEach(location => {
        console.log(location);
        const lat1 = location.start_lat;
        const lon1 = location.start_lang;
        this.geolocation.getCurrentPosition().then((position) => {
          this.lat2 = 30.07666;//position.coords.latitude;
          this.lon2 = 31.31728;//position.coords.longitude;
        })
          .then(() => {
            var R = 6371; // Radius of the earth in km
            var dLat = this.deg2rad(this.lat2 - lat1);  // deg2rad below
            var dLon = this.deg2rad(this.lon2 - lon1);
            var a =
              Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(this.lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2)
              ;
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c; // Distance in km
            console.log("result is " + d + " lat " + lat1 + " lon "+ lon1);
            if (.1 >= d) {
              this.check_pass_start.push(location.user_id);
              this.passengers_array.forEach(passenger => {
                if(location.user_id == passenger.id){
                  this.tpassenger.name=passenger.name
                  this.tpassenger.condition="joined"
                  this.show_pass_start.push(this.tpassenger);
                }
              });
            }
          })
      });
      console.log("Passengers Arrival :" , this.check_pass_start);

      this.tripService.setPassengersArrived({"pass_id":this.check_pass_start,
                          "trip_id":this.trip_details.trip.id}).subscribe(data=>{
                          console.log("Passes Arrived : " , data);
      })
    },
      error => {

      });
      this.loading.dismiss().then(()=>{
    this.start_driver_clicked = true;
    })
  }


  alert_end(): void {
    const alert: Alert = this.alertCtrl.create({
      message: "Do you want to repeat these trip ",
      buttons: [
        { text: "No",
        handler: data => {
           this.driver_end();
           this.navCtrl.setRoot(JointripPage,{ userId: this.userId })
        }
       },
        {
          text: "Yes",
          handler: data => {
             this.driver_end();
             this.navCtrl.setRoot(MaketripPage,{ userId: this.userId })
          }
        }
      ]
    });
    alert.present();
  }



  public deg2rad(deg) {
    return deg * (Math.PI / 180)
  }





  driver_end() {
    this.loading = this.loadingCtrl.create();
    this.loading.present();
    this.tripService.checkEndDriver(this.trip_details.trip.id).subscribe(data => {
      console.log(data);
      let locations = JSON.parse(data["_body"]).Data;

      locations.forEach(location => {
        console.log(location);
        const lat1 = location.end_lat;
        const lon1 = location.end_lang;
        console.log(" latttt "+lat1+" langgg "+lon1);

        this.geolocation.getCurrentPosition().then((position) => {
          this.lat2 = position.coords.latitude;
          this.lon2 = position.coords.longitude;
        })
          .then(() => {
            var R = 6371; // Radius of the earth in km
            var dLat = this.deg2rad(this.lat2 - lat1);  // deg2rad below
            var dLon = this.deg2rad(this.lon2 - lon1);
            var a =
              Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(this.lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2)
              ;
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c; // Distance in km
            console.log("result is" + d);
            if (.1 >= d) {
              this.check_pass_end.push({ "pass_id": location.user_id, "state": true });
              console.log("checkkk" + this.check_pass_end);
            }
          })
      });
      this.tripService.addPoints(this.trip_details.trip.id, this.check_pass_end).subscribe(data=>{

      });
    },
      error => {

      });
      this.loading.dismiss().then(()=>{
    this.end_driver_clicked = true;
      })
  }




}
