import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';

import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/core.module';
import { Store } from '@ngrx/store';
import { DataService } from '../../../services/data.service';

import { Observable } from 'rxjs';

import { GameService } from '../../../services/game.service';
import { Router } from '@angular/router';
import { MatGridList } from '@angular/material/grid-list';
import { MediaObserver, MediaChange } from '@angular/flex-layout';

@Component({
  selector: 'anms-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  releaseButler = require('../../../../assets/release-butler.png');
  the_key = ""
  the_id = ""
  desc = ""
  games:string[] = ["1","2","3"]

  @ViewChild('grid') grid: MatGridList;

  gridByBreakpoint = {
    xl: 3,
    lg: 3,
    md: 3,
    sm: 3,
    xs: 1
  }


  constructor(
    private observableMedia: MediaObserver,
        private router:Router,
        private gameService: GameService,
        private changeDetectorRef: ChangeDetectorRef,
        private store: Store,
        private dataS:DataService
    ) {

    }

  ngOnInit() {}

  ngAfterContentInit() {
    this.observableMedia.asObservable().subscribe((change) => {
      console.log("change")
      //console.log(change)
      if(this.grid){
        this.grid.cols = this.gridByBreakpoint[change[0].mqAlias];
      }
      this.changeDetectorRef.markForCheck()
    });
  }

  changeGraph = (id)=>{
    this.gameService.changeGraph(id)
    this.router.navigate(["feature-list"])
  }

add_one = ()=>
{
  this.dataS.add_one_game(this.the_key,this.the_id,this.desc)
}




}
