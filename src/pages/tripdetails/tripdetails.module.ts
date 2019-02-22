import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TripdetailsPage } from './tripdetails';

@NgModule({
  declarations: [
    TripdetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(TripdetailsPage),
  ],
})
export class TripdetailsPageModule {}
