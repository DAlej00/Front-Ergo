import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { NoteService } from '../services/note.service';
import { Notes } from '../models/notes.model';
import { ToastController, ModalController, LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CreateNoteComponent } from '../modals/create-note/create-note.component';
import { EditNoteComponent } from '../modals/edit-note/edit-note.component';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
  providers: [
    UserService,
    NoteService
  ]
})
export class NotesPage implements OnInit {
  public token;
  public notes: Notes[];
  constructor(private toastCtrl: ToastController, private modatCtrl: ModalController, private loadingCtrl: LoadingController, private alertCtrl: AlertController, private router: Router, private _userService: UserService, private _notesService: NoteService) {
    this.token = _userService.getToken();
  }

  ngOnInit() {
    this.getNotes();
  }

  getNotes() {
    this._notesService.getNotes(this.token).subscribe(async res => {
      if (res.notes) {
        this.notes = res.notes;
        console.log(this.notes);
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

  async createNote() {
    const modal = await this.modatCtrl.create({
      component: CreateNoteComponent
    });
    await modal.present();
    const data = await modal.onDidDismiss();
    if (data.data !== undefined) this.getNotes();
  }

  async editNote(notes) {
    let modal = await this.modatCtrl.create({
      component: EditNoteComponent,
      componentProps: {
        notes: notes
      }
    });
    await modal.present();
    const data = await modal.onDidDismiss();
    if (data.data !== undefined) this.getNotes();
  }

  async deleteNote(id) {
    this._notesService.deleteNotes(id, this.token).subscribe(async res => {
      if (res.message) {
        let toast = await this.toastCtrl.create({
          message: res.message,
          duration: 2500,
          closeButtonText: 'Cerrar',
          showCloseButton: true
        });
        this.Loader('Cargando...', 1500);
        await toast.present().then(() => {
          this.getNotes();
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
            text: 'si',
            handler:
              () => {
                this.deleteNote(id);
              }
          }
        ]
    });
    await alert.present();
  }
  doRefresh(e) {
    this.getNotes();
    setTimeout(() => {
      e.target.complete();
    }, 2500);
  }
}
