import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  createPage(): void {

  }

}
