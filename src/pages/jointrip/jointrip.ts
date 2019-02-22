import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,
  LoadingController,Loading,ItemSliding,Events, ModalController,Platform } from 'ionic-angular';
import { FormBuilder,FormControl,FormGroup, Validators } from '@angular/forms';
import { collegeval } from '../../validators/collegeval';
import { ProfilePage } from '../profile/profile';
import { MaketripPage } from '../maketrip/maketrip';
import { MytripsPage } from '../mytrips_driver/mytrips';
import { PrizesPage } from '../prizes/prizes';
import { LocationSelect } from '../location-select/location-select';
import { Mytrips_passengerPage } from '../mytrips_passenger/mytrips_passenger';
import { TripService } from '../services/trip.service';
import { UserService } from '../services/user.service';
import { CarinfoPage } from '../carinfo/carinfo';
import { SetlocationPage } from '../setlocation/setlocation';


@IonicPage()
@Component({
  selector: 'page-jointrip',
  templateUrl: 'jointrip.html',
})
export class JointripPage {
  public loading: Loading;
  public isenable:boolean;
  public jt: Boolean;
  public typee:string;
  public hasCar: Boolean ;
  public userId: number;
  public myPhotoURL:any = 'assets/imgs/head edited.png';
  public user_pts:number;
  public driver_trips;
  public driver_length:number;
  public user_data;
  public car:object ;
  public check_lat:number ;
  public no_car:boolean=false;
  public no_location:boolean=false;

   public jointripform: FormGroup;
  types = ['Go To Academy','Return From Academy'];
  minDate = new Date().toISOString();
  share(slidingItem: ItemSliding) {
    slidingItem.close();
  }


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public modalCtrl: ModalController,
              public events:Events,
              public formBuilder: FormBuilder,
              public tripService: TripService,
              public userService: UserService,
              public platform: Platform) {

                platform.registerBackButtonAction(() => {
                  console.log("backPressed 1");
                },1);

                this.userId = navParams.get("userId");

                this.jointripform = formBuilder.group({
                  date: ['',
                  Validators.compose([Validators.required])],
                  type: new FormControl([''], Validators.compose([Validators.required,collegeval.isValid])
                      )})
  }



launchLocationview(){
  this.navCtrl.setRoot(LocationSelect, {
    userId:this.userId,
    jt:this.jt=true,
    date:this.jointripform.value.date,
    triptype:this.jointripform.value.type});
}

  search(){
    this.launchLocationview();
  }



  ionViewDidLoad() {
this.userService.getUserDetails().subscribe(data =>{
      console.log(data);
      this.user_data = JSON.parse(data["_body"]).Data;
      console.log(this.user_data);
      this.car=this.user_data.car
      this.check_lat=this.user_data.lat
      console.log("laaatt"+this.check_lat);
      this.user_pts=this.user_data.points;
      if( this.car == null ){
      this.no_car=true
     }
     if(this.check_lat==null){
       this.no_location = true
     }
   })

    this.tripService.getDriverTrips(this.userId).subscribe(data => {
    this.driver_trips = JSON.parse(data["_body"]).Data;
    this.driver_length=this.driver_trips.length
    console.log(this.driver_trips);
    });

}

  openprofile():any{
    this.navCtrl.setRoot(ProfilePage,{userId:this.userId});
  }

  open_carinfo(){
    this.navCtrl.setRoot(CarinfoPage,{userId:this.userId,no_car:this.no_car});
  }

  open_setlocation(){
    this.navCtrl.setRoot(SetlocationPage,{userId:this.userId,no_location:this.no_location});
  }

  openmaketrip():any{
    this.navCtrl.setRoot(MaketripPage,{userId:this.userId});
  }

  openprizes():any{
    this.navCtrl.setRoot(PrizesPage,{userId:this.userId});
  }

  openmytrips(){
    this.navCtrl.setRoot(MytripsPage, {userId: this.userId});
  }

  openmytrips_passenger(){
    this.navCtrl.setRoot(Mytrips_passengerPage, {userId: this.userId});
  }





}
