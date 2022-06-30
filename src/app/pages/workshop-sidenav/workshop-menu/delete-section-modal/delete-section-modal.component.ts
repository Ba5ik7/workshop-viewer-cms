import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-delete-section-modal',
  templateUrl: './delete-section-modal.component.html',
  styleUrls: ['./delete-section-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteSectionModalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
