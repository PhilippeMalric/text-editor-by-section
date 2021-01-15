import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewChild,
  HostListener
} from '@angular/core';
import { Item } from '../table/table.component';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GameService, Section } from '../../services/game.service';
import { take, map, tap } from 'rxjs/operators';
import { NotificationService } from '../../core/core.module';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatGridList } from '@angular/material/grid-list';
import { AngularFireAuth } from '@angular/fire/auth';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'versionOriginale',
  templateUrl: './version_originale.component.html',
  styleUrls: ['./version_originale.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VersionOriginaleComponent implements OnInit {
  @ViewChild('grid') grid: MatGridList;
  @ViewChild('grid_cat') grid_cat: MatGridList;

  cat = 'items';
  sections: Section[];
  item$: BehaviorSubject<Item>;
  item_db: Item[];
  item_i = 0;
  cats = [];

  gridByBreakpoint = {
    xl: 4,
    lg: 4,
    md: 3,
    sm: 2,
    xs: 1
  };

  gridByBreakpointH = {
    xl: 850,
    lg: 600,
    md: 500,
    sm: 500,
    xs: 600
  };

  subscription_db: Subscription;

  uid: string;
  displayName: string;
  sub1: Subscription;

  constructor(
    private http: HttpClient,
    private changeDetectorRef: ChangeDetectorRef,
    private gameService: GameService,
    private notificationService: NotificationService,
    private observableMedia: MediaObserver,
    private ref: ChangeDetectorRef,
    private afAuth: AngularFireAuth
  ) {
    this.cats = this.gameService.cats;
  }

  ngOnInit(): void {
    this.item$ = new BehaviorSubject<Item>(null);
    this.change_cat(this.cats[0]);
    this.sections = [];
    this.sub1 = this.gameService
      .get_projet_de_loi()
      .subscribe((sections: any) => {
        console.log('sections...');
        console.log(sections);
        this.sections = sections;
        this.ref.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
  }

  ngAfterContentInit() {
    this.observableMedia.asObservable().subscribe((change: MediaChange[]) => {
      console.log('change');
      console.log(change);
      //this.grid_cat.cols = this.gridByBreakpoint[change[0].mqAlias] *2

      //this.grid.rowHeight = this.gridByBreakpointH[change[0].mqAlias];
      this.ref.markForCheck();
    });
  }

  onPanLeft = () => {
    console.log('panLeft');
    this.notificationService.info('left');
  };

  onPanRight = () => {
    console.log('onPanRight');
    this.notificationService.info('rigth');
  };

  change_cat = (cat: any) => {
    console.log(cat);
    if (this.subscription_db) {
      this.subscription_db.unsubscribe();
    }
    this.gameService.change_cat('items/' + cat);
    this.subscription_db = this.gameService.get_items().subscribe(items => {
      this.item_db = items;
      console.log(items);
      this.ref.markForCheck();
    });
  };

  upload = () => {
    let items = this.sections;

    this.item$.pipe(take(1)).subscribe((item: Item) => {
      console.log(item, 'item');
      this.gameService.add_one_item_gen(item);
      this.notificationService.info('item added');
    });
  };

  delete_all = () => {
    this.gameService.removeALL();
  };

  delete = item => {
    this.gameService.remove(item);
  };

  probe_db = () => {
    this.gameService.probe_db();
  };

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  page_original = () => {
    let url = 'https://accq.quebec/projet-de-loi';
    window.open(url, '_blank');
  };
}
