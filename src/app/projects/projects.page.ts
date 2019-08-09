import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastController, ModalController, LoadingController, AlertController } from '@ionic/angular';
import { CreateProjectComponent, EditProjectComponent } from '../modals/index';
import { ProjectService } from '../services/project.service';
import { UserService } from '../services/user.service';
import { Project } from '../models/project.model';

@Component({
	selector: 'app-projects',
	templateUrl: './projects.page.html',
	styleUrls:
		[
			'./projects.page.scss'
		],
	providers:
		[
			ProjectService,
			UserService
		]
})
export class ProjectsPage implements OnInit {
	public token;
	public projects: Project[];
	constructor(private toastCtrl: ToastController, private modalCtrl: ModalController, private loadingCtrl: LoadingController, private alertCtrl: AlertController, private router: Router, private _userService: UserService, private _projectService: ProjectService) {
		this.token = _userService.getToken();
	}

	ngOnInit() {
		this.getProjects();
	}

	public getProjects() {
		this._projectService.getProjects(this.token).subscribe(async res => {
			if (res.projects) {
				this.projects = res.projects;
				console.log(this.projects);
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
		this.router.navigate([
			'/login'
		]);
	}

	tasks(id) {
		this.router.navigate([
			'tasks/' + id
		]);
	}

	async createProject() {
		const modal = await this.modalCtrl.create({
			component: CreateProjectComponent
		});
		await modal.present();
		const data = await modal.onDidDismiss();
		if (data.data !== undefined) this.getProjects();
	}

	async editProject(project) {
		let modal = await this.modalCtrl.create({
			component: EditProjectComponent,
			componentProps:
				{
					project: project
				}
		});
		await modal.present();
		const data = await modal.onDidDismiss();
		if (data.data !== undefined) this.getProjects();
	}

	async deleteProject(id) {
		this._projectService.deleteProject(id, this.token).subscribe(async res => {
			if (res.project) {
				let toast = await this.toastCtrl.create({
					message: res.message,
					duration: 2500,
					closeButtonText: 'Cerrar',
					showCloseButton: true
				});
				this.Loader('Cargando...', 1500);
				await toast.present().then(() => {
					this.getProjects();
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
			header: 'Eliminar proyecto',
			message: '¿Está seguro de eliminar el proyecto?',
			buttons:
				[
					{
						text: 'Cancelar',
						role: 'cancel',
						cssClass: 'secondary'
					},
					{
						text: 'Si',
						handler:
							() => {
								this.deleteProject(id);
							}
					}
				]
		});
		await alert.present();
	}

	doRefresh(e) {
		this.getProjects();
		setTimeout(() => {
			e.target.complete();
		}, 2500);
	}
}
