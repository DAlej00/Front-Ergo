import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuardService } from './guards/auth-guard.service';
import { FormsModule } from '@angular/forms';
import { SessionService } from './guards/session.service';
import { Dialogs } from '@ionic-native/dialogs/ngx';

import { Camera } from '@ionic-native/camera/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { ColorPickerModule } from 'ngx-color-picker';
import { CreateLabelComponent, EditLabelComponent, CreateTeamComponent, EditTeamComponent, CreateProjectComponent, EditProjectComponent, CreateTaskComponent, EditTaskComponent } from './modals/index';
import { EditUserComponent } from './modals/edit-user/edit-user.component';
import { CreateNoteComponent } from './modals/create-note/create-note.component';
import { EditNoteComponent } from './modals/edit-note/edit-note.component';
import { AddMemberComponent } from './modals/add-member/add-member.component';

@NgModule({
	declarations:
		[
			AppComponent,
			CreateLabelComponent,
			EditLabelComponent,
			CreateTeamComponent,
			EditTeamComponent,
			CreateProjectComponent,
			EditProjectComponent,
			EditUserComponent,
			CreateNoteComponent,
			EditNoteComponent,
			AddMemberComponent,
			CreateTaskComponent,
			EditTaskComponent
		],
	entryComponents:
		[
			CreateLabelComponent,
			EditLabelComponent,
			CreateTeamComponent,
			EditTeamComponent,
			CreateProjectComponent,
			EditProjectComponent,
			EditUserComponent,
			CreateNoteComponent,
			EditNoteComponent,
			AddMemberComponent,
			CreateTaskComponent,
			EditTaskComponent
		],
	imports:
		[
			BrowserModule,
			IonicModule.forRoot({
				mode: 'ios'
			}),
			AppRoutingModule,
			HttpClientModule,
			FormsModule,
			ColorPickerModule
		],
	providers:
		[
			AuthGuardService,
			SessionService,
			StatusBar,
			SplashScreen,
			Camera,
			FileTransfer,
			File,
			Dialogs,
			{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
		],
	bootstrap:
		[
			AppComponent
		]
})
export class AppModule {}
