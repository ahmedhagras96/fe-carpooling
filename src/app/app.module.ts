import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';
import { Base64 } from '@ionic-native/base64';
import { Camera } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { Device } from '@ionic-native/device';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SigninPage } from '../pages/signin/signin';
import { RegesterPage } from '../pages/regester/regester';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { ProfilePage } from '../pages/profile/profile';
import { CarinfoPage } from '../pages/carinfo/carinfo';
import { CarownershipPage } from '../pages/carownership/carownership';
import { MaketripPage } from '../pages/maketrip/maketrip';
import { JointripPage } from '../pages/jointrip/jointrip';
import { PrizesPage } from '../pages/prizes/prizes';
import { YourprizesPage } from '../pages/yourprizes/yourprizes';

import { firebaseConfig } from './credentials';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthProvider } from '../providers/auth/auth';
import { pimage } from '../providers/pimage/pimage';
import { ProfileProvider } from '../providers/profile/profile';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SigninPage,
    RegesterPage,
    ResetPasswordPage,
    ProfilePage,
    CarinfoPage,
    CarownershipPage,
    MaketripPage,
    JointripPage,
    PrizesPage,
    YourprizesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig.firbase),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SigninPage,
    RegesterPage,
    ResetPasswordPage,
    ProfilePage,
    CarinfoPage,
    CarownershipPage,
    MaketripPage,
    JointripPage,
    PrizesPage,
    YourprizesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ImagePicker,
    Crop,
    Base64,
    AuthProvider,
    pimage,
    ProfileProvider,
    Geolocation,
    Device

  ]
})
export class AppModule {}
