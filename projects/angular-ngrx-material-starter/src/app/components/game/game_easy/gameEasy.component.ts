import { Component, Input, ChangeDetectorRef } from '@angular/core';

import { GameComponent }      from '../game.component';
import { GameService } from '../../../services/game.service';
import { Store, select } from '@ngrx/store';


import { map, take } from 'rxjs/operators';
import { App_N_Game_State } from '../../../gameMeta.state';
import { GameData } from '../game-item';

@Component({
  templateUrl: "./game_easy_template.html"
})
export class GameEasyComponent implements GameData {
  @Input() data: any;

  constructor(
    private gameService:GameService,
    private store:Store,
    private changeDetectorRef: ChangeDetectorRef
    ){
    }

  ngOnInit(): void {

}




}

