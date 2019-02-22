import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,
 ToastController, Platform,MenuController } from 'ionic-angular';

import { SigninPage } from '../signin/signin';
import { ProfilePage } from '../profile/profile';
import { MaketripPage } from '../maketrip/maketrip';
import { JointripPage } from '../jointrip/jointrip';
import { PrizesPage } from '../prizes/prizes';
import { YourprizesPage } from '../yourprizes/yourprizes';

import { Crop } from '@ionic-native/crop';
import { Geolocation } from '@ionic-native/geolocation';
import { Device } from '@ionic-native/device';

import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'Firebase';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google: any;
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  markers = [];
  ref = firebase.database().ref('geolocations/');
  constructor(public navCtrl: NavController,
  public menuCtrl: MenuController,
  public authProvider: AuthProvider,
  public navParams: NavParams,
  public auth:AngularFireAuth,
   public cropService: Crop,
   public toastCtrl: ToastController,
   public platform: Platform,
   private geolocation: Geolocation,
   private device: Device
   ) {
    platform.ready().then(() => {
      this.initMap();
    });
    this.ref.on('value', resp => {
      this.deleteMarkers();
      snapshotToArray(resp).forEach(data => {
        if(data.uuid !== this.device.uuid) {
          let image = 'assets/imgs/location icon.png';
          let updatelocation = new google.maps.LatLng(data.latitude,data.longitude);
          this.addMarker(updatelocation,image);
          this.setMapOnAll(this.map);
        } else {
          let image = 'assets/imgs/location icon.png';
          let updatelocation = new google.maps.LatLng(data.latitude,data.longitude);
          this.addMarker(updatelocation,image);
          this.setMapOnAll(this.map);
        }
      });
    });
  }

  initMap() {
    this.mapInitialised = true;

    this.geolocation.getCurrentPosition({ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true })
    .then((resp) => {
      let mylocation = new google.maps.LatLng(resp.coords.latitude,resp.coords.longitude);
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        zoom: 15,
        center: mylocation
      }),
      err =>{
        console.log(' Error : ' + JSON.stringify(err))}
    });
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      this.deleteMarkers();
  this.updateGeolocation(this.device.uuid, data.coords.latitude,data.coords.longitude);
  let updatelocation = new google.maps.LatLng(data.coords.latitude,data.coords.longitude);
  let image = 'assets/imgs/location icon.png';
  this.addMarker(updatelocation,image);
  this.setMapOnAll(this.map);

    });
  }



  addMarker(location, image) {
    let marker = new google.maps.Marker({
      position: location,
      map: this.map,
      icon: image
    });

  deleteMarkers() {
    this.clearMarkers();
    this.markers = [];
  }

  updateGeolocation(uuid, lat, lng) {
    if(localStorage.getItem('mykey')) {
      firebase.database().ref('geolocations/'+localStorage.getItem('mykey')).set({
        uuid: uuid,
        latitude: lat,
        longitude : lng
      });
    } else {
      let newData = this.ref.push();
      newData.set({
        uuid: uuid,
        latitude: lat,
        longitude: lng
      });
      localStorage.setItem('mykey', newData.key);
    }
  }

  openprofile():any{
    this.navCtrl.push(ProfilePage);

  }

  openmaketrip():any{
    this.navCtrl.push(MaketripPage);
  }

  openprizes():any{
    this.navCtrl.push(PrizesPage);
  }

  openyourprizes():any{
    this.navCtrl.push(YourprizesPage);
  }
  openjointrip():any{
    this.navCtrl.push(JointripPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}

export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });

  return returnArr;
};
