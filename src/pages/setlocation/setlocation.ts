import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CarinfoPage } from '../carinfo/carinfo';
import { LocationSelect } from '../location-select/location-select';
import { UserService } from '../services/user.service';
import { JointripPage } from '../jointrip/jointrip';


@IonicPage()
@Component({
  selector: 'page-setlocation',
  templateUrl: 'setlocation.html',
})
export class SetlocationPage {
public userId:number;
public set_lat:number=null;
public set_long:number=null;
public setloc:boolean=false;
public no_location:boolean=false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService:UserService) {
    this.userId = navParams.get("userId");
    this.no_location = navParams.get("no_location");
    this.setloc = navParams.get('setloc');
    this.set_lat = navParams.get('set_lat');
    this.set_long = navParams.get('set_long');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SetlocationPage');
    console.log('your lat is '+this.set_lat);
    console.log('your long is '+this.set_long);
  }

  save_andto_carinfo() {

    this.userService.addCords({ "lat": this.set_lat, "lang": this.set_long }).subscribe(data => {

      console.log("User Data ", data);

      if (this.no_location == true) {
        this.navCtrl.setRoot(JointripPage, { userId: this.userId });
      }
      else {
        this.navCtrl.setRoot(CarinfoPage, { userId: this.userId });
      }
    });

  }

launchLocationPage(){
  this.navCtrl.setRoot(LocationSelect, {
    set_lat:this.set_lat,
    set_long:this.set_long,
    setloc:this.setloc=true,
    userId:this.userId,
    no_location:this.no_location})
}

startloc(){
  this.launchLocationPage()
 }

}
