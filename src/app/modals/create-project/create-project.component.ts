import { TeamService } from 'src/app/services/team.service';
import { Project } from './../../models/project.model';
import { ProjectService } from './../../services/project.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ToastController, ModalController } from '@ionic/angular';
import { Team } from 'src/app/models/team.model';

@Component({
	selector: 'app-create-project',
	templateUrl: './create-project.component.html',
	styleUrls:
		[
			'./create-project.component.scss'
		],
	providers:
		[
			ProjectService,
			TeamService,
			UserService
		]
})
export class CreateProjectComponent implements OnInit {
	public project: Project;
	public teams: Team;
	public team:Team[];
	public token;

	constructor(private toastCtrl: ToastController, private modalCtrl: ModalController, private _userService: UserService, private _teamService: TeamService, private _projectService: ProjectService) {
		this.token = this._userService.getToken();
		this.project = new Project('', '', '', '', '');
	}

	ngOnInit() {
		//this.getUserTeams();
		this.getTeams()
	}

	public getTeams(){
		this._projectService.getTeams(this.token).subscribe( 
			async res=>{
				if(res.team){
					this.team = res.team;
					this.team.sort();
					console.log(this.team);

				}else{
					let toast = await this.toastCtrl.create({
						message: res.message,
						duration: 2500,
						closeButtonText: 'Close',
						showCloseButton: true
					});
					await toast.present();
				}
			}
		)
	}
	// public getUserTeams() {
	// 	this._teamService.getTeams(this.token).subscribe(async res => {
	// 		if (res.teams) {
	// 			this.teams = res.teams;
	// 			console.log(this.teams);
	// 		} else {
	// 			let toast = await this.toastCtrl.create({
	// 				message: res.message,
	// 				duration: 2500,
	// 				closeButtonText: 'Close',
	// 				showCloseButton: true
	// 			});
	// 			await toast.present();
	// 		}
	// 	});
	// }

	async create() {
		console.log(this.project);
		
		if (this.project.name != '' && this.project.description != '' && this.project.developerTeam) {
			this._projectService.addProject(this.token,this.project).subscribe(async res => {
				if (res.project) {
					let toast = await this.toastCtrl.create({
						message: 'Proyecto creado exitosamente',
						duration: 2500,
						closeButtonText: 'Cerrar',
						showCloseButton: true
					});
					await toast.present().then(() => {
						this.modalCtrl.dismiss({ C: 1 });
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
		} else {
			let toast = await this.toastCtrl.create({
				message: 'Necesita llenar todos los campos',
				duration: 2500,
				closeButtonText: 'Cerrar',
				showCloseButton: true
			});
			await toast.present();
		}
	}

	async cancel() {
		this.modalCtrl.dismiss();
	}
}
