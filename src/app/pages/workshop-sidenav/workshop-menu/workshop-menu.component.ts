import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'workshop-menu',
  templateUrl: './workshop-menu.component.html',
  styleUrls: ['./workshop-menu.component.scss']
})
export class WorkshopMenuComponent implements OnInit {

  @Input() navList!: any[] | null;
  @Input() section!: string | null;

  constructor(public matDialog: MatDialog) { }

  ngOnInit(): void { }

  deleteSection(navItem: any): void {
    console.log(navItem);    
  }
}
