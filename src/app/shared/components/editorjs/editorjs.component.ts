import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import EditorJS from '@editorjs/editorjs';
import { debounceTime, Observable, skip, Subject, takeUntil } from 'rxjs';
import { editorjsConfig } from './editorjs.config';

@Component({
  selector: 'editorjs',
  templateUrl: './editorjs.component.html',
  styleUrls: ['./editorjs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorjsComponent implements OnInit, OnDestroy {

  destory: Subject<boolean> = new Subject();

  editorData: any;
  editor!: EditorJS;
  editorObserver!: MutationObserver;

  constructor() { }

  ngOnInit(): void {
    this.editor = new EditorJS(editorjsConfig) 
  }

  ngOnDestroy(): void {
    this.destory.next(true);
  }

  saveEditorData() : void {
    this.editor.save().then((outputData) => {
      this.editorData =  JSON.stringify(outputData, null, 2);
    })
  }
}
