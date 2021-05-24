import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { FormGroup } from '@angular/forms';

// Auth
import { Hub, Logger } from 'aws-amplify';

// Service Workers
import { ServiceWorker } from 'aws-amplify';
import { SwUpdate } from '@angular/service-worker';
const serviceWorker = new ServiceWorker();

const logger = new Logger('cove-Logger');
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private swUpdate: SwUpdate  ) {
    this.initializeApp();
  }

  async ngOnInit(){
    // Check for updates
    if (this.swUpdate.available) {
      this.swUpdate.available.subscribe(() => {
        if (confirm('A new version is available. Load it?'))
          window.location.reload();
      });
    }

    const listener = async (data) => {
      switch (data.payload.event) {
          case 'signIn':
              logger.info('user signed in');
              break;
          case 'signUp':
              logger.info('user signed up');
              break;
          case 'signOut':
              logger.info('user signed out');
              break;
          case 'signIn_failure':
              logger.error('user sign in failed');
              break;
          case 'tokenRefresh':
              logger.info('token refresh succeeded');
              break;
          case 'tokenRefresh_failure':
              logger.error('token refresh failed');
              break;
          case 'configured':
              logger.info('the Auth module is configured');
      }
    }

    Hub.listen('auth', listener);
  }

  async handleSignIn(){
    
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // Register Service workers
      await serviceWorker.register();
    });
  }
}
