import { Injectable } from '@angular/core';
import { GoogleMapsProvider } from '../../providers/google-maps/google-maps';

/*
  Generated class for the AddmarkProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
declare var google;
@Injectable()
export class AddmarkProvider {

  public ulat:any;
  public ulang:any;

  constructor(public maps: GoogleMapsProvider) {
    console.log('Hello AddmarkProvider Provider');
  }

  public addMarker():any{
    let marker = new google.maps.Marker({
     map: this.maps.map,
     animation: google.maps.Animation.DROP,
     position: this.maps.map.getCenter(),
     draggable: true
   });

  let content = "<h4>some info!!!</h4>";
  this.addInfoWindow(marker, content);
  }
  addInfoWindow(marker, content){

   let infoWindow = new google.maps.InfoWindow({
     content: content
   });
   google.maps.event.addListener(marker, 'click', () => {
     infoWindow.open(this.maps.map, marker);
   });
   google.maps.event.addListener(marker, 'dragend', function()
   {
       this.markerlatlong = marker.getPosition();

       console.log("latlong   "+this.markerlatlong);
       console.log("lat    "+marker.getPosition().lat());
       console.log("long   "+marker.getPosition().lng());
       this.ulat=marker.getPosition().lat();
       this.ulang=marker.getPosition().lng();
   });
  }



}
