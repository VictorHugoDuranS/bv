import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Content, ModalController } from "ionic-angular";

import { WeatherAgentProvider } from "../../providers/weather-agent/weather-agent";



/**
 * Generated class for the Bosky3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bosky3',
  templateUrl: 'bosky3.html',
})
export class Bosky3Page {
  messages: any = [];
  chatBox: string = "";
  from: {
    user: "Usuario";
    bot: "Agente";
  };
  @ViewChild(Content) content: Content;
  currentDate = Date.now();

  constructor(public navCtrl: NavController, public navParams: NavParams,     public weatherAgent: WeatherAgentProvider,
    public modalCtrl: ModalController) {
      this.weatherAgent.conversation.subscribe(res => {
        this.messages = [...this.messages, ...res];
        this.scrollToBottom();
      });
  }
  send(chatBox) {
    //console.log(chatBox);
    this.weatherAgent.talk(chatBox).then(() => {
      this.chatBox = "";
    });
  }

  scrollToBottom() {
    setTimeout(() => {
      this.content.scrollToBottom();
    });
  }

  keyPressHandler(keyCode, chatBox) {
    //console.log("keyPressHandler", keyCode);
    // Pressed enter key.
    if (keyCode == 13) {
      this.weatherAgent.talk(chatBox).then(() => {
        this.chatBox = "";
      });
    }
  }

}
