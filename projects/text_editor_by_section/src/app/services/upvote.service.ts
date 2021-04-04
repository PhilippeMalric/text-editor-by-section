import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { BehaviorSubject } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { GameService } from './game.service';

@Injectable()
export class UpvoteService {


  choixDeReponses: BehaviorSubject<[]>;

  
  constructor(
    private gameService: GameService,
    private db: AngularFireDatabase
  ) {

    this.choixDeReponses = new BehaviorSubject<[]>([]);

  }



  getCurrentItem(){

    return this.db
      .object(`itemId/`)
      .valueChanges()
      .pipe(
        tap(item => {
          //console.log('vote');
          //console.log(item);
        })
      );
  }

setCurrentItem(itemId){

    return this.db
      .object(`itemId/`).set(itemId)
  }

  setRecap(recap){

    return this.db
      .object(`recap/`).set(recap)
  }
  getRecap(){

    return this.db
      .object(`recap/`)
      .valueChanges()
      .pipe(
        tap(item => {
          //console.log('vote');
          //console.log(item);
        })
      );
  }
  setSommaire(recap){

    return this.db
      .object(`sommaire/`).set(recap)
  }
  getSommaire(){

    return this.db
      .object(`sommaire/`)
      .valueChanges()
      .pipe(
        tap(item => {
          //console.log('vote');
          //console.log(item);
        })
      );
  }
  
  getItemVotes(itemId): any {
    // Gets total votes
    //console.log(itemId);
    return this.db
      .object(`upvotes/${itemId}`)
      .valueChanges()
      .pipe(
        tap(item => {
          //console.log('vote');
          //console.log(item);
        })
      );
  }

  updateUserProp = (itemId, userId, prop) => {
    this.gameService.userEmail.pipe(take(1)).subscribe((userEmail)=>{
      console.log('UpdateProp');
      let data = {};
      data[userId] = { approuve: false, prop: prop, email:userEmail };
      this.db.object(`propositions/${itemId}/`).update(data);

    })
    
  };

  updateUserVote(itemId, userId, vote): void {
    // Creates or updates user's vote
    console.log('update');
    let data = {};
    data[userId] = vote;

    this.db
      .object(`upvotes/`)
      .valueChanges()
      .pipe(take(1))
      .subscribe((item: any) => {
        console.log('-----------Add item  -----------');
        //console.log(item);
        //console.log(itemId in item);
        if (itemId in item) {
          this.db.object(`upvotes/${itemId}/`).update(data);
        } else {
          let data1 = {};
          data1[itemId] = data;

          this.db.object(`upvotes/`).update(data1);
        }
      });
  }
}
