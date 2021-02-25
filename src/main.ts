import 'hammerjs';
import 'reflect-metadata';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// AWS Amplify
import Amplify from "aws-amplify";
import aws_exports from "./aws-exports";
Amplify.configure(aws_exports);
// import { Analytics } from 'aws-amplify';

// // Analytics
// const analyticsConfig = {
//   AWSPinpoint: {
//         // Amazon Pinpoint App Client ID
//         appId: 'fcb6325a2cd24eb2bba113ca210db00d',
//         // Amazon service region
//         region: 'ca-central-1',
//         mandatorySignIn: false,
//   }
// }

// Analytics.configure(analyticsConfig);

// Analytics.autoTrack('session', {
//   enable: true,
//   provider: 'AWSPinpoint'
// });

// Analytics.autoTrack('pageView', {
//   enable: true,
//   eventName: 'pageView',
//   type: 'SPA',
//   provider: 'AWSPinpoint',
//   getUrl: () => {
//       return window.location.origin + window.location.pathname;
//   }
// });

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));