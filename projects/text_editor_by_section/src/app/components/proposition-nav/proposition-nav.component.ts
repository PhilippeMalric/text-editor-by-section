import { Component, OnInit, ChangeDetectionStrategy, ViewChild, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take, withLatestFrom } from 'rxjs/operators';
import { GameService } from '../../services/game.service';
import * as saveAs from 'file-saver';

//declare var saveAs:any;

@Component({
  selector: 'anms-proposition-nav',
  templateUrl: './proposition-nav.component.html',
  styleUrls: ['./proposition-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropositionNavComponent implements OnInit {

  @Input('data') data: any;
  data2: Observable<any>;
  myItem: any[];
  

  constructor(private gameService:GameService) {

   

   }

  ngOnInit(): void {
    console.log("test1678-----------------------------------------------")
    this.data2 =  this.data.pipe(withLatestFrom(this.gameService.get_projet_de_loi3()), map((item)=>{
      console.log("Allo-----------------------------------------------")
      console.log(item)
      let proposition = item[0]
      let projet_de_loi = item[1]


      document["proposition"] = proposition
      document["projet_de_loi"] = projet_de_loi


      let flatP = this.flattenObject(proposition)
      let flatPr = this.flattenObject(projet_de_loi)
      let propArray = this.createArrayPropositions(flatP)
     

      console.log("Allo2-----------------------------------------------")
      console.log(propArray)
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

    this.myItem = newArray

    return newArray
  }

  downloadFile() {
    let data = this.myItem
      console.log(data)
      const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
      const header = Object.keys(data[13]);
      let csv = data.map(row => {return header.map(fieldName => {

        let text = JSON.stringify(row[fieldName], replacer)
        //console.log(text)
        text = (text)?text:"-"
          return text.toString().replace('"',"'")
      }).join(';')}) ;

      csv.unshift(header.join(';'));
      let csvArray = csv.join('\r\n');
  
      var blob = new Blob([csvArray], {type: 'text/csv' })
      saveAs.saveAs(blob, "myFile.csv");
   
  }

  downloadPDL() {
    this.gameService.get_projet_de_loi3().pipe(take(1)).subscribe(((data:any)=>{
      console.log(data)
      const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
      const header = Object.keys(data[0]);
      let csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(';'));
      csv.unshift(header.join(';'));
      let csvArray = csv.join('\r\n');
  
      var blob = new Blob([csvArray], {type: 'text/csv' })
      saveAs.saveAs(blob, "myFile.csv");
    }))
    
      
   
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
