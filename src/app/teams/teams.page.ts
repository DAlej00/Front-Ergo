import { Team } from './../models/team.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeamService } from '../services/team.service';
import { ToastController, ModalController, AlertController, LoadingController } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { CreateTeamComponent, EditTeamComponent } from '../modals/index';
import { AddMemberComponent } from '../modals/add-member/add-member.component';

@Component({
	selector: 'app-teams',
	templateUrl: './teams.page.html',
	styleUrls: ['./teams.page.scss'],
	providers: [
		TeamService,
		UserService
	]
})
export class TeamsPage implements OnInit {
	public token;
	public identity;
	public status;
	public teams: Team;
	constructor(
		private router: Router,
		private _teamService: TeamService,
		private toastCtrl: ToastController,
		private modalCtrl: ModalController,
		private alertCtrl: AlertController,
		private loadingCtrl: LoadingController,
		private _userService: UserService
	) {
		this.token = this._userService.getToken();
		this.identity = this._userService.getIdentity();
	}

	ngOnInit() {
		this.getTeams();
	}

	getTeams() {
		this._teamService.getTeams(this.token).subscribe(async res => {
			if (res.teams) {
				this.teams = res.teams;
				console.log(this.teams);
			} else {
				let toast = await this.toastCtrl.create({
					message: res.message,
					duration: 2500,
					closeButtonText: 'Close',
					showCloseButton: true
				});
				await toast.present();
			}
		});
	}

	logOut() {
		localStorage.clear();
		this.router.navigate(['/login']);
	}

	async createTeam() {
		const modal = await this.modalCtrl.create({
			component: CreateTeamComponent
		});
		await modal.present();
		const data = await modal.onDidDismiss();
		if (data.data !== undefined) this.getTeams();
	}

	async members(team) {
		let modal = await this.modalCtrl.create({
			component: AddMemberComponent,
			componentProps: {
				team: team
			}
		});
		await modal.present();
		const data = await modal.onDidDismiss();
		if (data.data !== undefined) {
			this.getTeams(); console.log(data.data);
		}
	}

	async editTeam(team) {
		let modal = await this.modalCtrl.create({
			component: EditTeamComponent,
			componentProps: {
				team: team
			}
		});
		await modal.present();
		const data = await modal.onDidDismiss();
		if (data.data !== undefined) this.getTeams();
	}

	async deleteTeam(id) {
		this._teamService.deleteTeam(id, this.token).subscribe(async res => {
			if (res.team) {
				let toast = await this.toastCtrl.create({
					message: res.message,
					duration: 2500,
					closeButtonText: 'Cerrar',
					showCloseButton: true
				});
				this.Loader('Cargando...', 1500);
				await toast.present().then(() => {
					this.getTeams();
				});
			}
		});
	}

	async Loader(message: string, duration: number) {
		const loading = await this.loadingCtrl.create({
			message: message,
			duration: duration
		});
		await loading.present();
	}

	async confirmDelete(id) {
		const alert = await this.alertCtrl.create({
			header: 'Eliminar equipo',
			message: '¿Está seguro de eliminar el equipo?',
			buttons:
				[{
					text: 'Cancelar',
					role: 'cancel',
					cssClass: 'secondary'
				},
				{
					text: 'Si',
					handler:
						() => {
							this.deleteTeam(id);
						}
				}]
		});
		await alert.present();
	}

	doRefresh(e) {
		this.getTeams();
		setTimeout(() => {
			e.target.complete();
		}, 2500);
	}
}
