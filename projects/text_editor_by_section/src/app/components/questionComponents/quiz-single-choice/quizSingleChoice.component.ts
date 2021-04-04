import { Component, OnInit, ChangeDetectionStrategy, Inject, ChangeDetectorRef, Input, ViewContainerRef, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take, withLatestFrom } from 'rxjs/operators';
import { GameService } from '../../../services/game.service';
import { GoogleSheetService } from '../../../services/google-sheet.service';
import { UpvoteService } from '../../../services/upvote.service';
import { GraphVoteComponent } from '../../graph-vote/graph-vote.component';

@Component({
  selector: 'anms-quiz',
  templateUrl: './quizSingleChoice.component.html',
  styleUrls: ['./quizSingleChoice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleChoiceComponent implements OnInit {
  [x: string]: unknown;

  userId = "";
  itemId = "";
  choixDeReponses;
  @ViewChild('graphVote', { read: ViewContainerRef }) entry: ViewContainerRef;

  componentRef:any
  voteCount: number = 0;
  userVote: number = 0;

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
  props: unknown;
  mapNom_to_non_accepted_prop: {};
  votes: unknown;
  plus =[]
  minus =[];
  egale =[];
  prop: any;
  item_from_sheet: any;
  

  constructor(
    public dialog: MatDialog,
    private upvoteService: UpvoteService,
    private gameService: GameService,
    private googleSheetService : GoogleSheetService,
    private changeDetectorRef: ChangeDetectorRef,
    private resolver: ComponentFactoryResolver
  ) {}

  ngOnInit() {

    this.gameService.user.subscribe((userId)=>{

      this.userId = userId

    })
    this.upvoteService.getCurrentItem().subscribe((itemId:any)=>{

      this.itemId = itemId

    })
  

    this.sub3 = this.gameService.get_props(this.itemId).subscribe((data:any)=>{

      if(data){

        this.propCount = Object.keys(data).length
      }else{
        this.propCount = 0
      }

      
    })

    this.sub2 = this.gameService.voir_props(this.itemId,this.userId).subscribe((data:any)=>{

      if(data){this.propsText = data.prop}
    })

    this.subscription = this.upvoteService
      .getItemVotes(this.itemId)
      .subscribe(upvotes => {
        //console.log("firebase")
        if (upvotes) {
          this.voteCount = Object.keys(upvotes).length;
        } else {
          this.voteCount = 0;
        }
        if (upvotes && this.userId && this.userId in upvotes) {
          this.userVote = upvotes[this.userId];
          //console.log(this.userVote)
          this.color_plus = this.userVote == 1 ? 'primary' : 'accent';
          this.color_e = this.userVote == 0 ? 'primary' : 'accent';
          this.color_moins = this.userVote == -1 ? 'primary' : 'accent';
          this.changeDetectorRef.markForCheck();
        } else {
          this.color_plus = 'accent';
          this.color_e = 'accent';
          this.color_moins = 'accent';
          this.changeDetectorRef.markForCheck();
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
  }


ngAfterViewInit(){

 
 
  this.subAllPrps = this.upvoteService.getItemVotes(this.itemId).subscribe((vote)=>{
      console.log("itemId")
      console.log(this.itemId)
  

    this.mapNom_to_non_accepted_prop = {}

    console.log("itemId")
    console.log(this.itemId)

    this.mapNom_to_non_accepted_prop = 0
   
    console.log("vote")
    console.log(vote)

    let vote2:any = vote
    if(vote2){

      this.sub1 = this.googleSheetService.getCooker().pipe(take(1)).subscribe((items:any[])=>{
        console.log("googleSheetService")
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
          if(this.itemId in vote2 && this.userId in vote2[this.itemId]){
            let myVote = vote2[this.itemId][this.userId]
            console.log("myVote")
            console.log(myVote)
            Object.keys(this.choixDeReponses).map((key)=>{
      
              this.choixDeReponses[key]["color"] = (myVote == this.choixDeReponses[key]["code"])?"accent":"primary"
          
            })
          }

          if(this.itemId in vote2){

            this.vote = vote[this.itemId]
      
            if(this.vote && this.choixDeReponses){
              this.choixDeReponses.map((item)=>{
                let code = item["code"]
                item["stat"] = Object.keys(this.vote).filter((key2)=>{
                  return this.vote[key2] == code
                })
            
              })

              console.log("choixDeReponses")
              console.log(this.choixDeReponses)

              this.entry.clear();
              const factory = this.resolver.resolveComponentFactory(GraphVoteComponent);
              this.componentRef = this.entry.createComponent(factory);
              this.componentRef.instance.choixDeReponses = this.choixDeReponses
          }
        
            this.changeDetectorRef.markForCheck();
          }
        }
      
      })

      
    }
    
    
  

    

    
  })
}

faireUnChoix = (code)=>{

  this.upvoteService.updateUserVote(this.itemId, this.userId, code);

}


  openDialog(): void {

    console.log("this.propsText")
    console.log(this.propsText)
    const dialogRef = this.dialog.open(DialogPropositionQuizSC, {
      width: '400px',
      data: { nouveau_text: this.propsText, text: "" }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.nouveau_text = result;
      console.log('result');
      console.log(result);
      console.log(this.itemId);
      if (result && result != '') {
        this.upvoteService.updateUserProp(this.itemId, this.userId, result);
      }
    });
  }

  upvote() {
    let vote = 1;

    this.upvoteService.updateUserVote(this.itemId, this.userId, vote);
  }

  downvote() {
    let vote = -1;

    this.upvoteService.updateUserVote(this.itemId, this.userId, vote);
  }

  egaleVote() {
    let vote = 0;

    this.upvoteService.updateUserVote(this.itemId, this.userId, vote);
  }

}

export interface DialogData {
  nouveau_text: string;
  text: string;
}

@Component({
  selector: 'dialog_vote',
  templateUrl: './dialog.html',
  styleUrls: ['./quizSingleChoice.component.scss']
})
export class DialogPropositionQuizSC {
  constructor(
    public dialogRef: MatDialogRef<DialogPropositionQuizSC>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
