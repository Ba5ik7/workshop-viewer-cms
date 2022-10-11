import { CdkPortalOutlet, ComponentPortal, DomPortalOutlet } from '@angular/cdk/portal';
import {
  ApplicationRef,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  SecurityContext,
  ViewContainerRef
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxEditorjsOutputBlock } from '@tmdjr/ngx-editorjs';
import { Subject, takeUntil } from 'rxjs';
import { WorkshopEditorService } from 'src/app/pages/workshop-editor/workshop-editor.service';
import { WorkshopDocument } from '../../interfaces/workshop-document.interface';
import { CodeHighlighterComponent } from '../code-highlighter/code-highlighter.component';
import { LiveExampleComponent } from './live-example/live-example.component';
import { NextPageComponent } from './next-page/next-page.component';
import { WorkshopViewerService } from './workshop-viewer.service';


@Component({
  selector: 'workshop-viewer-terrence-dusell',
  templateUrl: './workshop-viewer.component.html',
  styleUrls: ['./workshop-viewer.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class WorkshopViewerComponent implements OnInit, OnDestroy {

  // inputData: NgxEditorjsOutputBlock[] = [
  //       {
  //           "blockId": "omjeg3pqs9b",
  //           "sortIndex": 0,
  //           "name": "NgxEditorjsHeaderBlockMediator",
  //           "dataClean": "Property binding best practices"
  //       },
  //       {
  //           "blockId": "0kkhc0mkafil",
  //           "sortIndex": 1,
  //           "name": "NgxEditorjsParagraphBlockMediator",
  //           "dataClean": "By following a few guidelines, you can use property binding in a way that helps you minimize bugs and keep your code readable."
  //       },
  //       {
  //           "blockId": "ytux2n7f9u",
  //           "sortIndex": 2,
  //           "name": "NgxEditorjsBlockquotesBlockMediator",
  //           "dataClean": "See the live example / download example for a working example containing the code snippets in this guide."
  //       },
  //       {
  //           "blockId": "saynp14rtp",
  //           "sortIndex": 3,
  //           "name": "NgxEditorjsHeaderBlockMediator",
  //           "dataClean": "Avoid side effects"
  //       },
  //       {
  //           "blockId": "j80pzv898",
  //           "sortIndex": 4,
  //           "name": "NgxEditorjsParagraphBlockMediator",
  //           "dataClean": "Evaluation of a template expression should have no visible side effects. Use the syntax for template expressions to help avoid side effects. In general, the correct syntax prevents you from assigning a value to anything in a property binding expression. The syntax also prevents you from using increment and decrement operators."
  //       }
  //   ];

  currentDocument!: string

  pageNotFound:boolean =  false;

  @Input('workshopDocument')
  set workshopDocument(currentDocument: string | null) {
    // Null start :(
    if(currentDocument === null || currentDocument === undefined) {
      this.pageNotFound = true;
      return;
    }
    this.currentDocument = currentDocument
    this.fetchWorkshopDocuments();
  }
  
  destory: Subject<boolean> = new Subject();

  private static initExampleViewer(exampleViewerComponent: LiveExampleComponent,
    example: string,
    file: string | null,
    region: string | null) {
    exampleViewerComponent.example = example;
    if (file) {
      // if the html div has field `file` then it should be in compact view to show the code
      // snippet
      exampleViewerComponent.view = 'snippet';
      exampleViewerComponent.showCompactToggle = true;
      exampleViewerComponent.file = file;
      if (region) {
        // `region` should only exist when `file` exists but not vice versa
        // It is valid for embedded example snippets to show the whole file (esp short files)
        exampleViewerComponent.region = region;
      }
    } else {
      // otherwise it is an embedded demo
      exampleViewerComponent.view = 'demo';
    }
  }

  dataHtml!: string;

  blocks!: NgxEditorjsOutputBlock[];

  constructor(
    private appRef: ApplicationRef,
    private injector: Injector,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private workshopViewerService: WorkshopViewerService,
    private workshopEditorService: WorkshopEditorService,
    private elementRef: ElementRef,
    private domSanitizer: DomSanitizer
    ) { }

  ngOnInit(): void { }

  private fetchWorkshopDocuments():void {
    this.workshopViewerService.fetchWorkshop(`/api/workshop/${this.currentDocument}`)
    .pipe(takeUntil(this.destory))
    .subscribe((data) => {
      this.correctUrlPaths(data);
      this.blocks = JSON.parse(data.html);      
      // this.elementRef.nativeElement.innerHTML = data.html;
      // this.loadLiveExamples('workshop-live-example', LiveExampleComponent);
      // this.loadCodeHighlighter('code-highlighter', CodeHighlighterComponent);
      // this.loadNextPage();
    });
  }

  private correctUrlPaths(data: WorkshopDocument): void {
    data.html = data.html.replace(/href="#([^"]*)"/g, (_m: string, fragmentUrl: string) => {
      const absoluteUrl = `${location.pathname}#${fragmentUrl}`;
      return `href="${this.domSanitizer.sanitize(SecurityContext.URL, absoluteUrl)}"`;
    });
  }

  private loadLiveExamples(componentName: string, componentClass: any): void {
    const exampleElements = this.elementRef.nativeElement.querySelectorAll(`[${componentName}]`);
    [...exampleElements].forEach((element: Element) => {
      const example = element.getAttribute(componentName);
      const region = element.getAttribute('region');
      const file = element.getAttribute('file');
      const portalHost = new DomPortalOutlet(element, this.componentFactoryResolver, this.appRef, this.injector);
      const examplePortal = new ComponentPortal(componentClass, this.viewContainerRef);
      const exampleViewer = portalHost.attach(examplePortal);
      const exampleViewerComponent = exampleViewer.instance as LiveExampleComponent;
      if (example !== null) {
        WorkshopViewerComponent.initExampleViewer(exampleViewerComponent, example, file, region);
      }
    });
  }

  private loadCodeHighlighter(componentName: string, componentClass: any): void {
    const highlightJsElements = this.elementRef.nativeElement.querySelectorAll(`[${componentName}]`);
    [...highlightJsElements].forEach((element: Element) => {
      // const textContent = element.textContent;
      const code = element.getAttribute('code');
      const portalHost = new DomPortalOutlet(element, this.componentFactoryResolver, this.appRef, this.injector);
      const highlightJsPortal = new ComponentPortal(componentClass, this.viewContainerRef);
      const highlightJsViewer = portalHost.attach(highlightJsPortal);
      const highlightJsComponent = highlightJsViewer.instance as CodeHighlighterComponent;
      highlightJsComponent.code = code ?? '';      
    });
  }

  private loadNextPage() {
    const nextPageElements = this.elementRef.nativeElement.querySelectorAll('next-page');
    [...nextPageElements].forEach((element: Element) => {
      const portalHost = new DomPortalOutlet(element, this.componentFactoryResolver, this.appRef, this.injector);
      const nextPagePortal = new ComponentPortal(NextPageComponent, this.viewContainerRef);
      const nextPageViewer = portalHost.attach(nextPagePortal);

      const nextPageComponent = nextPageViewer.instance as NextPageComponent;
      nextPageComponent.title = element.getAttribute('title') ?? 'Missing Title';
      nextPageComponent.icon =  element.getAttribute('icon') ?? '';
      nextPageComponent.clickEvent = element.getAttribute('click-event') ?? '';
      nextPageComponent.nextClick
      .pipe(takeUntil(this.destory))
      .subscribe((event => {
        // TODO setup real pagnation
        console.log(event);
        console.log('62aa78b1e0c43119ba4c2acc');
        this.workshopDocument = '62aa78b1e0c43119ba4c2acc';
      }))
    });
  }

  ngOnDestroy(): void {
    this.destory.next(true);
  }


  requestValue = this.workshopEditorService.saveEditorDataSubject;
  valueRequested(value: any): void {
    console.log({ value });
    this.workshopEditorService.savePageHTML(JSON.stringify(value), this.currentDocument);
  }
}
