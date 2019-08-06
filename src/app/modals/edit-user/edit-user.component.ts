import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { NavParams, ToastController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
  providers:[
    UserService
  ]
})
export class EditUserComponent implements OnInit {
  public token;
  public user:User;
  
  constructor(private navParams: NavParams, private toastCtrl: ToastController, private modalCtrl: ModalController, private _userService: UserService) {
		this.user = this.navParams.get('user');
		this.token = this._userService.getToken();
	}

  ngOnInit() {}

  async update() {
		if (this.user.name == '' || this.user.userName == '') {
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

	cancel() {
		this.modalCtrl.dismiss();
	}
}
