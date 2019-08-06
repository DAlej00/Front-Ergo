import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { ToastController, ModalController, LoadingController } from '@ionic/angular';
import { EditUserComponent } from '../modals/edit-user/edit-user.component';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  providers:[
    UserService
  ],
})
export class ProfilePage implements OnInit {
  name:string = "";
  image:string = "";
  public user: User[];
  public token;
  public identity;
  public url;

  username:string = "";
  constructor(private toastCtrl: ToastController, private modalCtrl: ModalController, 
    private loadingCtrl: LoadingController, private router :Router,
    private actionSheetCtrl: ActionSheetController, private _userService:UserService,
    private alertCtrl: AlertController) { 
    this.image = localStorage.getItem('image');
    this.name = localStorage.getItem('name');
    this.username = localStorage.getItem('username');
    this.token = _userService.getToken();
    this.identity = _userService.getIdentity();
    this.url = environment.endpoint;
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    this._userService.getRegistre(this.token).subscribe(async res =>{
      if(res.user){
        this.identity = res.user;
        console.log(this.identity);
      }else{
        let toast = await this.toastCtrl.create({
          message:res.message,
          duration:2500,
          closeButtonText:'Close',
          showCloseButton:true
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

  async editUser(identity){
    let modal = await this.modalCtrl.create({
      component: EditUserComponent,
      componentProps:{
        user:identity
      }
    });
    await modal.present();
		const data = await modal.onDidDismiss();
		if (data.data !== undefined) this.getUsers();
  }

  async deleteUser(id){
    this._userService.deleteUser(id,this.token).subscribe(
      async res=>{
        if(res.message){
          let toast = await this.toastCtrl.create({
            message: res.message,
            duration: 2500,
            closeButtonText: 'Cerrar',
            showCloseButton: true
          });
          this.Loader('Cargando...', 1500);
          await toast.present().then(() => {
            this.getUsers();
          });
        }
      },
    )
  }

  async confirmDelete(id) {
		const alert = await this.alertCtrl.create({
			header: 'Eliminar etiqueta',
			message: '¿Está seguro de eliminar la etiqueta?',
			buttons:
				[
					{
						text: 'Cancelar',
						role: 'cancel',
						cssClass: 'secondary',
					},
					{
						text: 'Si',
						handler:
							() => {
                this.deleteUser(id);
                this.logOut();
							}
					}
				]
		});
		await alert.present();
  }
  
  async Loader(message: string, duration: number) {
		const loading = await this.loadingCtrl.create({
			message: message,
			duration: duration
		});
		await loading.present();
	}
  async Options(){
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Photo Options',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Upload new',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Take photo',
        icon: 'camera',
        handler: () => {
          console.log('Play clicked');
        }
      }, 
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}
