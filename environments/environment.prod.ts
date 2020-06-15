const packageJson = require('../../package.json');

export const environment = {
  appName: 'Angular Ngrx Material Starter',
  envName: 'PROD',
  production: true,
  test: false,
  i18nPrefix: '',
  firebaseConfig: {
    apiKey: "AIzaSyAkO5-zP0xJpMCT3WtA0724ZdBDcL4HxxY",
    authDomain: "price-game-17653.firebaseapp.com",
    databaseURL: "https://price-game-17653.firebaseio.com",
    projectId: "price-game-17653",
    storageBucket: "price-game-17653.appspot.com",
    messagingSenderId: "722034533972",
    appId: "1:722034533972:web:f5ce9b4634286a1859afc1",
    measurementId: "G-Y2KQBM6EF7"
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
