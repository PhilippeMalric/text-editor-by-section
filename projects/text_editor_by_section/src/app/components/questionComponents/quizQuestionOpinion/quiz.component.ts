import { Component, OnInit, ChangeDetectionStrategy, Inject, ChangeDetectorRef, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { withLatestFrom } from 'rxjs/operators';
import { GameService } from '../../../services/game.service';
import { GoogleSheetService } from '../../../services/google-sheet.service';
import { UpvoteService } from '../../../services/upvote.service';

@Component({
  selector: 'anms-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizComponentTest implements OnInit {
  [x: string]: unknown;

  @Input() userId;
  @Input() itemId;

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
  minus: {};
  egale: {};
  prop: any;
  item_from_sheet: any;

  constructor(
    public dialog: MatDialog,
    private upvoteService: UpvoteService,
    private gameService: GameService,
    private googleSheetService : GoogleSheetService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {



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

  this.subAllPrps = this.gameService.voir_props3(this.itemId).pipe(
    withLatestFrom( this.upvoteService.getItemVotes(this.itemId))).subscribe(([prop,vote])=>{
      console.log("itemId")
      console.log(this.itemId)
    console.log("prop")
    console.log(prop)
    this.prop = prop

    this.mapNom_to_non_accepted_prop = {}

    console.log("itemId")
    console.log(this.itemId)

    let e = this.itemId
    if(prop){
      this.mapNom_to_non_accepted_prop = Object.keys(prop).filter((key)=>{

        return ! prop[key].approuve
  
      }).length
    }else{
      this.mapNom_to_non_accepted_prop = 0
    }



    console.log("vote")
    console.log(vote)
    this.vote = vote

    this.minus = 0
    this.egale = 0
    this.plus = 0

    if(vote){
      this.minus = Object.keys(vote).filter((key)=>{
        return vote[key] == -1
      })
      
      this.egale = Object.keys(vote).filter((key)=>{
        return vote[key] == 0
      })
      this.plus = Object.keys(vote).filter((key)=>{
        return vote[key] == 1
      })
    }
    
  

    this.sub1 = this.googleSheetService.getCooker().subscribe((items:any[])=>{
      console.log("items44")
      console.log(items)
      
      this.item_from_sheet = items.filter((item)=>{

        item.nomunique == this.itemId

      })
      console.log("item_from_sheet")
      console.log(this.item_from_sheet)
      

    })

  })
  this.changeDetectorRef.markForCheck();

}


  openDialog(): void {

    console.log("this.propsText")
    console.log(this.propsText)
    const dialogRef = this.dialog.open(DialogPropositionQuiz, {
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
  styleUrls: ['./quiz.component.scss']
})
export class DialogPropositionQuiz {
  constructor(
    public dialogRef: MatDialogRef<DialogPropositionQuiz>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
