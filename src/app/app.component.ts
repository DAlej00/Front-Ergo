import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html'
})
export class AppComponent {
	public appPages = [
		{
			title: 'Your profile',
			url: '/profile',
			icon: 'contact'
		},
		{
			title: 'Home',
			url: '/home',
			icon: 'home'
		},
		{
			title: 'Teams',
			url: '/teams',
			icon: 'contacts'
		},
		{
			title: 'Projects',
			url: '/projects',
			icon: 'analytics'
		},
		{
			title: 'Labels',
			url: '/label',
			icon: 'bookmark'
		},
		{
			title: 'Notes',
			url: '/notes',
			icon: 'today'
		}
	];

	constructor(private platform: Platform, private splashScreen: SplashScreen, private statusBar: StatusBar, private router: Router) {
		this.initializeApp();
	}

	Profile() {
		this.router.navigate([
			'/profile'
		]);
	}

	initializeApp() {
		this.platform.ready().then(() => {
			this.statusBar.styleDefault();
			this.splashScreen.hide();
		});
	}
}
