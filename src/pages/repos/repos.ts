import { Component, ViewChild} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController, Content, LoadingController } from 'ionic-angular';

import { RepoDetailPage } from "../repo-detail/repo-detail";

import { User } from "../../app/users/users.model";
import { UsersService } from "../../app/users/users.service";

@Component({
	selector: 'page-repos',
	templateUrl: 'repos.html'
})
export class ReposPage {
	@ViewChild(Content) content: Content;
	public user: User;
	public repos: any[];
	public alert;
	public loading;

	public params = {
		page: 1,
		per_page: 10
	}
	public currentPage = 1;
	public pageLoading = false;
	
	
	constructor(
		public usersService: UsersService,
		public navCtrl: NavController,
		public navParams: NavParams,
		public loadingCtrl: LoadingController,
		public alertCtrl: AlertController
	) {
		this.user = navParams.get('user');
		this.repos = [];
		this.loading = this.loadingCtrl.create({
			content: 'Aguarde...'
		});
	}

	public reposError() {
		this.alert = this.alertCtrl.create({
			title: 'Não encontrado',
			subTitle: `Houve um erro ao listar repositórios`,
			buttons: [
				{
					text: 'Tentar mais tarde',
					handler: () => {
						this.loading.dismiss()
						this.navCtrl.pop();
					}
				}
			]
		})
		.present();
	}
	
	
	public ionViewDidLoad() {
		
		this.loading.present();
		
		this.usersService.getPopularRepos(this.user.login)
		.subscribe(
			repos => {
				console.log(repos);
				this.repos = repos
			},
			error => this.reposError(),
			() => this.loading.dismiss()
		);

		this.content.ionScrollEnd.subscribe(
			data => {
				console.log('end');
				if (!this.pageLoading) {
					console.log('load more')
					this.pageLoading = true;
					this.currentPage++;
					this.params = { page: this.currentPage, per_page: 10 };
					
					// this.usersService.getPopularRepos(this.user.login, this.params)
					// 	.subscribe(
					// 		(repos) => {
					// 			console.log(repos);
					// 			this.repos = repos;
					// 		},
					// 		error => this.reposError(),
					// 		() => this.pageLoading = false
					// 	)
			}
						
		});
	}

	public openRepo (repo) {
		this.navCtrl.push(RepoDetailPage, {
			user: this.user,
			repo: repo
		})
	}
}
