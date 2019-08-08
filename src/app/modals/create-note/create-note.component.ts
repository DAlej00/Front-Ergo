import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/note.service';
import { UserService } from 'src/app/services/user.service';
import { ToastController, ModalController } from '@ionic/angular';
import { Notes } from 'src/app/models/notes.model';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss'],
  providers:[
    NoteService,
    UserService
  ]
})
export class CreateNoteComponent implements OnInit {
  public notes: Notes;
  public token;

  constructor(private toastCtrl: ToastController, private modalCtrl: ModalController, private _userService: UserService, private _notesService: NoteService) { 
    this.token = this._userService.getToken();
    this.notes = new Notes('','','','');
  }
    
  ngOnInit() {}

  async create(){
    if(this.notes.content != '' && this.notes.title !=''){
      this._notesService.createNotes(this.notes, this.token).subscribe(async res =>{
        if(res.note){
          let toast = await this.toastCtrl.create({
            message: 'Note creado exitosamente',
            duration: 2500,
            closeButtonText: 'Cerrar',
            showCloseButton: true
          });
          await toast.present().then(()=>{
            this.modalCtrl.dismiss({C: 1});
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
    }else{
      let toast = await this.toastCtrl.create({
        message: 'Necesita llenar todos los campos',
        duration: 2500,
        closeButtonText: 'Cerrar',
        showCloseButton: true
      });
      await toast.present();
    }
  }
  async cancel(){
    this.modalCtrl.dismiss();
  }

}
