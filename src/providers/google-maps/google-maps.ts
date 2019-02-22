import { Injectable } from '@angular/core';
import { Platform,ModalController,Alert,AlertController, } from 'ionic-angular';
import { ConnectivityService} from '../connectivity-service/connectivity-service';
import { Geolocation } from '@ionic-native/geolocation';
import { TripdetailsPage } from '../../pages/tripdetails/tripdetails';
import { TripService } from '../../pages/services/trip.service';

declare var google: any;

@Injectable()
export class GoogleMapsProvider {

  mapElement: any;
  pleaseConnect: any;
  public map: any;
  mapInitialised: boolean = false;
  public isenabled:boolean=false;
  public mt: boolean=false;
  public myt: boolean=false;
  public jt: boolean=false;
  public ulat1:number=null;
  public ulong1:number=null;
  public mylat:number;
  public mylong:number;
  public date:Date;
  public triptype:string;
  mapLoaded: any;
  mapLoadedObserver: any;
  currentMarker: any;
  apiKey: string = "AIzaSyDaw1jCkBVpMcZv7qIVAiHJ5gxm1vCor6k";

  public clat:number;
  public clong:number;

  public mlat:number;
  public mlong:number;

  public chlat:number;
  public chlong:number;

public set_lat:number=null;
public set_long:number=null;
public setloc:boolean=false;

  public userId: number;



  constructor(public connectivityService: ConnectivityService,
              public geolocation: Geolocation,
              public modalCtrl: ModalController,
              public tripService:TripService,
              public alertCtrl: AlertController,
              private platform: Platform) {
  }

  init(mapElement: any, pleaseConnect: any): Promise<any> {

    this.mapElement = mapElement;
    this.pleaseConnect = pleaseConnect;

    return this.loadGoogleMaps();

  }

  loadGoogleMaps(): Promise<any> {

    return new Promise((resolve) => {

      if(typeof google == "undefined" || typeof google.maps == "undefined"){

        console.log("Google maps JavaScript needs to be loaded.");
        this.disableMap();

        if(this.connectivityService.isOnline()){

          window['mapInit'] = () => {

            this.initMap().then(() => {
              resolve(true);
            });

            this.enableMap();
          }

          let script = document.createElement("script");
          script.id = "googleMaps";

          if(this.apiKey){
            script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit&libraries=places';
          } else {
            script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
          }

          document.body.appendChild(script);

        }
      } else {

        if(this.connectivityService.isOnline()){
          this.initMap();
          this.enableMap();
        }
        else {
          this.disableMap();
        }

        resolve(true);

      }

      this.addConnectivityListeners();

    });

  }


 public initMap(): Promise<any> {

    this.mapInitialised = true;

    return new Promise((resolve) => {

       var options = {
        enableHighAccuracy: true, maximumAge: 300000, timeout: 10000
      }

      this.geolocation.getCurrentPosition(options)
      .then((position) => {

        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)

        let mapOptions = {
          center:new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }


        this.map = new google.maps.Map(this.mapElement, mapOptions);
       //HERE I AM GETTING DATA:
        console.log("getCenter(): " + this.map.getCenter());
        google.maps.event.addListener(this.map, 'center_changed', () => {
      });
      if(this.mt==true){
        if( this.ulat1 != null){
          marker = new google.maps.Marker({
          map: this.map,
          animation: google.maps.Animation.DROP,
          position: {
            lat: this.ulat1,
            lng: this.ulong1
          },
          draggable: true
        });
      }else {
          var marker = new google.maps.Marker({
          map: this.map,
          animation: google.maps.Animation.DROP,
          position: this.map.getCenter(),
          draggable: true
        });}
       this.ulat1=marker.getPosition().lat();
       this.ulong1=marker.getPosition().lng();
       console.log("lat    "+this.ulat1);
       console.log("long   "+this.ulong1);
      let content = "<h4>some info!!!</h4>";
      this.addInfoWindow(marker, content);
      this.enabled1();
      };


      if(this.setloc==true){
        console.log("current Setttlocc "+this.set_lat);
        if( this.set_lat != null){
          marker1 = new google.maps.Marker({
          map: this.map,
          animation: google.maps.Animation.DROP,
          position: {
            lat: this.set_lat,
            lng: this.set_long,
          },
          draggable: true
        });
      }else {
          var marker1 = new google.maps.Marker({
          map: this.map,
          animation: google.maps.Animation.DROP,
          position: this.map.getCenter(),
          draggable: true
        });}
       this.set_lat=marker1.getPosition().lat();
       this.set_long=marker1.getPosition().lng();
       console.log("current Setttlocc "+this.set_lat);
       console.log("lat    "+this.set_lat);
       console.log("long   "+this.set_long);
      this.addInfoWindow1(marker1);
      };

      if(this.myt==true){
        console.log(this.mylat);
        console.log(this.mylong);
        let marker = new google.maps.Marker({
          map: this.map,
          animation: google.maps.Animation.DROP,
          position: {
            lat: this.mylat,
            lng: this.mylong
          },
        });
    }

if(this.jt==true){
  let searchData = {};
  searchData['date'] = this.date;
  searchData['type'] = this.triptype;
  this.tripService.findTrips(searchData).subscribe(data => {

    let trips = JSON.parse(data["_body"]).Data;
    console.log("Search Result" , trips);
    trips.forEach(trip => {
      console.log(trip.locations);
      trip.locations.forEach(location=>{
        const blat:number=location.lat;
        const blang:number=location.lang;
        let marker = new google.maps.Marker({
          map: this.map,
          animation: google.maps.Animation.DROP,
          position: {
            lat:blat,
            lng:blang
          },
        });
        this.showdetails(marker,trip.id);
      });
    });

  });
}
        resolve(true);
      },(err) => {
        console.log(err);
      })
      });
  }


showdetails(marker,id){
  google.maps.event.addListener(marker, 'click', () => {
      let modal = this.modalCtrl.create( TripdetailsPage,{tid:id,userId:this.userId});
      modal.onDidDismiss((location) => {
          console.log(location);
      });
      modal.present();
  });
  }

 addInfoWindow(marker, content){
        // let infoWindow = new google.maps.InfoWindow({
        //   content: content
        // });
        // google.maps.event.addListener(marker, 'click', () => {
        //   infoWindow.open(this.map, marker);
        // });
        google.maps.event.addListener(marker, 'dragend', () =>
        {this.ulat1=marker.getPosition().lat();
            this.ulong1=marker.getPosition().lng();
            console.log("lat    "+this.ulat1);
            console.log("long   "+this.ulong1);
        });
       }

 addInfoWindow1(marker1){
        google.maps.event.addListener(marker1, 'dragend', () =>
        {this.set_lat=marker1.getPosition().lat();
         this.set_long=marker1.getPosition().lng();
            console.log("lat    "+this.set_lat);
            console.log("long   "+this.set_long);
        });
       }

  disableMap(): void {

    if(this.pleaseConnect){
      this.pleaseConnect.style.display = "block";
    }

  }

  enabled1(){
    if(this.ulat1 !==0){
     //enable the button
     this.isenabled=true;
     }else{
     //disable the button
     this.isenabled=false;
     }}

  enableMap(): void {

    if(this.pleaseConnect){
      this.pleaseConnect.style.display = "none";
    }

  }

  addConnectivityListeners(): void {

    this.connectivityService.watchOnline().subscribe(() => {

      setTimeout(() => {

        if(typeof google == "undefined" || typeof google.maps == "undefined"){
          this.loadGoogleMaps();
        }
        else {
          if(!this.mapInitialised){
            this.initMap();
          }

          this.enableMap();
        }

      }, 2000);

    });

    this.connectivityService.watchOffline().subscribe(() => {

      this.disableMap();

    });

  }

}
