import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular'
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username: string;
  password: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public toastCtrl: ToastController, public storage: Storage, public alertCtrl: AlertController
) {

  }
  login(){
let url = "/api/auth/generate_auth_cookie/?insecure=cool&username=" + this.username + "&password=" + this.password;
    this.http.get(url)
    .subscribe( (res)=>{
      console.log(res.json());

      let response = res.json();

      if (response.error) {
        this.toastCtrl.create({
          message: response.error,
          duration: 5000
        }).present();
        return;
      }
      this.storage.set("userLoginInfo", response).then( (data)=>{
        this.alertCtrl.create({
          title: "Login Successful",
          message: "You have been logged in successfully",
          buttons: [{
            text: "OK",
            handler: () => {
              if (this.navParams.get("next")) {
                this.navCtrl.push(this.navParams.get("next"));
              } else {
                this.navCtrl.pop();
              }
            }
          }]
        }).present();

      })

    }); 

	 }
	     /*public navCtrl: NavController,
		public navParams: NavParams,
		public toastCtrl: ToastController,
		private loginProvider: LoginProvider,
		public loadingCtrl: LoadingController,
		public viewCtrl: ViewController,
		public storage: Storage,
	public events: Events*/
 /*ionViewDidLoad() {
		this.start()
  }
  start() {

		this.storage.get('userLoginInfo').then( data => {
		  if( data ) {
		    // do checks here
		    this.loggedIn = true
		  } else {
		    this.loggedIn = false
		  }
		})

  }
  doLogin() {

		if( !this.login )
			this.presentToast( 'Please enter a valid login.' );

		this.showSpinner()

		this.loginProvider.login( this.login ).then( response => {

			if( !response || (<any>response).success === false ) {
				this.loginErr( response )
				return;
			}

			let login_data = (<any>response).data;

			console.log( login_data )

			this.presentToast( login_data.message );
			this.events.publish('user:login', login_data )
			this.storage.set( 'userLoginInfo', login_data )
			this.dismiss()

			this.hideSpinner()

		}, (err) => {

			this.hideSpinner()
			this.loginErr(err)

		}).catch( e => {
			console.warn(e)
			this.hideSpinner()
			this.presentToast( 'There was a problem connecting to the server.' );
		})

		// make sure spinner disappears even if there's a problem
		setTimeout( () => {
			this.hideSpinner();
		}, 5000 );
	}

	doLogout() {

		this.showSpinner()

		this.loginProvider.login( {}, true ).then( response => {

			if( !response || (<any>response).success === false ) {
				this.loginErr( response )
				return;
			}

			let login_data = (<any>response).data;

			console.log( login_data )

			this.presentToast( login_data.message )
			this.events.publish('user:login', login_data )
			this.storage.remove( 'user_login' )
			this.dismiss()

			this.hideSpinner()

		}, (err) => {

			this.hideSpinner()
			this.loginErr(err)

		}).catch( e => {
			console.warn(e)
			this.hideSpinner()
			this.presentToast( 'There was a problem connecting to the server.' );
		})

		// make sure spinner disappears even if there's a problem
		setTimeout( () => {
			this.hideSpinner();
		}, 5000 );

	}

	loginErr( err ) {

		console.log(err)

		this.hideSpinner()

		this.presentToast( err.data.message );

	}

	dismiss() {
		this.viewCtrl.dismiss();
	}

	showSpinner() {
		this.spinner = this.loadingCtrl.create();

		this.spinner.present();
	}

	hideSpinner() {
		this.spinner.dismiss();
	}

	presentToast(msg) {

		console.log(msg)

	    let toast = this.toastCtrl.create({
	      message: msg,
	      duration: 5000,
	      position: 'bottom'
	    });

	    toast.present();

	}*/
	}

