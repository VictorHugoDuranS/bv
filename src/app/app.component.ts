import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OneSignal } from "@ionic-native/onesignal";
import { AndroidPermissions } from '@ionic-native/android-permissions';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'MenuPage';

  constructor(private androidPermissions: AndroidPermissions, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public oneSignal: OneSignal) {
    this.initializeApp();


  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.oneSignal.startInit('758ab395-be7b-4bca-953a-5b45f6185fc4', '151234453636');

      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

      this.oneSignal.handleNotificationReceived().subscribe(() => {
      // do something when notification is received
        });

      this.oneSignal.handleNotificationOpened().subscribe(() => {
      // do something when a notification is opened
      });

      this.oneSignal.endInit();

    });
  }
}
