import { Component, ViewChild} from '@angular/core';
import { AlertController, Content, InfiniteScroll, LoadingController, NavController, NavParams } from 'ionic-angular';

import { RepoDetailPage } from "../repo-detail/repo-detail";

import { User } from "../../app/users/users.model";
import { UsersService } from "../../app/users/users.service";

@Component({
	selector: 'page-repos',
	templateUrl: 'repos.html'
})
export class ReposPage {
	@ViewChild(Content) content: Content;
	@ViewChild(InfiniteScroll) infinite: InfiniteScroll;
	public user: User;
	public repos: any[];
	public alert;
	public loading;

	public params = {
		page: 1,
		per_page: 10,
		direction: 'asc'
	}
	public currentPage = 1;
	public pageLoading = false;
	public enable = true;
	
	
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
		
		this.usersService.getPopularRepos(this.user.login, this.params)
		.subscribe(
			repos => this.repos = repos,
			error => this.reposError(),
			() => this.loading.dismiss()
		);
	}

	public doInfinite(infiniteScroll) {
		if (!this.pageLoading && this.enable) {
			console.log('load more')
			this.pageLoading = true;
			this.currentPage++;
			this.params.page = this.currentPage;

			this.usersService.getPopularRepos(this.user.login, this.params)
				.subscribe(
					(repos) => {
						console.log(repos);
						if (repos.length == 0) {
							infiniteScroll.enable(false);
							this.enable = false;
						} else {
							for (let i = 0; i < repos.length; i++) {
								this.repos.push( repos[i] );
							}
						}
						infiniteScroll.complete();
					},
					error => this.reposError(),
					() => this.pageLoading = false
			)
		}
	}

	public resetFilter (_dir: string) {
		this.enable = true;
		this.infinite.enable(true);
		this.currentPage = 1;
		this.params = {
			page: 1,
			per_page: 10,
			direction: _dir
		}
	}

	public openRepo (repo) {
		this.navCtrl.push(RepoDetailPage, {
			user: this.user,
			repo: repo
		})
	}
}
