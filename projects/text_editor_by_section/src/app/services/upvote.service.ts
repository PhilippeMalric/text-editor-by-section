import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { BehaviorSubject } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { GameService } from './game.service';

@Injectable()
export class UpvoteService {


  choixDeReponses: BehaviorSubject<any>;
  choixDeReponses2: any;
  myScore: number;

  
  constructor(
    private gameService: GameService,
    private db: AngularFireDatabase
  ) {

    this.choixDeReponses = new BehaviorSubject<[]>([]);
    this.choixDeReponses.subscribe((items)=>{

      this.choixDeReponses2 = items.choixDeReponses
      console.log("choixDeReponses inside stat upvote service")
  
      console.log(this.choixDeReponses2)

      if(this.choixDeReponses2 && this.choixDeReponses2.length > 0){
        let compte = this.choixDeReponses2.map((item)=>{
          let number_of_vote = 0
          if("stat" in item){
            number_of_vote = item["stat"].length
          }
          item["vote"] = number_of_vote
          return number_of_vote
        })
        let somme = compte.reduce((a, b) => a + b, 0)
      
      



          let votesNumber:any[] = this.choixDeReponses2.map((item)=>{

            return item.vote

          })

          let max1 = Math.max(...votesNumber)
          //console.log("max1")
          //console.log(max1)

          votesNumber = votesNumber.filter((item)=>{

            return item != max1

          })
          //console.log("votesNumber")
          //console.log(votesNumber)

          let myScore = 0
          this.choixDeReponses2.map((item)=>{

            if(item.code == items.myVote && item.vote == max1){
              myScore = 3
              console.log("myScore")
              console.log(myScore)

            }

          })

          let max2 = 0
          let max3 = 0
          


          if(votesNumber.length > 0){
            max2 = Math.max(...votesNumber)
            //console.log("max2")
            //console.log(max2)

            this.choixDeReponses2.filter((item)=>{

              if(item.code == items.myVote && item.vote == max2){
                myScore = 2
                //console.log("myScore")
                //console.log(myScore)
              }
  
            })

            votesNumber = votesNumber.filter((item)=>{

              return item != max2
  
            })
            //console.log("votesNumber")
            //console.log(votesNumber)
            if(votesNumber.length > 0){
              max3 = Math.max(...votesNumber)
              this.choixDeReponses2.filter((item)=>{

                if(item.code == items.myVote && item.vote == max3){
                  myScore = 1
                  console.log("myScore")
                  console.log(myScore)
                }
    
              })
            }

          }
        this.myScore = myScore
        this.updateUserVote3(items.itemId, items.userId, myScore);
        
        }
      
    })
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

  getItemVotes2(itemId): any {
    // Gets total votes
    //console.log(itemId);
    return this.db
      .object(`upvotes2/${itemId}`)
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
    console.log(userId);
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

  updateUserVote2(itemId, userId, vote): void {
    // Creates or updates user's vote
    console.log('update');
    console.log(userId);
    let data = {};
    data[userId] = vote;

    this.db
      .object(`upvotes2/`)
      .valueChanges()
      .pipe(take(1))
      .subscribe((item: any) => {
        console.log('-----------Add item  -----------');
        //console.log(item);
        //console.log(itemId in item);
        if (itemId in item) {
          this.db.object(`upvotes2/${itemId}/`).update(data);
        } else {
          let data1 = {};
          data1[itemId] = data;

          this.db.object(`upvotes2/`).update(data1);
        }
      });
  }

  updateUserVote3(itemId, userId, vote): void {
    // Creates or updates user's vote
    console.log('update');
    console.log(userId);
    let data = {};
    data[userId] = vote;

    this.db
      .object(`score/`)
      .valueChanges()
      .pipe(take(1))
      .subscribe((item: any) => {
        console.log('-----------Add item  -----------');
        //console.log(item);
        //console.log(itemId in item);
        if (itemId in item) {
          this.db.object(`score/${itemId}/`).update(data);
        } else {
          let data1 = {};
          data1[itemId] = data;

          this.db.object(`score/`).update(data1);
        }
      });
  }

}
