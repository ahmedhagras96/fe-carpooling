import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { CarinfoPage } from '../carinfo/carinfo';

/**
 * Generated class for the CarownershipPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-carownership',
  templateUrl: 'carownership.html',
})
export class CarownershipPage {

public cownership:string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  gotohome(): void {
    this.cownership='No';
    this.navCtrl.setRoot(HomePage);
  }


  carinfo(): void {
  this.cownership='Yes';
    this.navCtrl.push(CarinfoPage);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CarownershipPage');
  }

}
