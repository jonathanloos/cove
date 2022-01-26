import { Injectable } from '@angular/core';
import { Device } from '@capacitor/device';
import { Browser } from '@capacitor/browser';
import { AppAvailability } from '@ionic-native/app-availability/ngx';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';

@Injectable({
  providedIn: 'root'
})
export class ExternalAppService {

  deviceInfo;

  constructor(
    private launchNav: LaunchNavigator,
    private appAvailability: AppAvailability
  ) { 
    this.deviceInfo = Device.getInfo();
  }

  launchSpotify(playlistId: string){
    this.launchExternalApp('spotify://', 'com.spotify.android', 'spotify://playlist/', 'https://open.spotify.com/playlist/', playlistId);
  }

  launchMaps(address: any){
    let options: LaunchNavigatorOptions = {
      start: '200 University Ave. W, Waterloo, ON',
      destinationName: "address",
      app: this.launchNav.APP.GOOGLE_MAPS
    }

    this.launchNav.navigate(address.street + ',' + address.city, options)
      .then(
        success => console.log('Launched navigator'),
        error => console.log('Error launching navigator', error)
      );
  }

  launchExternalApp(iosSchemaName: string, androidPackageName: string, appUrl: string, httpUrl: string, credentials: string){
    let app: string;

    if (this.deviceInfo.platform === 'iOS') {
      app = iosSchemaName;
    } else if (this.deviceInfo.platform === 'Android') {
      app = androidPackageName;
    } else {
      window.open(httpUrl + credentials, '_system');
      return;
    }

    this.appAvailability.check(app).then(
      () => { // success callback
        Browser.open({url: appUrl + credentials});
      },
      () => { // error callback
        Browser.open({url: httpUrl + credentials});
      }
    );
  }
}
