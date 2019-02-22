import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegesterPage } from './regester';

@NgModule({
  declarations: [
    RegesterPage,
  ],
  imports: [
    IonicPageModule.forChild(RegesterPage),
  ],
})
export class RegesterPageModule {}
