const packageJson = require('../../../../package.json');

export const environment = {
  appName: 'Covid-19 Battle',
  envName: 'PROD',
  production: true,
  test: false,
  i18nPrefix: '',
  firebaseConfig: {
    apiKey: "AIzaSyAeNAI3CvR-xF76LcCd3OECEceI_rDrKEI",
    authDomain: "covid-battle.firebaseapp.com",
    databaseURL: "https://covid-battle.firebaseio.com",
    projectId: "covid-battle",
    storageBucket: "covid-battle.appspot.com",
    messagingSenderId: "207191050343",
    appId: "1:207191050343:web:6a3c62f59fb3f51df4ecc2",
    measurementId: "G-TLHVTWDY3B"
  },
  versions: {
    app: packageJson.version,
    angular: packageJson.dependencies['@angular/core'],
    ngrx: packageJson.dependencies['@ngrx/store'],
    material: packageJson.dependencies['@angular/material'],
    bootstrap: packageJson.dependencies.bootstrap,
    rxjs: packageJson.dependencies.rxjs,
    ngxtranslate: packageJson.dependencies['@ngx-translate/core'],
    fontAwesome:
      packageJson.dependencies['@fortawesome/fontawesome-free-webfonts'],
    angularCli: packageJson.devDependencies['@angular/cli'],
    typescript: packageJson.devDependencies['typescript'],
    cypress: packageJson.devDependencies['cypress']
  }
};
