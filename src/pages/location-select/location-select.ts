import { NavController, Platform, ViewController, NavParams,Events,
  LoadingController } from 'ionic-angular';
import { Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMapsProvider } from '../../providers/google-maps/google-maps';
import { AddmarkProvider } from '../../providers/addmark/addmark';
import { MaketripPage } from '../maketrip/maketrip';
import { MytripsPage } from '../mytrips_driver/mytrips';
import { JointripPage } from '../jointrip/jointrip';
import { SetlocationPage } from '../setlocation/setlocation';
import { Mytrips_passengerPage } from '../mytrips_passenger/mytrips_passenger';
import { MytripPage } from '../mytrip/mytrip';
import { ProfilePage } from '../profile/profile';

declare var google;
@Component({
  selector: 'page-location-select',
  templateUrl: 'location-select.html',
})

export class LocationSelect {
@ViewChild('map') mapElement: ElementRef;
@ViewChild('pleaseConnect') pleaseConnect: ElementRef;

map: any;

latitude: number;
longitude: number;
public null=null;
public ulat1:number=null;
public ulong1:number=null;
public mylat:number=null;
public mylong:number=null;
public ulat3:number;
public ulong3:number;
public isenabled:boolean=false;
public mt:boolean=false;
public myt:boolean=false;
public jt:boolean=false;
public check_passenger:boolean=false;
public check_trip:boolean=false;
searchDisabled: boolean;
saveDisabled: boolean;
location: any;
public date:Date;
public triptype:string;
public first_time:boolean;
public userId: number;
public trip_id:number;

public set_lat:number=null;
public set_long:number=null;
public setloc:boolean=false;
public saveloc:boolean=false;
public check_driver:boolean;
public no_location:boolean=false;

public mlong:number;
public mlati:number;

minDate = new Date().toISOString();
public click=true;
userdata : any;


// share(slidingItem: ItemSliding) {
//   slidingItem.close();
// }

constructor(public navCtrl: NavController,
   public zone: NgZone,
   public maps: GoogleMapsProvider,
   public platform: Platform,
   public geolocation: Geolocation,
   public viewCtrl: ViewController,
   public navParams: NavParams,
   public loc: AddmarkProvider,
   public events:Events,
   public loadingCtrl: LoadingController,
   ) {
    this.searchDisabled = true;
    this.saveDisabled = true;
    this.ulat1 = navParams.get('lat');
    this.ulong1 = navParams.get('long');
    this.mylat = navParams.get('mylat');
    this.mylong = navParams.get('mylong');
    console.log("hoa"+ this.mylat)
    console.log("hoa"+ this.mylong)
    this.mt = navParams.get('mt');
    this.myt = navParams.get('myt');
    this.check_passenger = navParams.get('check_passenger');
    this.check_trip = navParams.get('check_trip');
    this.first_time = navParams.get('first_time');

    this.jt = navParams.get('jt');
    this.date = navParams.get('date');
    this.triptype = navParams.get('triptype');

    this.setloc = navParams.get('setloc');
    this.saveloc = navParams.get('saveloc');
    this.set_lat = navParams.get('set_lat');
    this.set_long = navParams.get('set_long');
    this.userId = navParams.get('userId');
    this.trip_id=navParams.get('trip_id');
    this.no_location = navParams.get('no_location');
    this.check_driver = navParams.get('check_driver');



}

ionViewDidLoad(): void {

  // this.initializeMap();

if(this.mt==true)
    {this.maps.mt = true;
     this.maps.myt = false;
     this.maps.jt = false;
     this.maps.setloc = false;
     this.maps.ulat1 = this.ulat1;
     this.maps.ulong1 = this.ulong1;}
else if(this.myt==true)
    {
      this.maps.mylat = this.mylat;
      this.maps.mylong = this.mylong;
      this.maps.myt = true;
     this.maps.mt = false;
     this.maps.jt = false;
     this.maps.setloc = false;
  }
else if(this.jt==true)
    {this.maps.jt = true;
     this.maps.myt = false;
     this.maps.mt = false;
     this.maps.setloc = false;
     this.maps.date = this.date;
     this.maps.triptype = this.triptype
     this.maps.userId = this.userId;}

else if(this.setloc==true)
     {this.maps.setloc = true;
      this.maps.myt = false;
      this.maps.mt = false;
      this.maps.jt = false;
      this.maps.set_lat = this.set_lat;
      this.maps.set_long = this.set_long;
      this.maps.userId = this.userId;}

    let mapLoaded =
     this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement)
console.log(this.mylat)
console.log(this.mt)
console.log(this.myt)
console.log("setlocation is"+this.setloc)
console.log('user id is '+this.userId);
}

enabled1(){
  if(this.ulat1 !==0){
   //enable the button
   this.isenabled=true;
   }else{
   //disable the button
   this.isenabled=false;
   }}

save(){
  this.navCtrl.setRoot(MaketripPage, {
    lat: this.ulat1=this.maps.ulat1,
    long: this.ulong1=this.maps.ulong1,
    isenabled:this.maps.isenabled,
    first_time:this.first_time,
    userId:this.userId
})
}

save_setlocation(){
  this.navCtrl.setRoot(SetlocationPage, {
    set_lat: this.set_lat=this.maps.set_lat,
    set_long: this.set_long=this.maps.set_long,
    setloc:this.maps.setloc,
    userId:this.userId,
    no_location:this.no_location
})
}

save_savelocation(){


  this.navCtrl.setRoot( ProfilePage, {
    set_lat: this.set_lat=this.maps.set_lat,
    set_long: this.set_long=this.maps.set_long,
    setloc:this.maps.setloc,
    saveloc:this.saveloc,
    userId:this.userId
})
}

returnto_mytrips(){
  this.navCtrl.setRoot(MytripsPage,{userId:this.userId
  })
}

returnto_maketrip(){
  this.navCtrl.setRoot(MaketripPage,{userId:this.userId,
    myt:this.myt
  })
}

returnto_jointrip(){
  this.navCtrl.setRoot(JointripPage,{userId:this.userId})
}

returnto_passenger(){
  this.navCtrl.setRoot(Mytrips_passengerPage,{userId:this.userId})
}

returnto_mytrip(){
  this.navCtrl.setRoot( MytripPage,
    {userId:this.userId,
    trip_id:this.trip_id,
    check_driver:this.check_driver})
}

}
