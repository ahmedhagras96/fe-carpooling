import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MytripPage } from './mytrip';


@NgModule({
  declarations: [
    MytripPage,
  ],
  imports: [
    IonicPageModule.forChild(MytripPage),
  ],
})
export class MytripsPageModule {}
