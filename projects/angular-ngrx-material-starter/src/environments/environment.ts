// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

const packageJson = require('../../../../package.json');

export const environment = {
  appName: 'Covid-19 Battle',
  envName: 'DEV',
  production: false,
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
    fontAwesome: packageJson.dependencies['@fortawesome/fontawesome-free'],
    angularCli: packageJson.devDependencies['@angular/cli'],
    typescript: packageJson.devDependencies['typescript'],
    cypress: packageJson.devDependencies['cypress']
  }
};
