import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnDestroy,
  ChangeDetectorRef,
  Inject
} from '@angular/core';
import { UpvoteService } from '../../services/upvote.service';
import { sum, values } from 'lodash';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { GameService } from '../../services/game.service';
import { GoogleSheetService } from '../../services/google-sheet.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'single-choice-button',
  templateUrl: './single-choice-button.component.html',
  styleUrls: ['./single-choice-button.component.scss']
})
export class SingleChoiceButtonComponent implements OnInit, OnDestroy {
  @Input() userId;
  @Input() itemId;
  
  voteCount: number = 0;
  userVote: number = 0;
  choixDeReponses = []
  subscription;
  color_plus: any;
  color_e: string;
  color_moins: string;
  nouveau_text: any;
  sub2: any;
  propsText: unknown;
  sub3: any;
  propCount: number;
  subAllPrps: any;
  sub1: any;
  item_from_sheet: any;
  vote: any[];

  constructor(
    public dialog: MatDialog,
    private upvoteService: UpvoteService,
    private gameService: GameService,
    private changeDetectorRef: ChangeDetectorRef,
    private googleSheetService : GoogleSheetService
  ) {}

  ngOnInit() {

  }

  ngAfterViewInit(){
  
    this.subAllPrps = this.upvoteService.getItemVotes(this.itemId).subscribe((vote)=>{
      console.log("itemId")
      console.log(this.itemId)
    
      console.log("vote")
      console.log(vote)

      let vote2:any = vote
      if(!vote2){
        vote2 = []
      }

        this.sub1 = this.googleSheetService.getCooker().pipe(take(1)).subscribe((items:any[])=>{
          console.log("googleSheetService111111111")
          console.log(items)
          console.log(this.itemId)
          
          this.item_from_sheet = items.filter((item)=>{
    
            return item.nomunique == this.itemId
    
          })[0]
    
          console.log("item_from_sheet")
          console.log(this.item_from_sheet)
          if(this.item_from_sheet){
            let c = true
            let compteur = 1
            let choixDeReponses = []
            while(c){
              let choix = this.item_from_sheet["x"+compteur]
              choixDeReponses.push({code:compteur, texte:choix})
              compteur++
              c = (("x"+compteur) in this.item_from_sheet)?true:false;
            }
            this.choixDeReponses = choixDeReponses
            console.log("vote22")
            console.log(vote2)
            if(this.userId in vote2){
              let myVote = vote2[this.userId]
              console.log("myVote")
              console.log(myVote)
              if(myVote){
                Object.keys(this.choixDeReponses).map((key)=>{
        
                  this.choixDeReponses[key]["color"] = (myVote == this.choixDeReponses[key]["code"])?"accent":"primary"
              
                })
              }else{
                Object.keys(this.choixDeReponses).map((key)=>{
        
                  this.choixDeReponses[key]["color"] = "primary"
              
                })
              }
              
            }else{
              Object.keys(this.choixDeReponses).map((key)=>{
        
                this.choixDeReponses[key]["color"] = "primary"
            
              })
            }

            console.log("choixDeReponses------------------------------------------")
            console.log(this.choixDeReponses)
          
            this.changeDetectorRef.markForCheck();
          }
        
        })

        
      
      
      
  

    

    
  })
  
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
  }


  faireUnChoix = (code)=>{

    this.upvoteService.updateUserVote(this.itemId, this.userId, code);
  
  }

  upvote() {
    let vote = 1;

    this.upvoteService.updateUserVote(this.itemId, this.userId, vote);
  }

  downvote() {
    let vote = -1;

    this.upvoteService.updateUserVote(this.itemId, this.userId, vote);
  }

  egale() {
    let vote = 0;

    this.upvoteService.updateUserVote(this.itemId, this.userId, vote);
  }


}

export interface DialogData {
  nouveau_text: string;
  text: string;
}


