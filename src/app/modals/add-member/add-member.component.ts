import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { TeamService } from 'src/app/services/team.service';
import { Team } from 'src/app/models/team.model';
import { ToastController, ModalController, NavParams } from '@ionic/angular';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss'],
  providers: [UserService, TeamService]
})
export class AddMemberComponent implements OnInit {
  public idUser: string;
  public idSupervisor: string;
  public team: Team;
  public token;
  public users: User[];

  constructor(
    private navParams: NavParams,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
    private _userService: UserService,
    private _teamService: TeamService
  ) {
    this.team = this.navParams.get('team');
    this.token = this._userService.getToken();
  }

  ngOnInit() { }

  async add() {
    if (this.idUser == null || '' && this.idSupervisor == null || '') {
      let toast = await this.toastCtrl.create({
        message: 'Necesita llenar todos los campos',
        duration: 2500,
        closeButtonText: 'Cerrar',
        showCloseButton: true
      });
      await toast.present();
    } else {
      this._teamService.addMember(this.token, this.team, this.idUser, this.idSupervisor).subscribe(async res => {
        if (res.team) {
          let toast = await this.toastCtrl.create({
            message: 'Integrante agregado exitosamente',
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

  async getUsers() {
    // this._userService.getUsers().subscribe(
    // 	response => {
    // 		if (response.users) {
    // 			this.users = response.users;
    // 			this.users.sort();
    // 			console.log(this.users);
    // 		}
    // 	},
    // 	error => {
    // 		let errorMessage = <any>error;
    // 		console.log(errorMessage);
    // 		if (errorMessage != null) {
    // 			this.status = 'error';
    // 		}
    // 	}
    // );
  }

  async close() {
    this.modalCtrl.dismiss();
  }
  
  cancel() {
    this.idUser = null;
    this.idSupervisor = null;
  }
}
