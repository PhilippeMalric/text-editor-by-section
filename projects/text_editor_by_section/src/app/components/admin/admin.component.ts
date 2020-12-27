import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { GameService } from '../../services/game.service';
import { take } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { Item } from '../table/table.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'anms-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  textName: any;
  dataSource: MatTableDataSource<String>;
  users: String[];
  displayedColumns: string[] = ['name', 'button1'];
  sub1: Subscription;

  constructor(private gameService: GameService) {}

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
  }

  ngOnInit(): void {
    this.gameService.textName.subscribe(name => {
      this.textName = name;
      console.log('textName');
      console.log(this.textName);
    });

    this.sub1 = this.gameService.get_user_data().subscribe((items: any) => {
      console.log('items');
      console.log(items);
      this.users = Object.keys(items);
      this.dataSource = new MatTableDataSource<String>(this.users);
      console.log('users');
      console.log(this.users);
    });
  }

  delete(name: string) {
    this.gameService.delete(name);
  }

  set_pl_as_main_text = () => {
    this.gameService.get_projet_de_loi().subscribe(text => {
      this.gameService.set_text_courant(text);
    });
  };
}
