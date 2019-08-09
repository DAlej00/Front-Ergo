import { Task } from './../models/task.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TaskService } from './../services/task.service';
import { ToastController, ModalController, LoadingController, AlertController } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { CreateTaskComponent, EditTaskComponent } from '../modals/index';

@Component({
	selector: 'app-tasks',
	templateUrl: './tasks.page.html',
	styleUrls:
		[
			'./tasks.page.scss'
		],
	providers:
		[
			UserService,
			TaskService
		]
})
export class TasksPage implements OnInit {
	public token;
	public tasks: Task[];
	public projectId: string;

	constructor(private toastCtrl: ToastController, private modalCtrl: ModalController, private loadingCtrl: LoadingController, private alertCtrl: AlertController, private route: ActivatedRoute, private router: Router, private _taskService: TaskService, private _userService: UserService) {
		this.token = _userService.getToken();
	}

	ngOnInit() {
		this.projectId = this.route.snapshot.paramMap.get('id');
		this.getTasks();
	}

	logOut() {
		localStorage.clear();
		this.router.navigate([
			'/login'
		]);
	}

	getTasks() {
		this._taskService.getProjectTasks(this.projectId, this.token).subscribe(async res => {
			if (res.tasks) {
				this.tasks = res.tasks;
				console.log(this.tasks);
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

	async createTask() {
		const modal = await this.modalCtrl.create({
			component: CreateTaskComponent,
			componentProps:
				{
					id: this.projectId
				}
		});
		await modal.present();
		const data = await modal.onDidDismiss();
		if (data.data !== undefined) this.getTasks();
	}

	async Loader(message: string, duration: number) {
		const loading = await this.loadingCtrl.create({
			message: message,
			duration: duration
		});
		await loading.present();
	}

	async editProject(task) {
		let modal = await this.modalCtrl.create({
			component: EditTaskComponent,
			componentProps:
				{
					task: task,
					id: this.projectId
				}
		});
		await modal.present();
		const data = await modal.onDidDismiss();
		if (data.data !== undefined) this.getTasks();
	}

	async deleteTask(id) {
		this._taskService.deleteTask(id, this.token).subscribe(async res => {
			if (res.task) {
				let toast = await this.toastCtrl.create({
					message: res.message,
					duration: 2500,
					closeButtonText: 'Cerrar',
					showCloseButton: true
				});
				this.Loader('Cargando...', 1500);
				await toast.present().then(() => {
					this.getTasks();
				});
			}
		});
	}

	async confirmDelete(id) {
		const alert = await this.alertCtrl.create({
			header: 'Eliminar tarea',
			message: '¿Está seguro de eliminar la tarea?',
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
								this.deleteTask(id);
							}
					}
				]
		});
		await alert.present();
	}

	doRefresh(e) {
		this.getTasks();
		setTimeout(() => {
			e.target.complete();
		}, 2500);
	}
}
