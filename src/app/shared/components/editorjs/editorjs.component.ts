import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import EditorJS from '@editorjs/editorjs';
import { debounceTime, Observable, skip, Subject, takeUntil } from 'rxjs';
import { WorkshopEditorService } from 'src/app/pages/workshop-editor/workshop-editor.service';
import { editorjsConfig } from './editorjs.config';

@Component({
  selector: 'editorjs',
  templateUrl: './editorjs.component.html',
  styleUrls: ['./editorjs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class EditorjsComponent implements OnInit, OnDestroy {

  destory: Subject<boolean> = new Subject();

  @Input() set dataHtml(dataHtml: string) {
    if(dataHtml) this.renderData(dataHtml);
  }

  @Output('saveEditorData') saveEditorDataEmitter: EventEmitter<string> = new EventEmitter();

  editorData: any;
  editor!: EditorJS;
  // editorObserver!: MutationObserver;

  constructor(public workshopEditorService: WorkshopEditorService) { }
  
  ngOnInit(): void {
    this.workshopEditorService.saveEditorData$
    .pipe(takeUntil(this.destory))
    .subscribe(() => this.saveEditorData()); 
  }

  ngOnDestroy(): void {
    this.editor.destroy();
    this.destory.next(true);
  }

  saveEditorData() : void {
    this.editor.save()
    .then((outputData) => this.saveEditorDataEmitter.emit(JSON.stringify(outputData)));
  }

  async renderData(dataHtml:string) {
    this.editor = new EditorJS(editorjsConfig);
    await this.editor.isReady;
    this.editor.render(JSON.parse(dataHtml));
  }
}