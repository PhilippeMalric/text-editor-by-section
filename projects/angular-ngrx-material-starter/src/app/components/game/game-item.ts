import { Type } from '@angular/core';

export class Game {
  constructor(public component: Type<any>) {}
}

export interface GameData {
  data: any;
}
