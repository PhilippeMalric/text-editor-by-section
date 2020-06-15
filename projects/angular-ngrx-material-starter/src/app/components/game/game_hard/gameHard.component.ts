import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef }  from '@angular/core';

import { GameComponent }       from '../game.component';
import {  BehaviorSubject, Observable, merge } from 'rxjs';
import { GameService } from '../../../services/game.service';
import { GameData } from '../game-item';
import { App_N_Game_State } from '../../../gameMeta.state';
import { Store, select } from '@ngrx/store';
import { map, withLatestFrom, tap } from 'rxjs/operators';

@Component({
  templateUrl: './game_hard.html',
  styleUrls: ['./game_hard.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameHardComponent implements GameData {
  @Input() data: any;
  heure$: BehaviorSubject<String>
  myturn$: Observable<Boolean>;
  max_score: any;
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private store: Store<App_N_Game_State>,
    private gameService:GameService){

  }
}


