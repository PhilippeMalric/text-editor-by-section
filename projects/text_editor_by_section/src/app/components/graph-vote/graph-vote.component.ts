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


  constructor(private upvoteService: UpvoteService, private gameService: GameService,private changeDetectorRef: ChangeDetectorRef) {
    

   }

  ngOnInit(): void {

    this.subscription1 = this.upvoteService.choixDeReponses.subscribe((items)=>{

      this.choixDeReponses = items
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
      
        this.wi = (80*this.choixDeReponses.length)+10
      
          this.choixDeReponses.map((item,i)=>{
            item["x"] = 10 + i*70
            item["x_label"] = 20 + i*70
      
            item["y"] = isNaN(100-((item["vote"] / somme)*100))?0:100-((item["vote"] / somme)*100)
            item["h"] = isNaN(((item["vote"] / somme)*100))?0:((item["vote"] / somme)*100)
          })
      
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

