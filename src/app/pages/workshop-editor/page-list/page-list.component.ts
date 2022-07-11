import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageListComponent implements OnInit {

  @Input() pages!: any[] | null;

  constructor() { }

  ngOnInit(): void { }

  createPage(): void { }

  editPage(event: Event, category: any): void { }

  deletePage(event: Event, category: any): void { }
}
