import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { WoocommerceProvider } from '../../providers/woocommerce/woocommerce';

@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {
tot:any;
  WooCommerce: any;
  newOrder: any;
  paymentMethods: any[];
  paymentMethod: any; 
  billing_shipping_same: boolean;
  userInfo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public alertCtrl: AlertController, private payPal: PayPal, private WP: WoocommerceProvider) {
    this.newOrder = {};
    this.newOrder.billing = {};
    this.newOrder.shipping = {};
    this.billing_shipping_same = false;

    this.paymentMethods = [
      { method_id: "paypal", method_title: "PayPal" }];
    this.WooCommerce = WP.init();

  
  }

  setBillingToShipping() {
    this.billing_shipping_same = !this.billing_shipping_same;

    if (this.billing_shipping_same) {
      this.newOrder.shipping = this.newOrder.billing;
    }

  }

  placeOrder() {

    let orderItems: any[]=[];
    let data: any = {};

    let paymentData: any = {};

    this.paymentMethods.forEach((element, index) => {
      if (element.method_id == this.paymentMethod) {
        paymentData = element;
      }
    });
    data = {

      //Fixed a bug here. Updated in accordance with wc/v2 API
      payment_method: paymentData.method_id,
      payment_method_title: paymentData.method_title,
      set_paid: true,

      billing: this.newOrder.billing,
      shipping: this.newOrder.shipping,
      
      line_items: orderItems
      
    };

    if (paymentData.method_id == "paypal") {
      this.storage.get("cart").then((cart) => {
      this.payPal.init({
        PayPalEnvironmentProduction: "AVNOvvhGRxLhUqUzHburwScJUM7RqQOrW536jKhnfnB0Ou2ObZoxwl-DNbHw8TNPmgD7JzKorPBVajF",
        PayPalEnvironmentSandbox: "AYRr5hfq00I-CcbYlhvqkhLpEMyRJ69i9lgut8_8QnhHL4f6WuHDq6RS8_ADSMlhmk9rqBHKGcnUK8KS"
      }).then(() => {
        // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
        this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
          // Only needed if you get an "Internal Service Error" after PayPal login!
          //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
        })).then(() => {  
         
          let cant = 0;
          var total : any;
          cart.forEach((element) => {
  
            if(element.variation){
              orderItems.push({ product_id: element.product.id, variation_id: element.variation.id, quantity: element.qty });
             total = cant + (element.variation.price * element.qty);
            } else {
              orderItems.push({ product_id: element.product.id, quantity: element.qty });
              total = cant + (element.product.price * element.qty);
            }
          });
            let payment = new PayPalPayment( total.toString(), 'USD', 'Description', 'sale');
            this.payPal.renderSinglePaymentUI(payment).then((response) => {
              // Successfully paid

              alert(JSON.stringify(response));


              data.line_items = orderItems;
              //console.log(data);
              let orderData: any = {};

              orderData.order = data;

              this.WooCommerce.postAsync('orders', orderData.order).then((data) => {
                alert("Order placed successfully!");

                let response = (JSON.parse(data.body));

                this.alertCtrl.create({
                  title: "Order Placed Successfully",
                  message: "Your order has been placed successfully. Your order number is " + this.tot,
                  buttons: [{
                    text: "OK",
                    handler: () => {
                      this.navCtrl.push('HomePage');
                    }
                  }]
                }).present();
              })

            })

          }, () => {
            // Error or render dialog closed without being successful
          });
        }, () => {
          // Error in configuration
        });
      }, () => {
        // Error in initialization, maybe PayPal isn't supported or something else
      });

 



    } else {

      let alert = this.alertCtrl.create({
        title: 'Pago',
        subTitle: 'Elije un método de pago',
        buttons: ['Lo haré']
      });
      alert.present();


    }


  }

}