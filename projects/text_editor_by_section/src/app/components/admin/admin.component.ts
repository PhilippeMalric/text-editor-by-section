import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { GameService } from '../../services/game.service';
import { take, withLatestFrom } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { Item } from '../table/table.component';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'anms-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  name: any;
  dataSource:MatTableDataSource<String>;
  dataSource_propositions:MatTableDataSource<String>;
  users: String[];
  displayedColumns: string[] = ['name1','txt1',"plus1","egale1","moins1","button1"];
  displayedColumns2: string[] = ['name2','txt2','delete2'];
  displayedColumns3: string[] = ['name3',"plus3","egale3","moins3","delete3"];
  sub1: Subscription;
  sub0: Subscription;
  subAllPrps: Subscription;
  props: unknown;
  mapNom_to_non_accepted_prop: any;
  votes: any;
  minus: {};
  egale: {};
  plus: {};
  dataSource_commentaires: MatTableDataSource<any>;
  subpropo: any;
  sub5: Subscription;
  constructor(private gameService:GameService,public dialog: MatDialog) {}

  
  ngOnDestroy(): void {
    this.sub1.unsubscribe()
    this.sub0.unsubscribe()
    this.sub5.unsubscribe()
    this.subpropo.unsubscribe()

    this.subAllPrps.unsubscribe()
  }

  ngOnInit(): void {

    this.subAllPrps = this.gameService.get_props2().pipe(
      withLatestFrom(this.gameService.get_upvote())).subscribe(([props,votes])=>{

      console.log("props")
      console.log(props)
      this.props = props

      this.mapNom_to_non_accepted_prop = {}

      for(let e of Object.keys(props)){
        this.mapNom_to_non_accepted_prop[e] = Object.keys(props[e]).filter((key)=>{

          return ! props[e][key].approuve

        }).length



      }
      console.log("votes")
      console.log(votes)
      this.votes = votes

      this.minus = {}
      this.egale = {}
      this.plus = {}
      for(let e of Object.keys(votes)){
        this.minus[e] = Object.keys(votes[e]).filter((key)=>{
          return votes[e][key] == -1
        })
        
        //console.log(e)
        //console.log(this.minus[e])

        this.egale[e] = Object.keys(votes[e]).filter((key)=>{
          return votes[e][key] == 0
        })
        this.plus[e] = Object.keys(votes[e]).filter((key)=>{
          return votes[e][key] == 1
        })
      }

      this.sub1 = this.gameService.get_projet_de_loi().subscribe((items:any[])=>{
        console.log("items44")
        console.log(items)
        for(let e of items[0].sousSections){
          e.props_non_acc = this.mapNom_to_non_accepted_prop[e.nom]
          e.props_acc = 0
          e.moins = this.minus[e.nom]
          e.egale = this.egale[e.nom]
          e.plus = this.plus[e.nom]
        }

        this.dataSource = new MatTableDataSource<String>(items[0].sousSections);
      })
  
    })
   

    this.sub0 = this.gameService.user.subscribe((name)=>{
      this.name = name
      console.log("textName")
      console.log(this.name)
    })




    
  }



  show_voters = (item,voters)=>{

    
    const dialogRef = this.dialog.open(DialogVotersAdmin, {
      width: '70%',
      data: {item: item.txt,names: voters}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Vous avez vu les voters');
      
      console.log(result)
      if(result && result != ""){
        //this.upvoteService.updateUserProp(this.itemId, this.userId, result)
      }
    })
  }




  



  openDialog(item:any): void {

    this.gameService.voir_props2(item).pipe(take(1)).subscribe((props)=>{

      console.log("props")
      console.log(props)

        let txt_props = Object.keys(props).map((x)=>{return {name:x,txt:props[x].prop,approuve:props[x].approuve}}).filter((x)=>{return ! x.approuve})
        
        console.log("txt_props")
        console.log(txt_props)
        
      const dialogRef = this.dialog.open(DialogPropositionAdmin, {
        width: '70%',
        data: {props: txt_props,text:item.txt,nom:item.nom}
      });
    
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        
        console.log(result)
        if(result && result != ""){
          //this.upvoteService.updateUserProp(this.itemId, this.userId, result)
        }
        
      });

    })
    
  }





}

export interface DialogAdmin {
  nom: string;
  text:string;
  props:any[]
}
@Component({
  selector: 'dialog_proposition_admin',
  templateUrl: 'dialog.html',
  styleUrls: ['./admin.component.scss']
})
export class DialogPropositionAdmin {
  sub0: Subscription;
  name: string;
  constructor(private gameService:GameService,
    public dialogRef: MatDialogRef<DialogPropositionAdmin>,
    @Inject(MAT_DIALOG_DATA) public data: DialogAdmin) {

      console.log("data")
      console.log(data)

    }

    ngOnDestroy(): void {
      this.sub0.unsubscribe()
    }
  
    ngOnInit(): void {
  
      this.sub0 = this.gameService.user.subscribe((name)=>{
        this.name = name
        console.log("textName")
        console.log(this.name)
      })
    }
    

  onNoClick(): void {
    this.dialogRef.close();
  }
  approuve(nom,item){
    this.gameService.approuve(nom,item.name,item.txt)
    this.dialogRef.close();
  }
  

}




export interface VotersAdmin {
  item: string;
  names:any[]
}
//----------
@Component({
  selector: 'dialog_voters_admin',
  templateUrl: 'dialog_voters.html',
  styleUrls: ['./admin.component.scss']
})
export class DialogVotersAdmin {
  
  name: string;
  constructor(private gameService:GameService,
    public dialogRef: MatDialogRef<DialogVotersAdmin>,
    @Inject(MAT_DIALOG_DATA) public data: VotersAdmin) {

      console.log("data")
      console.log(data)

    }
    delete = (element,name)=>{
      console.log("delete")
      console.log(name)
      console.log(element)
    }
    ngOnDestroy(): void {
      //this.sub0.unsubscribe()
    }
  
    ngOnInit(): void {
  
    }
    

  onNoClick(): void {
    this.dialogRef.close();
  }
  approuve(nom,item){
    this.gameService.approuve(nom,item.name,item.txt)
    this.dialogRef.close();
  }
  

}
