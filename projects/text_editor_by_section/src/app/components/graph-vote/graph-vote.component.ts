import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { GameService } from '../../services/game.service';
import { UpvoteService } from '../../services/upvote.service';

@Component({
  selector: 'anms-graph-vote',
  templateUrl: './graph-vote.component.html',
  styleUrls: ['./graph-vote.component.scss']
})
export class GraphVoteComponent implements OnInit {

  choixDeReponses = [] 
  
  wi= 0
  subscription1: any;
  myScore: number;


  constructor(private upvoteService: UpvoteService, private gameService: GameService,private changeDetectorRef: ChangeDetectorRef) {
    

   }

  ngOnInit(): void {

    this.subscription1 = this.upvoteService.choixDeReponses.subscribe((items)=>{

      this.choixDeReponses = items.choixDeReponses
      console.log("choixDeReponses inside stat")
  
      console.log(this.choixDeReponses)

      if(this.choixDeReponses){
        let compte = this.choixDeReponses.map((item)=>{
          let number_of_vote = 0
          if("stat" in item){
            number_of_vote = item["stat"].length
          }
          item["vote"] = number_of_vote
          return number_of_vote
        })
        let somme = compte.reduce((a, b) => a + b, 0)
      
        this.wi = (100*this.choixDeReponses.length)+200
      
          this.choixDeReponses.map((item,i)=>{
            item["x"] = 10 + i*100
            item["x_label"] = 40 + i*100
      
            item["y"] = isNaN(100-((item["vote"] / somme)*100))?0:100-((item["vote"] / somme)*100)
            item["h"] = isNaN(((item["vote"] / somme)*100))?0:((item["vote"] / somme)*100)
          })
      



          let votesNumber:any[] = this.choixDeReponses.map((item)=>{

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
          this.choixDeReponses.map((item)=>{

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

            this.choixDeReponses.filter((item)=>{

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
              this.choixDeReponses.filter((item)=>{

                if(item.code == items.myVote && item.vote == max3){
                  myScore = 1
                  console.log("myScore")
                  console.log(myScore)
                }
    
              })
            }

          }
        this.myScore = myScore
        this.upvoteService.updateUserVote3(items.itemId, items.userId, myScore);
        this.changeDetectorRef.markForCheck();
        }
      
    })

    //console.log(this.greenH)
    //console.log(this.yellowH)
    //console.log(this.redH)
 
  }

  ngAfterViewInit(){
  
  }
  ngOnDestroy = () => {
    this.subscription1.unsubscribe();
  };

}

