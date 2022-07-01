import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-section-modal',
  templateUrl: './create-section-modal.component.html',
  styleUrls: ['./create-section-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateSectionModalComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<CreateSectionModalComponent>) { }

  ngOnInit(): void {
  }

  createSection() {
    console.log('Create section');
    this.dialogRef.close();
  }
}
