import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { CoreModule, HttpLoaderFactory } from './core/core.module';

import { AppRoutingModule } from './app-routing.module';
import {
  AppComponent,
  BottomSheetComponent,
  DialogInfo
} from './app/app.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DataService } from './services/data.service';
import { EffectsModule } from '@ngrx/effects';

import { StoreModule } from '@ngrx/store';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { FEATURE_NAME, reducers } from './gameMeta.state';
import { HttpClient } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { MatDialogModule } from '@angular/material/dialog';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBars,
  faUserCircle,
  faPowerOff,
  faCog,
  faPlayCircle,
  faRocket,
  faPlus,
  faEdit,
  faTrash,
  faTimes,
  faCaretUp,
  faCaretDown,
  faExclamationTriangle,
  faFilter,
  faTasks,
  faCheck,
  faSquare,
  faLanguage,
  faPaintBrush,
  faLightbulb,
  faWindowMaximize,
  faStream,
  faBook
} from '@fortawesome/free-solid-svg-icons';
import {
  faGithub,
  faMediumM,
  faTwitter,
  faInstagram,
  faYoutube
} from '@fortawesome/free-brands-svg-icons';

library.add(
  faBars,
  faUserCircle,
  faPowerOff,
  faCog,
  faRocket,
  faPlayCircle,
  faGithub,
  faMediumM,
  faTwitter,
  faInstagram,
  faYoutube,
  faPlus,
  faEdit,
  faTrash,
  faTimes,
  faCaretUp,
  faCaretDown,
  faExclamationTriangle,
  faFilter,
  faTasks,
  faCheck,
  faSquare,
  faLanguage,
  faPaintBrush,
  faLightbulb,
  faWindowMaximize,
  faStream,
  faBook
);

import { RtlSupportDirective } from './shared/rtl-support/rtl-support.directive';
import { GoogleAuthService } from './core/auth/google-auth.service';
import { SettingsContainerComponent } from './components/settings/settings/settings-container.component';

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, SETTINGS } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {
  MatBottomSheetModule,
  MAT_BOTTOM_SHEET_DEFAULT_OPTIONS
} from '@angular/material/bottom-sheet';

import { GameService } from './services/game.service';
import { D3_DIRECTIVES, D3Service } from './d3';
import { SHARED_VISUALS } from './visuals/shared';
import { GraphComponent } from './visuals/graph/graph.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MyTable } from './components/table/table.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './components/admin/admin.component';
import {
  DialogCommentaireSection,
  PropositionsComponent
} from './components/propositions/propositions.component';

import {
  HammerGestureConfig,
  HAMMER_GESTURE_CONFIG
} from '@angular/platform-browser';
import { HammerModule } from '@angular/platform-browser';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { ExpressionComponent } from './components/expression/expression.component';
import { VersionOriginaleComponent } from './components/version_originale/version_originale.component';
import { Edit_text_by_sectionsComponent } from './components/edit_text_by_sections/edit_text_by_sections.component';
import {
  DialogPropositionVote,
  UpvoteButtonComponent
} from './components/upvote-button/upvote-button.component';
import { UpvoteService } from './services/upvote.service';
import { MatBadgeModule } from '@angular/material/badge';

export class MyHammerConfig extends HammerGestureConfig {}

@NgModule({
  imports: [
    MatDialogModule,
    MatBadgeModule,
    DragDropModule,
    HammerModule,
    HttpClientModule,
    FlexLayoutModule,
    MatGridListModule,
    AngularFirestoreModule,
    MatBottomSheetModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MatPaginatorModule,
    CommonModule,
    FormsModule,
    TranslateModule,
    MatTableModule,
    MatButtonModule,
    MatToolbarModule,
    MatSelectModule,
    MatTabsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatCardModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatListModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatDividerModule,
    FontAwesomeModule,
    // angular
    BrowserAnimationsModule,
    BrowserModule,

    // core
    CoreModule,

    // app
    AppRoutingModule,
    EffectsModule.forFeature([]),
    StoreModule.forFeature(FEATURE_NAME, reducers),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: true
    })
  ],
  declarations: [
    MyTable,
    GraphComponent,
    ...SHARED_VISUALS,
    ...D3_DIRECTIVES,
    AppComponent,
    RtlSupportDirective,

    SettingsContainerComponent,
    BottomSheetComponent,

    AdminComponent,
    PropositionsComponent,
    VersionOriginaleComponent,
    Edit_text_by_sectionsComponent,

    ExpressionComponent,

    UpvoteButtonComponent,
    DialogPropositionVote,
    DialogCommentaireSection,
    DialogInfo
  ],
  entryComponents: [
    DialogCommentaireSection,
    DialogPropositionVote,
    DialogInfo
  ],
  providers: [
    UpvoteService,
    GameService,
    DataService,
    GoogleAuthService,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
    },
    { provide: SETTINGS, useValue: {} },
    {
      provide: MAT_BOTTOM_SHEET_DEFAULT_OPTIONS,
      useValue: { hasBackdrop: false }
    },
    D3Service
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
