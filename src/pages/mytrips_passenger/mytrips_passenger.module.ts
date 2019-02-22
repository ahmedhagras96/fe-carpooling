import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Mytrips_passengerPage } from './mytrips_passenger';

@NgModule({
  declarations: [
    Mytrips_passengerPage,
  ],
  imports: [
    IonicPageModule.forChild(Mytrips_passengerPage),
  ],
})
export class TripPageModule {}
