import browser from 'browser-detect';
import { Component, OnInit, ChangeDetectorRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import {  select,  Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { environment as env } from '../../environments/environment';

import { myData } from '../data/data';

import {
  ActionAuthLogin,
  ActionAuthLogout,
  routeAnimations,
  LocalStorageService,
  selectIsAuthenticated,
  selectSettingsStickyHeader,
  selectSettingsLanguage,
  selectEffectiveTheme,
  selectRouterState
} from '../core/core.module';
import {
  actionSettingsChangeAnimationsPageDisabled,
  actionSettingsChangeLanguage
} from '../core/settings/settings.actions';
import { DataService } from '../services/data.service';

import { ActionAuthloginAttemp } from '../core/auth/auth.actions';
import { MatBottomSheetRef, MatBottomSheet } from '@angular/material/bottom-sheet';

import { Router, NavigationEnd } from '@angular/router';
import { Link,Node, D3Service } from '../d3';

import { take, tap } from 'rxjs/operators';

import { ActionBottom_sheetUpsert } from '../bottom_sheet_state/bottom_sheet_state.actions';
import { selectIsBS_opened } from '../bottom_sheet_state/bottom_sheet_state.selectors';

import { GameService } from '../services/game.service';
import { isPlatformBrowser } from '@angular/common';
import { MatGridList } from '@angular/material/grid-list';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
// declare google analytics
declare const ga: any;

@Component({
  selector: 'anms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations]
})
export class AppComponent implements OnInit {

  isProd = env.production;
  envName = env.envName;
  version = env.versions.app;
  year = new Date().getFullYear();
  logo = require('../../assets/logo.png');
  languages = ['en', 'fr'];
  navigation = [
    { link: 'about', label: 'anms.menu.about' },
    { link: 'feature-list', label: 'anms.menu.features' }
  ];
  navigationSideMenu = [
    ...this.navigation,
    { link: 'settings', label: 'anms.menu.settings' }
  ];

  isAuthenticated$: Observable<boolean>;
  stickyHeader$: Observable<boolean>;
  language$: Observable<string>;
  theme$: Observable<string>;
  myGames:any
  subscription: Subscription;
  the_key: string;
  is_named$: Observable<boolean>;
  is_bottom_sheet_opened : Observable<Boolean>
  myturn$: Observable<Boolean>;

  constructor(

    @Inject(PLATFORM_ID) private platformId: Object,
    private router:Router,
    private changeDetectorRef: ChangeDetectorRef,
    private store: Store,
    private storageService: LocalStorageService,
    private dataS:DataService,
    public _bottomSheet: MatBottomSheet,
    private d3service:D3Service,
    private gameService:GameService,
    private dataService:DataService
    ) {
      console.log("App constructor!!")

      this.is_named$ = this.dataService.is_name$
      this.subscription = null

      this.store.pipe(select(selectRouterState)).subscribe(()=>{
        this.store.dispatch(new ActionBottom_sheetUpsert({value:false}))
        this._bottomSheet.dismiss()
      })
      this.is_bottom_sheet_opened =  this.store.pipe(select(selectIsBS_opened),tap((data)=>{this.changeDetectorRef.markForCheck()}))


   }


  private static isIEorEdgeOrSafari() {
    return ['ie', 'edge', 'safari'].includes(browser().name);
  }

  ngOnInit(): void {

    this.storageService.testLocalStorage();
    if (AppComponent.isIEorEdgeOrSafari()) {
      this.store.dispatch(
        actionSettingsChangeAnimationsPageDisabled({
          pageAnimationsDisabled: true
        })
      );
    }


    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
    this.stickyHeader$ = this.store.pipe(select(selectSettingsStickyHeader));
    this.language$ = this.store.pipe(select(selectSettingsLanguage));
    this.theme$ = this.store.pipe(select(selectEffectiveTheme));



  }

  ngAfterViewInit(): void {
    this.router.events.subscribe(event => {
      // I check for isPlatformBrowser here because I'm using Angular Universal, you may not need it

    });

  }
  onLoginClick() {
    this.store.dispatch(new ActionAuthloginAttemp);
  }

  onLogoutClick() {
    this.store.dispatch(new ActionAuthLogout);
  }

  onLanguageSelect({ value: language }) {
    this.store.dispatch(actionSettingsChangeLanguage({ language }));
  }


  openBottomSheet(): void {
    this.store.dispatch(new ActionBottom_sheetUpsert({value:true}))
    this._bottomSheet.open(BottomSheetComponent);
  }

  closeBottomSheet(): void {
    this.store.dispatch(new ActionBottom_sheetUpsert({value:false}))
    this._bottomSheet.dismiss();
  }


}


@Component({
  selector: 'bottom-sheet',
  templateUrl: 'bottom-sheet.html',
})
export class BottomSheetComponent {
  the_name: string;
  the_key: string;
  the_key_join: string;
  the_id: any;
  desc: any;
  is_named$:Observable<Boolean>


  constructor(
    private router:Router,
    private store:Store,
    private changeDetectorRef: ChangeDetectorRef,
    private _bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>,
    private dataS:DataService) {

    }


  close(): void {
    this.store.dispatch(new ActionBottom_sheetUpsert({value:false}))
    this._bottomSheetRef.dismiss();
  }

  /*
  nameChange = ()=>{
    this.store.dispatch(new ActionNameUpsert({name:String(this.the_name)}))
    this.router.navigate(["feature-list"])
    this.changeDetectorRef.markForCheck()
  }
  */
}
