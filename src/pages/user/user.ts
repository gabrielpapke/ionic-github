import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { User } from "../../app/users/users.model";
import { UsersService } from "../../app/users/users.service";

@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {
  public username;
  public user = new User();

  constructor(
    public usersService: UsersService,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.username = navParams.get('username')
  }
  ionViewDidLoad() {
    this.usersService.getByUsername(this.username)
      .subscribe(
          user => this.user = user,
          error => alert('Ocorreu um erro, tente novamente mais tarde')
      );
  }

}
