import { Component, ChangeDetectorRef } from '@angular/core';
import {
  IonicPage, NavController, NavParams, Loading,
  LoadingController, Alert, AlertController, ToastController, ActionSheetController, Platform
} from 'ionic-angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { EmailValidator } from '../../validators/email';
import { idvalidator } from '../../validators/id';
import { collegeval } from '../../validators/collegeval';

import { AuthProvider } from '../../providers/auth/auth';
import { UserService } from '../services/user.service';
import { LocationSelect } from '../location-select/location-select';
import { JointripPage } from '../jointrip/jointrip';
import { SigninPage } from '../signin/signin';
import { CarService } from '../services/car.service';

@IonicPage()
@Component({
  selector: "page-profile",
  templateUrl: "profile.html"
})
export class ProfilePage {
  public userprofile_form: any;
  public carform: any;
  public department: string;
  public userId: number;
  public myPhotoURL: any = 'assets/imgs/head edited.png';

  public ccollege:string;
  public cdepartment:string;
  public car_cmodel;

  public setloc: boolean = false;
  public saveloc: boolean = true;
  public userdata = {};
  public user_data;
  public car_data;
  public cardata = {};
  public loading: Loading;

  public set_lat: number ;
  public set_long: number ;
  public updated_user : any = {};
  public car:object ;
  public car_number;

  form: FormGroup;
  collages = ['Engineer', 'ComputerScience'];
  depincolleges = {
    Engineer: ["Construction and Building Engineering ", "Architectural Engineering", "Computer Engineering",
      "Electrical & Control Engineering", "Electronics & Communications Engineering", "Mechanical Engineering"],
    ComputerScience: ["Computer Science Program", "Information System Program",
      "Multimedia & Graphics Program", "Software Engineering Program"]
  };
  departments = [];

  constructor(
    public userService: UserService,
    public navCtrl: NavController,
    public navParams: NavParams,
    public authProvider: AuthProvider,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    fb: FormBuilder,
    private _cdr: ChangeDetectorRef,
    public actionSheetCtrl: ActionSheetController,
    public carService: CarService
  ) {
    this.userprofile_form = formBuilder.group({
      email: ['',
        Validators.compose([Validators.required, EmailValidator.isValid])],
      name: ['',
        Validators.compose([Validators.required, Validators.maxLength(20)])],
      id: ['',
        Validators.compose([Validators.required, idvalidator.isValid])],
      phone: ['',
        Validators.compose([Validators.required, Validators.maxLength(13), Validators.minLength(7)])],
      college: new FormControl([''], Validators.compose([Validators.required, collegeval.isValid])),
      department: new FormControl([''], Validators.compose([Validators.required, collegeval.isValid])),
      ctype: ['',
        Validators.compose([Validators.required])],
      cmodel: ['',
        Validators.compose([Validators.required])],
      ccolor: ['',
        Validators.compose([Validators.required])],
      cnumber: ['',
        Validators.compose([Validators.required])],
    },
     );


    this.setloc = navParams.get('setloc');
    this.saveloc = navParams.get('saveloc');
    this.set_lat = navParams.get('set_lat');
    this.set_long = navParams.get('set_long');
    this.userId = navParams.get("userId");
    this.car_number = navParams.get("car_number");

  }

  ionViewDidLoad() {
    console.log('user id is ' + this.userId);
    console.log('set_lat is ' + this.set_lat);
    console.log('set_long is ' + this.set_long);
    console.log("Profile form" , this.userprofile_form);

    this.userService.getUserDetails().subscribe(data=>{
    this.userdata = JSON.parse(data["_body"]).Data;
    this.user_data = JSON.parse(data["_body"]).Data;
    this.car=this.user_data.car
    this.cardata = this.userdata["car"];
    this.car_data = this.userdata["car"];
    this.ccollege=this.user_data.collage;
    this.cdepartment=this.user_data.department;
    this.car_cmodel=this.car_data.model;
    this.car_number=this.car_data.number;
    console.log("user Dataaa", this.userdata);
    console.log("Car Dataaa", this.cardata);
    });
  }



  returnto_jointrip() {
    this.navCtrl.setRoot(JointripPage, { userId: this.userId })
  }

  edituser() {
    console.log("After submit");


    this.updated_user["email"]= this.userprofile_form.value.email;
    this.updated_user['name'] = this.userprofile_form.value.name;
    this.updated_user['phone'] = this.userprofile_form.value.phone;
    this.updated_user['code'] = this.userprofile_form.value.id;
    this.updated_user['collage'] = this.userprofile_form.value.college;
    this.updated_user['department'] = this.userprofile_form.value.department;
    this.updated_user['car_model'] =  this.userprofile_form.value.cmodel;
    this.updated_user['car_color'] = this.userprofile_form.value.ccolor;
    this.updated_user['car_type'] = this.userprofile_form.value.ctype;
    this.updated_user['car_number'] = this.userprofile_form.value.cnumber;
    this.userService.updatesUser(this.updated_user).subscribe(data=>{
      this.navCtrl.setRoot(JointripPage, { userId: this.userId,car_number:this.car_number })
    });
  }

  logOut(){
    this.loading = this.loadingCtrl.create();
    this.loading.present();

    this.userService.logout().subscribe(data=>{
      this.loading.dismiss().then(() => {
      localStorage.setItem("key" , "");
      this.navCtrl.setRoot(SigninPage);
    })
  },
    error=>{

      this.loading.dismiss().then(() => {
        const alert: Alert = this.alertCtrl.create({
          message: JSON.parse(error["_body"]).Message,
          buttons: [{ text: 'Ok', role: 'cancel' }]
        });
        alert.present();
      });
    });
  }



  onCollegeChange(): void {
    let college = this.userprofile_form.get('college').value;
    this.departments = this.depincolleges[college];
    this._cdr.detectChanges();
  }


  launchLocationPage() {
    this.navCtrl.setRoot(LocationSelect, {
      set_lat: this.set_lat,
      set_long: this.set_long,
      saveloc: this.saveloc = true,
      setloc: this.setloc = true,
      userId: this.userId
    });
  }

  startloc() {
    this.launchLocationPage()
  }

}
