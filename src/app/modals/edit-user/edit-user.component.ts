import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { NavParams, ToastController, ModalController } from '@ionic/angular';
import { UploadService } from 'src/app/services/upload.service';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-edit-user',
	templateUrl: './edit-user.component.html',
	styleUrls:
		[
			'./edit-user.component.scss'
		],
	providers:
		[
			UserService
		]
})
export class EditUserComponent implements OnInit {
	public token;
	public identity;
	public user: User;
	public url;

	constructor(private navParams: NavParams, private toastCtrl: ToastController, private modalCtrl: ModalController, private _userService: UserService, private _uploadService: UploadService) {
		this.user = this.navParams.get('user');
		this.token = this._userService.getToken();
		this.url = environment.endpoint;
		this.identity = this._userService.getIdentity();
	}

	ngOnInit() {}

	async update() {
		if (this.user.name == '' || this.user.username == '') {
			let toast = await this.toastCtrl.create({
				message: 'Necesita llenar todos los campos',
				duration: 2500,
				closeButtonText: 'Cerrar',
				showCloseButton: true
			});
			await toast.present();
		} else {
			this._userService.editUser(this.user, this.token).subscribe(async res => {
				if (res.user) {
					if (this.change) {
						this._uploadService.makeFileRequest(this.url + 'users/subirImagen', [], this.filesToUpload, this.token, 'image').then((result: any) => {
							console.log(result);
							this.user.image = result.user.image;
							this.change = false;
						});
					}
					let toast = await this.toastCtrl.create({
						message: 'Perfil editado exitosamente',
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

	public filesToUpload: Array<File>;
	public change: boolean = false;
	fileChangeEvent(fileInput: any) {
		this.filesToUpload = <Array<File>>fileInput.target.files;
		this.change = true;
		console.log(this.filesToUpload);
	}

	cancel() {
		this.modalCtrl.dismiss();
	}
}
