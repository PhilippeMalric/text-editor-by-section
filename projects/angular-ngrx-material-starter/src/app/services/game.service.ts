import { Injectable }           from '@angular/core';

import { GameEasyComponent }   from '../components/game/game_easy/gameEasy.component';
import { GameHardComponent } from '../components/game/game_hard/gameHard.component';
import { Game }               from '../components/game/game-item';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Link, Node } from '../d3';
import { Store } from '@ngrx/store';


@Injectable()
export class GameService {
  gameSubscription:Subscription
  games: Game[]
  games$ : BehaviorSubject<Game>
  nom_du_joueur$: BehaviorSubject<String>
  heureDispo:number
  heureDispo$ : BehaviorSubject<String>
  index:number
  motAtrouver$: BehaviorSubject<String>;
  mot: number;
constructor(private store:Store){
  this.index = 0
  this.games$ = new BehaviorSubject<Game>(new Game(GameHardComponent))
  this.games = this.getGames()
  this.heureDispo = 0
  this.heureDispo$ = new BehaviorSubject<String>("0")
  this.mot = 0
  this.motAtrouver$ = new BehaviorSubject<String>("0")
  this.nom_du_joueur$ =  new BehaviorSubject<String>("")
}

link_in = (l1,l2,links) =>{
  for(let link of links){
    if((link.source == l1 && link.target == l2) || link.source == l2 && link.target == l1){
      return true
    }
  }
  return false
}

changeGraph = (id)=>{

}

createGraph = (level:Number)=>{
  let number_of_nodes
  let number_of_links
  switch(level){
    case 1:
      number_of_nodes = Math.floor(Math.random() * 20)+10
      number_of_links = Math.floor(Math.random() * 20)+20
      break;
    case 2:
      number_of_nodes = Math.floor(Math.random() * 30)+50
      number_of_links = Math.floor(Math.random() * 30)+50
      break;
    case 3:
      number_of_nodes = Math.floor(Math.random() * 50)+100
      number_of_links = Math.floor(Math.random() * 50)+200
      break;
  }
  let nodes:Node[] = []

  for(let i = 0 ; i < number_of_nodes; i++){
    nodes.push(new Node(""+i,"",""))
    nodes[i].color2 = "black"
  }


  let links:Link[] = []
  for(let i = 0 ; i < number_of_links; i++){
    let l1 = ""+ Math.floor(Math.random()*number_of_nodes)
    let l2 = ""+ Math.floor(Math.random()*number_of_nodes)
    while(l1 == l2 || this.link_in(l1,l2,links)){
      l2 = ""+ Math.floor(Math.random()*number_of_nodes)
    }
    links.push(new Link(l1,l2,1))
  }

  nodes[0].color2 = "red"
  //nodes[1].color2 = "red"
  //nodes[2].color2 = "red"
  //Link each node to a red one

  for(let node of nodes){
    //1) search if already linked to a red node
    //2) if not add link and go to step 1
    while(!this.is_path_to_red_node_from_node(node.id,nodes,links)){
      let l1 = node.id
      let l2 = ""+ Math.floor(Math.random()*number_of_nodes)
      while(l1 == l2 || this.link_in(l1,l2,links)){
        l2 = ""+ Math.floor(Math.random()*number_of_nodes)
      }
      links.push(new Link(l1,l2,1))
    }
  }

  return {nodes:nodes,links:links}
}

is_path_to_red_node_from_node = (i,nodes,links)=>{
  if(nodes[i].color2 == "red"){
    return true
  }
  //clear flag
  for(let node of nodes){
    node.visited = false;
  }
  // list of node to visit
  nodes[i].visited = true
  let tab = this.get_list_node_from_one_node(i,links,nodes)
  while(tab.length > 0){
    //console.log("tab length before")
    //console.log(tab.length)
    let temp_node = nodes[tab.pop()]
    //console.log("tab length after")
    //console.log(tab.length)
    if(temp_node.color2 == 'red'){
      return true
    }
    else{
      temp_node.visited = true
      tab = tab.concat(this.get_list_node_from_one_node(temp_node.id,links,nodes))
    }
  }
  return false
  //
}
get_list_node_from_one_node(i,links:Link[],nodes:Node[]){
  let final_list = []
  for(let link of links){
    if(link.source == i && !nodes[link.target].visited){
      //console.log("node added")
      //console.log(link.target)
      final_list.push(link.target)

    }
    if(link.target == i && !nodes[link.source].visited){
      //console.log("node added")
      //console.log(link.source)
      final_list.push(link.source)

    }
  }
  //console.log(final_list)
  return final_list
}

getNext = ()=>{
  this.index += 1
  this.games$.next(this.games[this.index % 1])
}

getAddOneHour = ()=>{
  this.heureDispo = this.heureDispo + 1
  this.heureDispo$.next(String(this.heureDispo))
}

changetxt = (txt:string)=>{
  this.motAtrouver$.next(String(txt))
}

  getGames() {
    return [
      new Game(GameHardComponent)
    ];
  }
  // new Game(GameEasyComponent),
}
