import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



/**
 * Generated class for the ArPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ar',
  templateUrl: 'ar.html',
})
export class ArPage {

  url="https://xr.plus/ksw";
  constructor( public navCtrl: NavController, public navParams: NavParams) {
  
  } 

/*govr(){
  const options: InAppBrowserOptions = {
    hideurlbar: 'yes',
    hardwareback: 'yes',
    mediaPlaybackRequiresUserAction: 'no'
  };
  this.InAppBrowser.create(this.url,'_self', options)
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad ArPage');
  }*/

}
