import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { CreatePageModalComponent } from './create-page-modal/create-page-modal.component';

@Component({
  selector: 'page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageListComponent implements OnInit, OnDestroy {

  destory: Subject<boolean> = new Subject();

  @Input() pages!: any[] | null;
  @Input() currentCategory!: any | null;

  constructor(
    public matDialog: MatDialog,
  ) { }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.destory.next(true);
  }

  createPage(): void {
    this.matDialog.open(CreatePageModalComponent, { width: '400px' });
  }

  editPage(event: Event, category: any): void { }

  deletePage(event: Event, category: any): void { }
}
