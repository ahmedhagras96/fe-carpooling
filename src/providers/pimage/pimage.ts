import { Injectable } from '@angular/core';
import { Platform ,AlertController,Alert} from 'ionic-angular';
import { Crop } from '@ionic-native/crop';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import firebase ,{User} from 'firebase';

import 'firebase/storage';

@Injectable()
export class pimage {


  public photoUIID: string;
  public myPhotosRef: any;
  public myPhotoURL:any = 'assets/imgs/blank-avatar.jpg';
  public cropphoto:any
  public useruuid: any;
  public currentUser: User;


  constructor(public platform: Platform,
  public camera:Camera,
  public Cropserve:Crop,
  public imagePicker: ImagePicker,
  public alertCtrl: AlertController) {this.myPhotosRef = firebase.storage().ref('/Photos/');
  firebase.auth().onAuthStateChanged( user => {
    if(user){
      this.currentUser = user;
      this.useruuid = firebase.database().ref(`/userProfile/${user.uid}`).once('value', (snapshot) => {
        let users = [];
        snapshot.forEach( snap => {
          users.push(snap.val().uuid); //or snap.val().name if you just want the name and not the whole object
        });
      });
    }
  });


}


  openCamera() {
    let options = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: false,
      targetWidth: 400,
      targetHeight: 400,
      allowEdit: false
  }

  this.camera.getPicture(options).then((imageData) => {
        // don't need to crop image for iOS platform as it is a in-build feature
        if (this.platform.is('ios')) {
          this.getFileUri(imageData);
        }else { // android platform, we need to do manually
          this.Cropserve.crop(imageData, { quality: 100 }).then(newImage => {
              this.getFileUri(newImage);
            },
            error => console.error('Error cropping image', error)
          );
       }
  }, (err) => {
      console.log('Error camera image', err);
  });
  }


  openImagePickerCrop(){
    let option = {
      quality:100,
      targetHeight:100,
      targetWidth:100
    };
    this.imagePicker.hasReadPermission().then(
      (result) => {
        if(result == false){
          // no callbacks required as this opens a popup which returns async
          this.imagePicker.requestReadPermission();
        }
        else if(result == true){
          this.imagePicker.getPictures({
            maximumImagesCount: 1
          }).then(
            (results) => {
              for (var i = 0; i < results.length; i++) {
                // don't need to crop image for iOS platform as it is a in-build feature
        if (this.platform.is('ios')) {
          this.getFileUri(results[i]);
        }else { // android platform, we need to do manually
          this.Cropserve.crop(results[i], { quality: 100 }).then(newImage => {
              this.getFileUri(newImage);
            },
            error => console.error('Error cropping image', error)
          );
       }
  } (err) => {
      console.log('Error camera image', err);
              }
            }, (err) => console.log(err)
          );
        }
      }, (err) => {
        console.log(err);
      });
  }


  private getFileUri = (url: any) => {
  var scope = this;
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    var reader = new FileReader();
    reader.onload = function() {
      scope.myPhotoURL = reader.result;
    }
    reader.readAsDataURL(xhr.response);
  }
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
  }


  uploadPhoto(imageURI){
    imageURI=this.myPhotoURL
    var generatedUUID = this.generateUUID();
    return new Promise<any>((resolve, reject) => {
      let imageRef = this.myPhotosRef.child(generatedUUID).child('Profileimage');
      this.encodeImageUri(imageURI, function(image64){
        imageRef.putString(image64, 'data_url')
        .then(snapshot => {
          resolve(snapshot.downloadURL)
        }, err => {
          reject(err);
        })
      })
    })
  }

  changePhoto(imageURI){
    imageURI=this.myPhotoURL
    return new Promise<any>((resolve, reject) => {
      let imageRef = this.myPhotosRef.child(this.useruuid).child('Profileimage');
      this.encodeImageUri(imageURI, function(image64){
        imageRef.putString(image64, 'data_url')
        .then(snapshot => {
          resolve(snapshot.downloadURL)
        }, err => {
          reject(err);
        })
      })
    })
  }


public generateUUID(): any {
var d = new Date().getTime();
var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
var r = (d + Math.random() * 16) % 16 | 0;
d = Math.floor(d / 16);
return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
});
this.photoUIID=uuid;
return uuid;

}

encodeImageUri(imageUri, callback) {
var c = document.createElement('canvas');
var ctx = c.getContext("2d");
var img = new Image();
img.onload = function () {
var aux:any = this;
c.width = aux.width;
c.height = aux.height;
ctx.drawImage(img, 0, 0);
var dataURL = c.toDataURL("image/jpeg");
callback(dataURL);
};
img.src = imageUri;
};


}
