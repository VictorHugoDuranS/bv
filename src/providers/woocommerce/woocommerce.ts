import { Injectable } from '@angular/core';
import * as WC from 'woocommerce-api';

@Injectable()
export class WoocommerceProvider {

  WooCommerce: any;
      //consumerKey: 'ck_2510794c2178b74e1789e4772c472f6cea3d3195',
      //consumerSecret: 'cs_163d8843eb869f0b1cf4c0ef66cbdead6309c34e',
            //url: 'https://mqv.biz/luisc',
  constructor() {
    this.WooCommerce = WC({
      url: 'https://mqv.biz/luisc',
      consumerKey: 'ck_2510794c2178b74e1789e4772c472f6cea3d3195',
      consumerSecret: 'cs_163d8843eb869f0b1cf4c0ef66cbdead6309c34e',
      wpAPI: true,
      version: 'wc/v2'
    });
  }

  init(){
    return this.WooCommerce;
  }

}
 