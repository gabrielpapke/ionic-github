import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { ReposPage } from "../repos/repos";

import { User } from "../../app/users/users.model";
import { UsersService } from "../../app/users/users.service";


@Component({
	selector: 'page-user',
	templateUrl: 'user.html'
})
export class UserPage {
	public username;
	public user = new User();
	public alert;
	public loading;
	
	
	constructor(
		public usersService: UsersService,
		public navCtrl: NavController,
		public navParams: NavParams,
		public loadingCtrl: LoadingController,
		public alertCtrl: AlertController
	) {
		this.username = navParams.get('username')
		
		this.loading = this.loadingCtrl.create({
			content: 'Aguarde...'
		});
	}
	
	
	public ionViewDidLoad() {
		
		this.loading.present();
		
		this.usersService.getByUsername(this.username)
		.subscribe(
			user => this.user = user,
			error => this.userNotFound(),
			() => this.loading.dismiss()
		);
	}
	
	public userNotFound() {
		
		this.alert = this.alertCtrl.create({
			title: 'Não encontrado',
			subTitle: `Usuário ${this.username} não encontrado.`,
			buttons: [
				{
					text: 'Ok',
					handler: () => {
						this.loading.dismiss()
						this.navCtrl.pop();
					}
				}
			]
		})
		.present();
	}
	
	public showRepositories() {
		this.navCtrl.push(ReposPage, {
			user: this.user
		})
	}
	
}
