import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, ViewContainerRef, ComponentFactoryResolver, ViewEncapsulation } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { GameService } from '../../services/game.service';
import { GoogleSheetService } from '../../services/google-sheet.service';
import { UpvoteService } from '../../services/upvote.service';
import { SingleChoiceComponent } from '../questionComponents/quiz-single-choice/quizSingleChoice.component';

import { UpvoteButtonComponent } from '../upvote-button/upvote-button.component';

@Component({
  selector: 'anms-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class QuizComponent implements OnInit {

  id="item_1_2"
  displayName=""
  small: boolean;
  vote="oui"

  gridByBreakpoint = {
    xl: 3,
    lg: 3,
    md: 2,
    sm: 1,
    xs: 1
  };

  gridByBreakpointH = {
    xl: 850,
    lg: 600,
    md: 500,
    sm: 500,
    xs: 600
  };
  @ViewChild('questionContainer', { read: ViewContainerRef }) entry: ViewContainerRef;
  componentRef: any;
  userSubscription: any;
  item: any;
  items: any;
  subItemId: any;
  sub1: any;
  item_from_sheet: any[];
  itemId: unknown;
  item_from_sheet_list: any[];
  item_from_sheet_list_filtered: any[];

  
  constructor(
    private upvoteService: UpvoteService,
    private gameService: GameService,
    private resolver: ComponentFactoryResolver,
    private changeDetectorRef: ChangeDetectorRef,
    private googleSheetService : GoogleSheetService,
    private observableMedia: MediaObserver) { }

  ngOnInit(): void {
    

    this.userSubscription = this.gameService.user.subscribe((user: string) => {
      console.log('user***');
      console.log(user);
      this.displayName = user;
      document['user'] = user;
    });
    
  }

  ngOnDestroy() {
      this.componentRef.destroy();
      this.userSubscription.unsubscribe()
      this.subItemId.unsubscribe()
      this.sub1.unsubscribe()
  }

  ngAfterContentInit() {

   
    this.observableMedia.asObservable().subscribe((change: MediaChange[]) => {
      console.log('change');
      console.log(change);
      
      //this.grid.cols = this.gridByBreakpoint[change[0].mqAlias]
      console.log(change[0].mqAlias)
      if(change[0].mqAlias == "sm" || change[0].mqAlias == "xs"){
         this.small = true
      }else{
        this.small = false
      }
      console.log('cols');
      //console.log(this.grid.cols)
      //this.grid.rowHeight = this.gridByBreakpointH[change[0].mqAlias];
      this.changeDetectorRef.markForCheck();
    });
  }

  ngAfterViewInit(){
    this.googleSheetService.getCooker().subscribe((items)=>{
      console.log("items---------------")
      console.log(items)

      this.items = items
      this.item = items[2]
      this.createComponent()
    })

    this.subItemId = this.upvoteService.getCurrentItem().subscribe((itemId)=>{

      this.itemId = itemId
      console.log(itemId)
      if(this.item_from_sheet_list){
        console.log(this.item_from_sheet_list)
        this.item_from_sheet_list_filtered = this.item_from_sheet_list.filter((item)=>{

          return item.nomunique == this.itemId
  
        })
        if(this.item_from_sheet_list_filtered){
          this.item = this.item_from_sheet_list_filtered[0]
          console.log("item")
          console.log(this.item_from_sheet_list_filtered)
          console.log(this.item)
          this.createComponent()
        }else{
          this.item = "item_1_2"
        }
      }
     
    
      
    })

    this.sub1 = this.googleSheetService.getCooker().subscribe((items:any[])=>{
      console.log("items44")
      console.log(items)
      
      this.item_from_sheet_list = items
      
    })
  }

  createComponent() {
    if(this.item){
      this.entry.clear();
      
      if(this.item.type == "Question_opinion"){
        const factory = this.resolver.resolveComponentFactory(UpvoteButtonComponent);
        this.componentRef = this.entry.createComponent(factory);

      }else{
        const factory = this.resolver.resolveComponentFactory(SingleChoiceComponent);
        this.componentRef = this.entry.createComponent(factory);
        

      }
      this.changeDetectorRef.markForCheck();
    }
      
      
  }




}
