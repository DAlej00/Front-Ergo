import { LabelService } from './../../services/label.service';
import { Label } from './../../models/label.model';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ToastController, ModalController } from '@ionic/angular';

@Component({
	selector: 'app-create-label',
	templateUrl: './create-label.component.html',
	styleUrls:
		[
			'./create-label.component.scss'
		],
	providers:
		[
			UserService,
			LabelService
		]
})
export class CreateLabelComponent implements OnInit {
	public label: Label;
	public token;

	constructor(private toastCtrl: ToastController, private modalCtrl: ModalController, private _userService: UserService, private _labelService: LabelService) {
		this.token = this._userService.getToken();
		this.label = new Label('', '', '','');
	}

	ngOnInit() {}

	async create() {
		if (this.label.color != '' && this.label.name != '') {
			this._labelService.createLabel(this.label, this.token).subscribe(async res => {
				if (res.label) {
					let toast = await this.toastCtrl.create({
						message: 'Label creado exitosamente',
						duration: 2500,
						closeButtonText: 'Cerrar',
						showCloseButton: true
					});
					await toast.present().then(() => {
						this.modalCtrl.dismiss({C: 1});
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
