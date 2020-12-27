const packageJson = require('../../../../package.json');

export const environment = {
  appName: 'Editeur de text par sections',
  envName: 'TEST',
  production: false,
  test: true,
  i18nPrefix: '',
  firebaseConfig: {
    apiKey: 'AIzaSyA3GnJ_6h6bdhobeOYIfW5_G_LbyZCPbtg',
    authDomain: 'text-editor-by-section.firebaseapp.com',
    databaseURL: 'https://text-editor-by-section.firebaseio.com',
    projectId: 'text-editor-by-section',
    storageBucket: 'text-editor-by-section.appspot.com',
    messagingSenderId: '376881216693',
    appId: '1:376881216693:web:b8fa933b6d3444078e12fc',
    measurementId: 'G-C5X2SPF1LN'
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
