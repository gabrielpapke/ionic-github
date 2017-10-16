import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserPage } from "../user/user";



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  public username; 
  constructor(public navCtrl: NavController) {
    //Apagar
    // this.search();
    //--apagar
  }

  public search() {
      this.navCtrl.push(UserPage, {
        username: this.username
      })
  }

}
