import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule,NavController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';
import { Base64 } from '@ionic-native/base64';
import { Camera } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { Device } from '@ionic-native/device';
import { Network } from '@ionic-native/network';

import { MyApp } from './app.component';
import { SigninPage } from '../pages/signin/signin';
import { RegesterPage } from '../pages/regester/regester';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { ProfilePage } from '../pages/profile/profile';
import { CarinfoPage } from '../pages/carinfo/carinfo';
import { MaketripPage } from '../pages/maketrip/maketrip';
import { JointripPage } from '../pages/jointrip/jointrip';
import { PrizesPage } from '../pages/prizes/prizes';
import { LocationSelect } from '../pages/location-select/location-select';
import { MytripsPage } from '../pages/mytrips_driver/mytrips';
import { Mytrips_passengerPage } from '../pages/mytrips_passenger/mytrips_passenger';
import { MytripPage } from '../pages/mytrip/mytrip';
import { TripdetailsPage } from '../pages/tripdetails/tripdetails';
import { SetlocationPage } from '../pages/setlocation/setlocation';

import { UserService} from '../pages/services/user.service';
import { CarService} from '../pages/services/car.service';
import { TripService} from '../pages/services/trip.service';
import { AuthProvider } from '../providers/auth/auth';
import { pimage } from '../providers/pimage/pimage';
import { ComponentsModule } from '../components/components.module';
import { PeopleServiceProvider } from '../providers/people-service/people-service';
import { ConnectivityService } from '../providers/connectivity-service/connectivity-service';
import { GoogleMapsProvider } from '../providers/google-maps/google-maps';
import { AddmarkProvider } from '../providers/addmark/addmark';
import { NgxQRCodeModule} from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@NgModule({
  declarations: [
    MyApp,
    SigninPage,
    RegesterPage,
    ResetPasswordPage,
    ProfilePage,
    CarinfoPage,
    MaketripPage,
    JointripPage,
    PrizesPage,
    LocationSelect,
    MytripsPage,
    Mytrips_passengerPage,
    MytripPage,
    TripdetailsPage,
    SetlocationPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ComponentsModule,
    HttpModule,
    NgxQRCodeModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SigninPage,
    RegesterPage,
    ResetPasswordPage,
    ProfilePage,
    CarinfoPage,
    MaketripPage,
    JointripPage,
    PrizesPage,
    LocationSelect,
    MytripsPage,
    Mytrips_passengerPage,
    MytripPage,
    TripdetailsPage,
    SetlocationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ImagePicker,
    Crop,
    Base64,
    AuthProvider,
    pimage,
    Geolocation,
    Device,
    PeopleServiceProvider,
    Network,
    ConnectivityService,
    GoogleMapsProvider,
    AddmarkProvider,
    UserService,
    CarService,
    TripService,
    BarcodeScanner
  ]
})
export class AppModule {}
