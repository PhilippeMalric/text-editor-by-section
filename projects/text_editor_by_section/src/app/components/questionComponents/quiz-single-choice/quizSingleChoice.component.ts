import { Component, OnInit, ChangeDetectionStrategy, Inject, ChangeDetectorRef, Input, ViewContainerRef, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
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
  tabIndex = 0
  userId = "";
  itemId = "";
  choixDeReponses;
  choixDeReponses2:any

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
  subAllPrps2: any;
  props: unknown;
  mapNom_to_non_accepted_prop: {};
  votes: unknown;
  plus =[]
  minus =[];
  egale =[];
  prop: any;
  item_from_sheet: any;
  sommaire = null
  data:any

  constructor(
    public dialog: MatDialog,
    private upvoteService: UpvoteService,
    private gameService: GameService,
    private googleSheetService : GoogleSheetService,
    private changeDetectorRef: ChangeDetectorRef,
    private resolver: ComponentFactoryResolver
  ) {

    this.sommaire = new BehaviorSubject<string>("false")

  }

  ngOnInit() {

    this.upvoteService.getSommaire().subscribe((item)=>{
      if(item == 'false'){
        this.tabIndex = 0
      }else{
        this.tabIndex = 1
      }
    })

    this.gameService.user.subscribe((userId)=>{

      this.userId = userId

    })
    this.upvoteService.getCurrentItem().subscribe((itemId:any)=>{

      this.itemId = itemId

    })

    this.upvoteService.getCurrentItem().subscribe((itemId:any)=>{

      this.itemId = itemId

    })

    this.sommaire = this.upvoteService.getSommaire()
  

    this.sub3 = this.gameService.get_props(this.itemId).subscribe((data:any)=>{

      if(data){

        this.propCount = Object.keys(data).length
      }else{
        this.propCount = 0
      }

      
    })

   
  }

  ngOnDestroy() {
    //this.subscription.unsubscribe();
    this.subAllPrps.unsubscribe();
    this.subAllPrps2.unsubscribe();
    this.sub3.unsubscribe();
  }


ngAfterViewInit(){

 console.log("ngAfterViewInit - SingleChoiceComponent")
 
  this.subAllPrps2 = this.upvoteService.getItemVotes2(this.itemId).subscribe((vote)=>{
      console.log("itemId2-----")
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
          this.choixDeReponses2 = choixDeReponses
          if(this.itemId in vote2 && this.userId in vote2[this.itemId]){
            let myVote = vote2[this.itemId][this.userId]
            console.log("myVote")
            console.log(myVote)

            if(this.data){
              this.data.myVote = myVote

              this.upvoteService.choixDeReponses.next(this.data)
            }
            

            if(myVote){
              Object.keys(this.choixDeReponses2).map((key)=>{
      
                this.choixDeReponses2[key]["color"] = (myVote == this.choixDeReponses2[key]["code"])?"accent":"primary"
            
              })
            }else{
              Object.keys(this.choixDeReponses2).map((key)=>{
      
                this.choixDeReponses2[key]["color"] = "primary"
            
              })
            }
            
          }else{
            Object.keys(this.choixDeReponses2).map((key)=>{
      
              this.choixDeReponses2[key]["color"] = "primary"
          
            })
          }
          console.log("---------------------choixDeReponses2")
          console.log(this.choixDeReponses2)

          this.changeDetectorRef.markForCheck();
          if(this.itemId in vote2){

            //this.vote = vote[this.itemId]
      
            if(this.vote && this.choixDeReponses2){
              /*
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
              */

          }
        
            this.changeDetectorRef.markForCheck();
          }
        }
      
      })

      
    }
    
  })

  this.subAllPrps = this.upvoteService.getItemVotes(this.itemId).subscribe((vote)=>{
    console.log("itemId2222-----")
    console.log(this.itemId)


  this.mapNom_to_non_accepted_prop = {}

  console.log("itemId")
  console.log(this.itemId)

  this.mapNom_to_non_accepted_prop = 0
 
  console.log("vote")
  console.log(vote)

  let vote2:any = vote
  if(vote2){

    this.googleSheetService.getCooker().pipe(take(1)).subscribe((items:any[])=>{
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
        //this.choixDeReponses2 = choixDeReponses
        if(this.itemId in vote2 && this.userId in vote2[this.itemId]){
          let myVote = vote2[this.itemId][this.userId]
          console.log("myVote")
          console.log(myVote)
          

        if(this.itemId in vote2){

          this.vote = vote[this.itemId]
    
          if(this.vote && this.choixDeReponses2){
            this.choixDeReponses2.map((item)=>{
              let code = item["code"]
              item["stat"] = Object.keys(this.vote).filter((key2)=>{
                return this.vote[key2] == code
              })
          
            })

            console.log("choixDeReponses")
            console.log(this.choixDeReponses2)

            this.data = {
              myVote:myVote,
              choixDeReponses:this.choixDeReponses2,
              itemId : this.itemId,
              userId : this.userId
            
            }

            this.entry.clear();
            const factory = this.resolver.resolveComponentFactory(GraphVoteComponent);
            this.componentRef = this.entry.createComponent(factory);
            this.upvoteService.choixDeReponses.next( this.data)
        }
      
          this.changeDetectorRef.markForCheck();
        }
      }
      }
    })

    
  }
  
})


}

faireUnChoix = (code)=>{
  console.log("userId")
  console.log(this.userId)
  this.upvoteService.updateUserVote2(this.itemId, this.userId, code);

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
