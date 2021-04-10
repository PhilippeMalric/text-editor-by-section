import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { GameService } from '../../services/game.service';

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


  constructor(private changeDetectorRef: ChangeDetectorRef, private gameService: GameService) { }

  ngOnInit(): void {

     this.gameService.get_score().subscribe((data)=>{

      this.score_brut = data
      console.log(this.score_brut)

      Object.keys(this.score_brut).map(key=>{


        if(key != "boot"){

          Object.keys(this.score_brut[key]).map(key2=>{

            this.joueurCollection[key2] = 0

          })         

        }


      })

      console.log("joueurCollection")
      console.log(this.joueurCollection)

      for(let k of Object.keys(this.score_brut)){
        console.log(this.score_brut)
        console.log(k)
        console.log(this.score_brut[k])
        for(let k2 of Object.keys(this.score_brut[k])){

          this.joueurCollection[k2] = this.joueurCollection[k2] + Number(this.score_brut[k][k2])

        }

      }

      this.joueur = Object.keys(this.joueurCollection).map(k=>{
        return {joueur:k,score:this.joueurCollection[k]}
      })
      this.changeDetectorRef.markForCheck();

     })
    

  }

}
