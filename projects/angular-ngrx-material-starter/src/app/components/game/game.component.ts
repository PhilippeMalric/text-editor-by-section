import { Component, Input, OnInit, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';

import { GameDirective } from './game.directive';
import { Game }      from './game-item';
import { GameService } from '../../services/game.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-game',
  templateUrl: "./game.html"
})
export class GameComponent implements OnInit, OnDestroy {
  //@Input() game: Game;
  currentAdIndex = -1;
  @ViewChild(GameDirective, {static: true}) gameHost: GameDirective;
  interval: any;
  subscription: Subscription;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,private gameService:GameService) {

   }

  ngOnInit() {
    this.subscription = this.gameService.games$.subscribe(
      (game:Game)=>{

        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(game.component);

        const viewContainerRef = this.gameHost.viewContainerRef;
        viewContainerRef.clear();

        const componentRef = viewContainerRef.createComponent(componentFactory);
        //(<GameComponent>componentRef.instance).data = game.data;
      }

    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }


}
