import { ProjectService } from 'src/app/services/project.service';
import { LabelService } from './../../services/label.service';
import { TaskService } from './../../services/task.service';
import { NavParams } from '@ionic/angular';
import { Team } from 'src/app/models/team.model';
import { Task } from './../../models/task.model';
import { Component, OnInit } from '@angular/core';
import { Label } from './../../models/label.model';
import { UserService } from 'src/app/services/user.service';
import { ToastController, ModalController } from '@ionic/angular';
import { TeamService } from 'src/app/services/team.service';
import { Project } from 'src/app/models/project.model';

@Component({
	selector: 'app-edit-task',
	templateUrl: './edit-task.component.html',
	styleUrls:
		[
			'./edit-task.component.scss'
		],
	providers:
		[
			UserService,
			TeamService,
			TaskService,
			LabelService,
			ProjectService
		]
})
export class EditTaskComponent implements OnInit {
	public teamId;
	public projectId;
	public project: Project;
	public task: Task;
	public team: Team;
	public labels: Label[];
	public token;
	public members;

	constructor(private navParams: NavParams, private toastCtrl: ToastController, private modalCtrl: ModalController, private _userService: UserService, private _teamService: TeamService, private _taskService: TaskService, private _labelService: LabelService, private _projectService: ProjectService) {
		this.token = this._userService.getToken();
		this.projectId = this.navParams.get('id');
		console.log('Proyecto: ', this.projectId);
		this.task = this.navParams.get('task');
	}

	ngOnInit() {
		this.getLabels();
		this.getProject();
	}

	async update() {
		if (this.task.name != '' && this.task.description != '' && this.task.taskOwner != '') {
			this._taskService.editTask(this.task, this.token).subscribe(async res => {
				if (res.task) {
					let toast = await this.toastCtrl.create({
						message: 'Tarea editada exitosamente',
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

	getLabels() {
		this._labelService.getLabels(this.token).subscribe(async res => {
			if (res.labels) {
				this.labels = res.labels;
				console.log(this.labels);
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

	getProject() {
		this._projectService.getProject(this.projectId, this.token).subscribe(async res => {
			if (res.project) {
				this.project = res.project;
				this.teamId = this.project.developerTeam;
				console.log('Equipo: ', this.teamId);
				this.getTeam(this.teamId);
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

	getTeam(teamId) {
		this._teamService.getTeam(teamId, this.token).subscribe(async res => {
			if (res.team) {
				this.team = res.team;
				this.members = this.team.integrants;
				console.log(this.members);
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
}
