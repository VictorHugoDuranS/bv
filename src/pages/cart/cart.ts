import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { Storage } from "@ionic/storage";



@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  cartItems: any[] = [];
  total: any;
  showEmptyCartMessage: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public viewCtrl: ViewController, public toastCtrl: ToastController) {

    this.total = 0.0;

    this.storage.ready().then(()=>{
      this.storage.get("cart").then((data)=>{
        this.cartItems = data;
        console.log(data);
 
        if(this.cartItems){

          this.cartItems.forEach( (item, index)=> {
            this.total = this.total + (item.product.price * item.qty)
          })

        } else {

          this.showEmptyCartMessage = true;

        }

      })
    })

  }

  removeFromCart(item, i){
 
    let price = item.product.price;
    let qty = item.qty;

    this.cartItems.splice(i, 1);

    this.storage.set("cart", this.cartItems).then( ()=>{

      this.total = this.total - (price * qty);

    });

    if(this.cartItems == null){
      this.showEmptyCartMessage = true;
    }

  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  checkout(){ 
    this.storage.get("userLoginInfo").then( (data) => {
      if (data != null) {
        this.navCtrl.push('CheckoutPage');
      }
      else {
        this.navCtrl.push('CheckoutPage')
      }
    })
  }

  changeQty(item, i, change){
    let price = 0;
    let qty = 0;

    price = parseFloat(item.product.price);
    qty = item.qty;

    if (change < 0 && item.qty == 1) {
      return;
    } 

    qty = qty + change;
    item.qty = qty;
    item.amount = qty * price;

    this.cartItems[i] = item;

    this.storage.set("cart", this.cartItems).then( ()=> {

      this.toastCtrl.create({
        message: "Cart Updated.",
        duration: 2000,
        showCloseButton: true
      }).present();

    });

    this.total = (parseFloat(this.total.toString()) + (parseFloat(price.toString()) * change));

  }

}