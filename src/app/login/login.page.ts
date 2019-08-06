import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController, LoadingController, NavController } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls:
		[
			'./login.page.scss'
		]
})
export class LoginPage implements OnInit {
	email: string = '';
	password: string = '';
	public identity;
	constructor(private toastCtrl: ToastController, 
		public userService: UserService, private alertCtrl: AlertController, private router: Router, 
		private loadingCtrl: LoadingController, private navCtrl: NavController) {}

	ngOnInit() {}

	async DoLogin() {
		if (this.email === '' || this.password === '') {
			let toast = await this.toastCtrl.create({
				message: 'You need to complete all fields',
				duration: 2500,
				closeButtonText: 'Close',
				showCloseButton: true
			});
			await toast.present();
		} else {
			let user = {
				email: this.email,
				password: this.password
			};
			this.userService.DoLogin(user).subscribe(async res => {
				if (res.message) {
					let toast = await this.toastCtrl.create({
						message: res.message,
						duration: 2500,
						closeButtonText: 'Close',
						showCloseButton: true
					});
					await toast.present();
				} else if (res.token) {
					let toast = await this.toastCtrl.create({
						message: 'Successfully logged!',
						duration: 2500,
						closeButtonText: 'Close',
						showCloseButton: true
					});
					await toast.present().then(() => {
						localStorage.setItem('name', res.user.name);
						localStorage.setItem('userName', res.user.userName);
						localStorage.setItem('image', res.user.image);
						localStorage.setItem('token', res.token);
						this.identity = res.user;
						localStorage.setItem('identity', JSON.stringify(this.identity));
						this.Loader('Cargando...', 2500);
						this.router.navigate([
							'/home'
						]);
					});
				}
			});
		}
	}

	async Loader(message: string, duration: number) {
		const loading = await this.loadingCtrl.create({
			message: message,
			duration: duration
		});
		await loading.present();
	}

	Register() {
		this.router.navigate([
			'/register'
		]);
	}
}
