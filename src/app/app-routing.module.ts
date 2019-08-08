import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard.service';
import { SessionService } from './guards/session.service';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full'
	},
	{
		path: 'home',
		loadChildren: './home/home.module#HomePageModule',
		canActivate:
			[
				AuthGuardService
			]
	},
	{
		path: 'list',
		loadChildren: './list/list.module#ListPageModule'
	},
	{
		path: 'login',
		loadChildren: './login/login.module#LoginPageModule',
		canActivate:
			[
				SessionService
			]
	},
	{ path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
	{
		path: 'teams',
		loadChildren: './teams/teams.module#TeamsPageModule',
		canActivate:
			[
				AuthGuardService
			]
	},
	{
		path: 'projects',
		loadChildren: './projects/projects.module#ProjectsPageModule',
		canActivate:
			[
				AuthGuardService
			]
	},
	{
		path: 'profile',
		loadChildren: './profile/profile.module#ProfilePageModule',
		canActivate:
			[
				AuthGuardService
			]
	},
	{
		path: 'label',
		loadChildren: './label/label.module#LabelPageModule',
		canActivate:
			[
				AuthGuardService
			]
	},
  { path: 'notes', 
  loadChildren: './notes/notes.module#NotesPageModule',
	canActivate:[
		AuthGuardService
	]
	}

];

@NgModule({
	imports:
		[
			RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
		],
	exports:
		[
			RouterModule
		]
})
export class AppRoutingModule {}
