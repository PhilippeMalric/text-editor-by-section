import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AboutComponent } from './features/about/about/about.component';
import { SettingsContainerComponent } from './features/settings/settings/settings-container.component';
import { FeatureListComponent } from './features/feature-list/feature-list/feature-list.component';



const routes: Routes = [
  {
    path: '',
    redirectTo: 'about',
    pathMatch: 'full'
  },
  {
    path: 'about',
    component:AboutComponent
  },
  {
    path: 'feature-list',
    component: FeatureListComponent
  },
  {
    path: 'settings',
    component:SettingsContainerComponent

  },
  {
    path: '**',
    redirectTo: 'about'
  }
];

@NgModule({
  // useHash supports github.io demo page, remove in your app
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: 'enabled',
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
