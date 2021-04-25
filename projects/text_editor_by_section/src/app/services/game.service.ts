import { Injectable } from '@angular/core';

import { BehaviorSubject, Subscription, Subject } from 'rxjs';
import { Link, Node } from '../d3';
import { Store } from '@ngrx/store';
import { AngularFireDatabase } from '@angular/fire/database';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Item } from '../components/table/table.component';
import { take, tap, map, withLatestFrom } from 'rxjs/operators';
import * as uuid from 'uuid';
import { GoogleSheetService } from './google-sheet.service';
import { MatTableDataSource } from '@angular/material/table';

export class SousSection {
  id: String;
  texte: String;
  color: String;
  vote: String;
  premier: boolean;
  type:String;
  typeQ:String;
  groupe: String;

  constructor(id: String, texte: String, vote: String,premier:boolean,type:String,groupe:String,typeQ:String) {
    this.id = id;
    this.premier = premier;
    this.texte = texte;
    this.vote = vote;
    this.type = type;
    this.typeQ = typeQ;
    this.groupe = groupe;
  }
}

export class Section {
  id: String;
  titre: String;
  sousSections: SousSection[];
  color: String;
  commentaire: String;

  constructor(id: String, titre: String, sousSections: SousSection[]) {
    this.id = id;
    this.titre = titre;
    this.sousSections = sousSections;
  }

  printSection = () => {
    console.log('titre', this.titre);
    console.log(this.sousSections);
  };
}

@Injectable()
export class GameService {
  
  gameSubscription: Subscription;
  nom_du_joueur$: BehaviorSubject<String>;
  heureDispo: number;
  heureDispo$: BehaviorSubject<String>;
  index: number;
  motAtrouver$: BehaviorSubject<String>;
  mot: number;
  
  my_cat = '';
  items: BehaviorSubject<Item[]>;
  user: BehaviorSubject<string>;
  userEmail: BehaviorSubject<string>;
  started: BehaviorSubject<boolean>;
  textName: BehaviorSubject<string>;
  joueur: BehaviorSubject<any>;
  dataSourceScore: BehaviorSubject<any>;
  joueurCollection = {}
  

  constructor(
    private googleSheetService : GoogleSheetService,
    private store: Store,
    private db: AngularFireDatabase,
    private http: HttpClient
  ) {
    this.index = 0;
    this.heureDispo = 0;
    this.heureDispo$ = new BehaviorSubject<String>('0');
    this.mot = 0;
    this.motAtrouver$ = new BehaviorSubject<String>('0');
    this.nom_du_joueur$ = new BehaviorSubject<String>('');
    this.joueur= new BehaviorSubject<any>([]);
    this.dataSourceScore= new BehaviorSubject<any>(new MatTableDataSource<any[]>([]));
    this.textName = new BehaviorSubject<string>('');
   

    this.items = new BehaviorSubject<Item[]>([]);
    this.user = new BehaviorSubject<string>('');
    this.userEmail = new BehaviorSubject<string>('');
    this.started = new BehaviorSubject<boolean>(null);
    
  }

  delete(name: string) {
    this.db.object('users/' + name).remove();
  }

  set_text_courant = (text: any) => {
    this.db.object('textCourant').set(text);
  };

  get_score = ()=>{

    return this.db.object(`score/`).valueChanges()

    
  }
  get_score2 = ()=>{

    return this.googleSheetService.getCooker().pipe(withLatestFrom(this.get_score()))

    
  }
  

  approuve(item,name:string,text){
    let data = {prop:text,approuve:true}
    console.log("chemin")
    console.log("propositions/"+item+"/"+name);
    
    this.db.object("propositions/"+item+"/"+name).update(data)
  }

  get_props2 = ()=>{

    return this.db.object(`propositions/`).valueChanges()
  
  }
  voir_props2 = (item)=>{

    return this.db.object(`propositions/${item.nom}`).valueChanges()
  
  }
  voir_props3 = (item)=>{

    return this.db.object(`propositions/${item}`).valueChanges()
  
  }
  get_upvote = ()=>{
    return this.db.object(`upvotes/`).valueChanges()
   }

   get_projet_de_loi2 = () => {
    return this.http.get('assets/projet_de_loi.json')
   }
   
   get_projet_de_loi4 = () => {
    return this.googleSheetService.getCooker().pipe(
      map((item: any[]) => {
        console.log(
          '-------------------------------------------------projet_de_loi4!------------'
        );
        console.log(item);
        let titres = item.filter(element => {
          return element.nomunique.charAt(0) == 't';
        });

        let sections = titres.map((titre: any) => {
          let index = titre.nomunique.split('_')[1];
          let sousSections = item.filter(element => {
            let h = element.nomunique.charAt(0) == 't';
            let index_e = element.nomunique.split('_')[1].split('_')[0];
            //console.log(element.nomunique.split('_')[1])
            //console.log(index_e)
            return index == index_e && !h;
          });

          let groupes = sousSections.map((data)=>{
            return ""+data.groupe
          })
          let groupes_unique = this.uniqueArray2(groupes)

          let dico_det_premier = {}
          let item_by_groupe = groupes_unique.map((data,i)=>{

            return sousSections.filter((item)=>{
              return data == item.groupe
            })

          })

          let first_item_of_groupe = item_by_groupe.map((items)=>{
            return items[0].nomunique
          })

          console.log("first_item_of_groupe")

          console.log(first_item_of_groupe)

          let ss2 = sousSections.map((item,i)=>{

            let premier = false
            if(first_item_of_groupe.indexOf(item.nomunique) != -1){
              premier = true
            }

            let result = new SousSection(item.nomunique,item.texte,item.vote,premier,item.nomunique.charAt(0),item.groupe,"")

            return result

          })


          //color
          


          
          let dico_groupes_unique = {}
          groupes_unique.map((data,i)=>{

            dico_groupes_unique[data] = i%2

          })

          ss2.map((data,i)=>{
            let modulo2 = i%2
            let colorA = ["White","lightgray"]
            let color = colorA[dico_groupes_unique[""+data.groupe]]

            ss2[i].color = color

          })

          console.log("ss2")
          console.log(ss2)
          let titre_desc = titre.texte;
          let id = titre.nomunique;
          let s = new Section(id, titre_desc, ss2);
          return s;
        });
        /*
      sections.map((section)=>{

        section.printSection()

      })
      */
        return sections;
      }))
    }

   get_projet_de_loi3 = () => {
    return this.googleSheetService.getCooker().pipe(
      map((item: any[]) => {
        console.log(
          '-------------------------------------------------projet_de_loi3!------------'
        );
        console.log(item);

        let titres = item.filter(element => {
          return element.nomunique.charAt(0) == 't';
        });

        let sections = titres.map((titre: any) => {
          let index = titre.nomunique.split('_')[1];
          let sousSections = item.filter(element => {
            let h = element.nomunique.charAt(0) == 't';
            let index_e = element.nomunique.split('_')[1].split('_')[0];
            //console.log(element.nomunique.split('_')[1])
            //console.log(index_e)
            return index == index_e && !h;
          });

          let groupes = sousSections.map((data)=>{
            return ""+data.groupe
          })
          let groupes_unique = this.uniqueArray2(groupes)

          let dico_det_premier = {}
          let item_by_groupe = groupes_unique.map((data,i)=>{

            return sousSections.filter((item)=>{
              return data == item.groupe
            })

          })

          let first_item_of_groupe = item_by_groupe.map((items)=>{
            return items[0].nomunique
          })

          //console.log("first_item_of_groupe")

          //console.log(first_item_of_groupe)

          let ss2 = sousSections.map((item,i)=>{

            let premier = false
            if(first_item_of_groupe.indexOf(item.nomunique) != -1){
              premier = true
            }

            let result = new SousSection(item.nomunique,item.texte,item.vote,premier,item.nomunique.charAt(0),item.groupe,item.type)

            return result

          })


          //color
          


          
          let dico_groupes_unique = {}
          groupes_unique.map((data,i)=>{

            dico_groupes_unique[data] = i%2

          })

          ss2.map((data,i)=>{
            let modulo2 = i%2
            let colorA = ["White","lightgray"]
            let color = colorA[dico_groupes_unique[""+data.groupe]]

            ss2[i].color = color

          })

          //console.log("ss2")
          //console.log(ss2)
          let titre_desc = titre.texte;
          let id = titre.nomunique;
          let s = new Section(id, titre_desc, ss2);
          return s;
        });
        /*
      sections.map((section)=>{

        section.printSection()

      })
      */
        return sections;
      })
      )
    }
   
    uniqueArray2 = (arr)=> {
      var a = [];
      for (var i=0, l=arr.length; i<l; i++)
          if (a.indexOf(arr[i]) === -1 && arr[i] !== '')
              a.push(arr[i]);
      return a;
  }
  get_projet_de_loi = () => {
    return this.http.get('assets/projet_de_loi.json').pipe(
      map((item: any[]) => {
        console.log(
          '-------------------------------------------------projet_de_loi!------------'
        );
        console.log(item);

        let titres = item.filter(element => {
          return element.nom.charAt(0) == 't';
        });

        let sections = titres.map((titre: any) => {
          let index = titre.nom.substring(1);
          let sousSections = item.filter(element => {
            let h = element.nom.charAt(0) == 't';
            let index_e = element.nom.split('_')[0].substring(1);
            return index == index_e && !h;
          });
          let titre_desc = titre.txt;
          let id = titre.nom;
          let s = new Section(id, titre_desc, sousSections);
          return s;
        });
        /*
      sections.map((section)=>{

        section.printSection()

      })
      */
        return sections;
      })
    );
  };

  voir_props = (itemId,userId) => {
    return this.db.object(`propositions/${itemId}/${userId}`).valueChanges();
  };

  get_props = (itemId) => {
    return this.db.object(`propositions/${itemId}`).valueChanges();
  };

  get_items_user_create_if_not = (user: string) => {
    console.log('user');
    console.log(user);
    return this.db
      .object('users/' + user)
      .valueChanges()
      .pipe(
        take(1),
        withLatestFrom(this.get_projet_de_loi()),
        map(([items1, items2]) => {
          console.log('items*');
          console.log(items1);

          if (items1) {
            console.log('items-----');
            return items1;
          } else {
            console.log('items22-----');
            this.db.object('users/' + user).set(items2);
            return items2;
          }
        })
      );
    //this.http.get('assets/projet_de_loi.json').pipe(take(1))
  };

  update = (user, items) => {
    this.db.object('users/' + user).set(items);
  };

  get_user_data = () => {
    return this.db.object('users').valueChanges();
  };

  

  add_items_user = (items: Item[], uid) => {
    let path = 'users/' + uid;
    this.add_items(items, path);
  };

  add_items = (items: Item[], path) => {
    console.log(items);
    this.db.object(path).set({ items: items });
  };

 

  add_one_item_user = (item: Item, uid) => {
    let path = 'users/' + uid + '/data';
    this.add_one_item(item, path);
  };

  add_one_item = (item: Item, path) => {
    this.db
      .object(path)
      .valueChanges()
      .pipe(take(1))
      .subscribe((items: any) => {
        console.log('fromdb : ', items);
        if (!items || items == '' || items == '0') {
          item.id = uuid();
          let my_items = {};
          my_items['dict'] = {};
          my_items['dict']['1'] = item;
          this.db.object(path).set(my_items);
        } else {
          console.log(items);
          let itemsD = items['dict'];
          console.log(itemsD);
          //let my_item = {cards:{}}
          //my_item["cards"]["item1"] = item
          //this.db.object("items").set(my_item)
          item.id = uuid();
          let my_items = {};
          my_items['dict'] = itemsD;
          my_items['dict']['' + item.id] = item;

          this.db.object(path).set(my_items);
        }
      });
  };



  get_items_user = uid => {
    return this.db
      .object('users/' + uid + '/data')
      .valueChanges()
      .pipe(
        map((itemsD: any) => {
          if (itemsD && 'dict' in itemsD) {
            let array = [];
            if (itemsD != '') {
              for (let i of Object.keys(itemsD.dict)) {
                array.push(itemsD.dict[i]);
              }
            }
            return array;
          } else {
            return [];
          }
        }),
        tap(console.log)
      );
  };

 

  remove_by_user = (item: Item, uid) => {
    this.db
      .object('users/' + uid + '/data')
      .valueChanges()
      .pipe(take(1))
      .subscribe((items: any) => {
        items.dict['' + item.id] = null;
        this.db.object('users/' + uid + '/data').update(items);
      });
  };



  getObservable2 = (path) => {
    return this.db.object(path).valueChanges();
  };

 

  getAddOneHour = () => {
    this.heureDispo = this.heureDispo + 1;
    this.heureDispo$.next(String(this.heureDispo));
  };

  changetxt = (txt: string) => {
    this.motAtrouver$.next(String(txt));
  };

  // new Game(GameEasyComponent),


  getProposition = () => {
    return this.getObservable2("/propositions")
  };









}
