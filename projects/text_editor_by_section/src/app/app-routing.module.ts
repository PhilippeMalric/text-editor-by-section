import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { SettingsContainerComponent } from './components/settings/settings/settings-container.component';

import { AdminComponent } from './components/admin/admin.component';
import { VersionOriginaleComponent } from './components/version_originale/version_originale.component';
import { PropositionsComponent } from './components/propositions/propositions.component';
import { Edit_text_by_sectionsComponent } from './components/edit_text_by_sections/edit_text_by_sections.component';
import { AuthGuardService } from './core/core.module';
import { NameGuardService } from './core/auth/auth-guard.service';
import { ExplicationsComponent } from './components/explications/explications.component';
import { RemerciementComponent } from './components/remerciement/remerciement.component';
import { MessageInterPhaseComponent } from './components/message-inter-phase/message-inter-phase.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'message',
    pathMatch: 'full'
  },
  {
    path: 'message',
    component: MessageInterPhaseComponent
  },
  {
    path: 'remerciement',
    component: RemerciementComponent
  },
  {
    path: 'mode_d_emploi',
    component: ExplicationsComponent
  },
  {
    path: 'settings',
    component: SettingsContainerComponent
  },
  {
    //canActivate: [AuthGuardService],
    path: 'admin',
    component: AdminComponent,
    
  },
  /*
  {
    path: 'Projet_de_loi',
    component: PropositionsComponent,
    canActivate: [NameGuardService]
  },
  */
  {
    path: 'edit_text_by_section',
    component: Edit_text_by_sectionsComponent
  },

  {
    path: '**',
    redirectTo: 'message'
  }
];

@NgModule({
  // useHash supports github.io demo page, remove in your app
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: 'enabled',
      enableTracing: true,
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
