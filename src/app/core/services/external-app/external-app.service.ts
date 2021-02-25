import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';
const { Device } = Plugins;
const { inAppBrowser } = Plugins;
const { appAvailability } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class ExternalAppService {

  deviceInfo;

  constructor(
    private launchNav: LaunchNavigator
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

    appAvailability.canOpenUrl(app).then(
      () => { // success callback
        inAppBrowser.open(appUrl + credentials, '_system');
      },
      () => { // error callback
        inAppBrowser.open(httpUrl + credentials, '_system');
      }
    );
  }
}
