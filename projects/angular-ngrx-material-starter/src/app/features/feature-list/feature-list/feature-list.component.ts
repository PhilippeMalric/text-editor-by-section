import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/core.module';
import { GameService } from '../../../services/game.service';
import { Game } from '../../../components/game/game-item';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { App_N_Game_State } from '../../../gameMeta.state';
import { Router } from '@angular/router';


@Component({
  selector: 'anms-feature-list',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureListComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  games: Game[];
  game: Game;
  is_named$:Observable<Boolean>;
  the_doc: string;
  constructor(
    private gameService: GameService,
    private store:Store,
    private router:Router
    ){  }

  ngOnInit() {
    this.games = this.gameService.getGames();
  }

  openLink(link: string) {
    window.open(link, '_blank');
  }

  changeGame = () => {

    this.gameService.getNext()
  }

  addoneHour = () => {

    this.gameService.getAddOneHour()

  }


}
