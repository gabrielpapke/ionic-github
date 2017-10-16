import { Component } from '@angular/core';
import { AlertController, NavController, NavParams, LoadingController } from 'ionic-angular';

import { Repo } from "../../app/repos/repos.model";
import { ReposService } from "../../app/repos/repos.service";

@Component({
	selector: 'page-repo-detail',
	templateUrl: 'repo-detail.html'
})
export class RepoDetailPage {
	public user;
	public repo = new Repo();
	public alert;
	public loading;
	
	
	constructor(
		public reposService: ReposService,
		public navCtrl: NavController,
		public navParams: NavParams,
		public loadingCtrl: LoadingController,
		public alertCtrl: AlertController
	) {
		this.user = navParams.get('user')
		this.repo = navParams.get('repo')
		
		this.loading = this.loadingCtrl.create({
			content: 'Aguarde...'
		});
	}
	
	
	public ionViewDidLoad() {
		
		this.loading.present();
		
		this.reposService.getByRepoName(this.repo.full_name)
		.subscribe(
			repo => this.repo = repo,
			error => this.repoNotFound(),
			() => this.loading.dismiss()
		);
	}
	
	public repoNotFound() {
		
		this.alert = this.alertCtrl.create({
			title: 'Não encontrado',
			subTitle: `Repositório ${this.repo.name} não encontrado.`,
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
	
}
