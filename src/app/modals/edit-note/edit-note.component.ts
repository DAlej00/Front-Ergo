import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { NoteService } from 'src/app/services/note.service';
import { Notes } from 'src/app/models/notes.model';
import { NavParams, ToastController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss'],
  providers:[
    UserService,
    NoteService
  ]
})
export class EditNoteComponent implements OnInit {
  public token;
  public notes: Notes;

  constructor(private navParams: NavParams, private toastCtrl: ToastController, private modalCtrl: ModalController, private _notesService: NoteService, private _userService: UserService, private router : Router) { 
    this.notes = this.navParams.get('notes');
    this.token = this._userService.getToken();
  }

  ngOnInit() {}

  async update(){
    if(this.notes.title == '' || this.notes.content == ''){
      let toast = await this.toastCtrl.create({
        message: 'Necesita llenar todos los campos',
        duration: 2500,
        closeButtonText: 'Cerrar',
        showCloseButton: true
      });
      await toast.present();
    }else{
      this._notesService.editNotes(this.notes, this.token).subscribe(async res =>{
        if(res.note){
          let toast = await this.toastCtrl.create({
            message: 'Nota editada exitosamente',
            duration: 2500,
            closeButtonText: 'Cerrar',
            showCloseButton: true
          });
          await toast.present().then(()=>{
            this.modalCtrl.dismiss({E:1});
          });
        }else{
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

  cancel(){
    this.modalCtrl.dismiss();
  }
}
