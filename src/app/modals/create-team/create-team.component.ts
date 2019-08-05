import { Component, OnInit } from '@angular/core';
import { Team } from '../../models/team.model';
import { UserService } from 'src/app/services/user.service';
import { NavParams, ToastController, ModalController } from '@ionic/angular';
import { TeamService } from 'src/app/services/team.service';

@Component({
	selector: 'app-create-team',
	templateUrl: './create-team.component.html',
	styleUrls:
		[
			'./create-team.component.scss'
		],
	providers:
		[
			UserService,
			TeamService
		]
})
export class CreateTeamComponent implements OnInit {
	public token;
	public team: Team;

	constructor(private navParams: NavParams, private toastCtrl: ToastController, private modalCtrl: ModalController, private _teamService: TeamService, private _userService: UserService) {
		this.team = new Team('', '', '', [
			{ user: '', rol: '',supervisor:'' }
		],'');
		this.token = this._userService.getToken();
	}

	ngOnInit() {}

	async create() {
		if (this.team.description == '' || this.team.name == '') {
			let toast = await this.toastCtrl.create({
				message: 'Necesita llenar todos los campos',
				duration: 2500,
				closeButtonText: 'Cerrar',
				showCloseButton: true
			});
			await toast.present();
		} else {
			this._teamService.addTeam(this.token, this.team).subscribe(async res => {
				if (res.team) {
					let toast = await this.toastCtrl.create({
						message: 'Equipo creado exitosamente',
						duration: 2500,
						closeButtonText: 'Cerrar',
						showCloseButton: true
					});
					await toast.present().then(() => {
						this.modalCtrl.dismiss({ E: 1 });
					});
				} else {
					let toast = await this.toastCtrl.create({
						message: res.message,
						duration: 2500,
						closeButtonText: 'Cerrar',
						showCloseButton: true
					});
					await toast.present();
				}
			});
		}
	}

	cancel() {
		this.modalCtrl.dismiss();
	}
}
