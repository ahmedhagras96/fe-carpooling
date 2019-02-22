import { Component,ChangeDetectorRef } from "@angular/core";
import {
  Alert,
  AlertController,
  IonicPage,
  NavController,ActionSheetController
} from "ionic-angular";
import { ProfileProvider } from "../../providers/profile/profile";
import { AuthProvider } from "../../providers/auth/auth";
import { SigninPage } from '../signin/signin';
import { HomePage } from '../home/home';
import { pimage } from '../../providers/pimage/pimage';

@IonicPage()
@Component({
  selector: "page-profile",
  templateUrl: "profile.html"
})
export class ProfilePage {
  public userProfile: any;
  collages = ['Engineer', 'ComputerScience'];
  depincolleges = {
   Engineer: ["Construction and Building Engineering " , "Architectural Engineering", "Computer Engineering",
       "Electrical & Control Engineering", "Electronics & Communications Engineering", "Mechanical Engineering"],
   ComputerScience: ["Computer Science Program" , "Information System Program",
      "Multimedia & Graphics Program","Software Engineering Program"]};
   departments = [];

   public college: string ;
   public department: string;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public authProvider: AuthProvider,
    public profileProvider: ProfileProvider,
    private _cdr: ChangeDetectorRef,
    public actionSheetCtrl: ActionSheetController,
    public pimage: pimage,
  ) {}

  ionViewDidLoad() {
    this.profileProvider.getUserProfile().on("value", userProfileSnapshot => {
      this.userProfile = userProfileSnapshot.val();
    });
  };

  openMenu() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Add your picture with',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Camera',
          role: 'takePhoto()',

          handler: () => {
            this.pimage. openCamera();
            console.log('camera clicked');
          }
        },
        {
          text: 'Gallery',
          role: 'selectPhoto()',
          handler: () => {
            this.pimage. openImagePickerCrop();
            console.log('Gallery clicked');
          }
        },

        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  onCollegeChange(): void {
    console.log("Depart");
    let college = this.college;
    this.departments = this.depincolleges[college];
    this._cdr.detectChanges();
    console.log("Depart" );
    console.log("Test", this.departments);
    }


  logOut(): void {
    this.authProvider.logoutUser().then(() => {
      this.navCtrl.setRoot(SigninPage);
    });
  }


  updateName(): void {
    const alert: Alert = this.alertCtrl.create({
      message: "Your name ",
      inputs: [
        {
          name: "Name",
          placeholder: "Your name",
          value: this.userProfile.name
        },

      ],
      buttons: [
        { text: "Cancel" },
        {
          text: "Save",
          handler: data => {
            this.profileProvider.updateName(data.name);
          }
        }
      ]
    });
    alert.present();
  }


  updateid(): void {
    const alert: Alert = this.alertCtrl.create({
      message: "Your ID",
      inputs: [
        {
          name: "id",
          placeholder: "Your  id",
          value: this.userProfile.id
        },
      ],
      buttons: [
        { text: "Cancel" },
        {
          text: "Save",
          handler: data => {
            this.profileProvider.updateid(data.id);
          }
        }
      ]
    });
    alert.present();
  }

  updatephone(): void {
    const alert: Alert = this.alertCtrl.create({
      message: "Your Phone Number",
      inputs: [
        {
          name: "phone",
          placeholder: "Your  Phone Number",
          value: this.userProfile.phone
        }
      ],
      buttons: [
        { text: "Cancel" },
        {
          text: "Save",
          handler: data => {
            this.profileProvider.updatephone(data.phone);
          }
        }
      ]
    });
    alert.present();
  }

  updatectype(): void {
    const alert: Alert = this.alertCtrl.create({
      message: "Your car type",
      inputs: [
        {
          name: "cartype",
          placeholder: "Your car type",
          value: this.userProfile.cartype
        }
      ],
      buttons: [
        { text: "Cancel" },
        {
          text: "Save",
          handler: data => {
            this.profileProvider.updatectype(data.cartype);
          }
        }
      ]
    });
    alert.present();
  }

  updatecmodel(): void {
    const alert: Alert = this.alertCtrl.create({
      message: "Your car model",
      inputs: [
        {
          name: "carmodel",
          placeholder: "Your car model",
          value: this.userProfile.carmodel
        }
      ],
      buttons: [
        { text: "Cancel" },
        {
          text: "Save",
          handler: data => {
            this.profileProvider.updatecmodel(data.carmodel);
          }
        }
      ]
    });
    alert.present();
  }

  updateccolor(): void {
    const alert: Alert = this.alertCtrl.create({
      message: "Your car color",
      inputs: [
        {
          name: "carcolor",
          placeholder: "Your car color",
          value: this.userProfile.carcolor
        }
      ],
      buttons: [
        { text: "Cancel" },
        {
          text: "Save",
          handler: data => {
            this.profileProvider.updateccolor(data.carcolor);
          }
        }
      ]
    });
    alert.present();
  }

  updatecnumber(): void {
    const alert: Alert = this.alertCtrl.create({
      message: "Your car number",
      inputs: [
        {
          name: "carnumber",
          placeholder: "Your car number",
          value: this.userProfile.carnumber
        }
      ],
      buttons: [
        { text: "Cancel" },
        {
          text: "Save",
          handler: data => {
            this.profileProvider.updatecnumber(data.carnumber);
          }
        }
      ]
    });
    alert.present();
  }


  updateEmail(): void {
    let alert: Alert = this.alertCtrl.create({
      inputs: [{ name: 'newEmail', placeholder: 'Your new email' },
      { name: 'password', placeholder: 'Your password', type: 'password' }],
      buttons: [
        { text: 'Cancel' },
        { text: 'Save',
          handler: data => {
            this.profileProvider
              .updateEmail(data.newEmail, data.password)
              .then(() => { console.log('Email Changed Successfully'); })
              .catch(error => { console.log('ERROR: ' + error.message); });
        }}]
    });
    alert.present();
  }

  updatePassword(): void {
    let alert: Alert = this.alertCtrl.create({
      inputs: [
        { name: 'newPassword', placeholder: 'New password', type: 'password' },
        { name: 'oldPassword', placeholder: 'Old password', type: 'password' }],
      buttons: [
        { text: 'Cancel' },
        { text: 'Save',
          handler: data => {
            this.profileProvider.updatePassword(
              data.newPassword,
              data.oldPassword
            );
          }
        }
      ]
    });
    alert.present();
  }


}
