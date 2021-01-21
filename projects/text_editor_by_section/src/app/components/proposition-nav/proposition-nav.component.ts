import { Component, OnInit, ChangeDetectionStrategy, ViewChild, Input } from '@angular/core';
import { map, withLatestFrom } from 'rxjs/operators';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'anms-proposition-nav',
  templateUrl: './proposition-nav.component.html',
  styleUrls: ['./proposition-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropositionNavComponent implements OnInit {

  @Input('data') data: any;
  data2: any;

  constructor(private gameService:GameService) {

   

   }

  ngOnInit(): void {
    console.log("test1678-----------------------------------------------")
    this.data2 =  this.data.pipe(withLatestFrom(this.gameService.get_projet_de_loi()), map((item)=>{

      let proposition = item[0]
      let projet_de_loi = item[1]


      document["proposition"] = proposition
      document["projet_de_loi"] = projet_de_loi


      let flatP = this.flattenObject(proposition)
      let flatPr = this.flattenObject(projet_de_loi)
      let propArray = this.createArrayPropositions(flatP)
      console.log(propArray)

      console.log("Allo-----------------------------------------------")
      console.log(item)
      return propArray
    }))
    
  }

  createArrayPropositions = (flatP)=>{
    console.log(flatP)
    let newArray = []
    let object1 = {}
    let keys = Object.keys(flatP)
    for (let k of keys){
      let key_splitted = k.split(".")
      if(key_splitted.length > 2){
        let key_compo = key_splitted[0]+"_"+key_splitted[1]
        if(key_compo in object1){
          object1[key_compo][key_splitted[2]] = flatP[k]
          
        }else{
          object1[key_compo]={}
          object1[key_compo]["nomItem"] = key_splitted[0]
          object1[key_compo]["nomUser"] = key_splitted[1]
          object1[key_compo][key_splitted[2]] = flatP[k]
        }
      }
    }
    for(let k of Object.keys(object1)){
      newArray.push(object1[k])
    }
    return newArray
  }


  flattenObject = function(ob) {
    var toReturn = {};
    
    for (var i in ob) {
      if (!ob.hasOwnProperty(i)) continue;
      
      if ((typeof ob[i]) == 'object') {
        var flatObject = this.flattenObject(ob[i]);
        for (var x in flatObject) {
          if (!flatObject.hasOwnProperty(x)) continue;
          
          toReturn[i + '.' + x] = flatObject[x];
        }
      } else {
        toReturn[i] = ob[i];
      }
    }
    return toReturn;
  };

    ngOnDestroy(): void {

    }

}
