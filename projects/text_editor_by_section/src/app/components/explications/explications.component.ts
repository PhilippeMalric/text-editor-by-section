import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'anms-explications',
  templateUrl: './explications.component.html',
  styleUrls: ['./explications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExplicationsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
