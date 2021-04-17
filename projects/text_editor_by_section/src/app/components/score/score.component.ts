import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import { GameService } from '../../services/game.service';
import { GoogleSheetService } from '../../services/google-sheet.service';

@Component({
  selector: 'anms-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScoreComponent implements OnInit {
  score_brut: any;
  joueurCollection = {}
  joueur:any[]
  
  displayedColumns: string[] = ['texte','score']
  dataSource: MatTableDataSource<any>;
  player = "Philippe Malric";
  sub: Subscription;
  
  constructor(
    private changeDetectorRef: ChangeDetectorRef, 
   // private googleSheetService : GoogleSheetService,
    public gameService: GameService) { }
  
    ngOnDestroy() {
     
      this.sub.unsubscribe();
    }

  ngOnInit(): void {

    console.log("init---ScoreComponent")
    
    this.sub = this.gameService.get_score2().subscribe(([data2,data])=>{

      this.score_brut = data
      console.log(this.score_brut)
      console.log("data2")
      console.log(data2)

      Object.keys(this.score_brut).map(key=>{


        if(key != "boot"){

          Object.keys(this.score_brut[key]).map(key2=>{

            this.gameService.joueurCollection[key2] = {}
            this.gameService.joueurCollection[key2]["finalScore"] = 0
            this.gameService.joueurCollection[key2]["tab"] = []
          })         
        }
      })

      console.log("joueurCollection")
      console.log(this.gameService.joueurCollection)

      for(let k of Object.keys(this.score_brut)){
        console.log(this.score_brut)
        console.log(k)
        console.log(this.score_brut[k])

        let item_from_g = data2.filter((item)=>{return item.nomunique == k})[0]


        for(let k2 of Object.keys(this.score_brut[k])){
          this.gameService.joueurCollection[k2][k] = this.score_brut[k][k2]
          this.gameService.joueurCollection[k2]["finalScore"] = this.gameService.joueurCollection[k2]["finalScore"] + Number(this.score_brut[k][k2])
          this.gameService.joueurCollection[k2]["tab"].push({itemId:k,texte:item_from_g.texte,score:this.score_brut[k][k2]})
        }
        
      }
      for(let k3 of Object.keys(this.gameService.joueurCollection)){
        
        this.gameService.joueurCollection[k3]["tab"].push({itemId:"total",texte:"Total",score:this.gameService.joueurCollection[k3]["finalScore"]})
      
      }

      this.gameService.joueur.next(Object.keys(this.gameService.joueurCollection).map(k=>{
        return {joueur:k,score:this.gameService.joueurCollection[k]["finalScore"]}
      }))

      console.log("joueurCollection")
      console.log(this.gameService.joueurCollection)
      console.log("joueur")
      console.log(this.joueur)

      this.gameService.dataSourceScore.next(new MatTableDataSource<any[]>(this.gameService.joueurCollection[this.player]['tab']));


      this.changeDetectorRef.markForCheck();

     })
    
  }

  changePlayer = (player)=>{

    this.player = player

    this.gameService.dataSourceScore.next(new MatTableDataSource<String>(this.gameService.joueurCollection[this.player]['tab']));

    this.changeDetectorRef.markForCheck();
  }


}
