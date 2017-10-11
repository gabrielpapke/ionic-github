import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormsModule, FormBuilder, FormControl } from "@angular/forms";
import { UserPage } from "../user/user";



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public userPage = UserPage;
  public username;
  constructor(public navCtrl: NavController) {
  }

  public search() {
      this.navCtrl.push(UserPage, {
        username: this.username
      })
  }

}
