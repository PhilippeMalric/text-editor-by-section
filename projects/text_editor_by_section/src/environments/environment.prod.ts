const packageJson = require('../../../../package.json');

export const environment = {
  appName: 'Editeur de text par sections',
  envName: 'PROD',
  production: true,
  test: false,
  i18nPrefix: '',
  firebaseConfig: {
    apiKey: "AIzaSyCVlnQHcOIxolrHSS1d3MCGvnxvhksnXAA",
    authDomain: "projet-de-loi-accq.firebaseapp.com",
    databaseURL: "https://projet-de-loi-accq.firebaseio.com",
    projectId: "projet-de-loi-accq",
    storageBucket: "projet-de-loi-accq.appspot.com",
    messagingSenderId: "1072563244873",
    appId: "1:1072563244873:web:2b83f2f5e7d004f9605498",
    measurementId: "G-L5ZFGVJBP8"
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
