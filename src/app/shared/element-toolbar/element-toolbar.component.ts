import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-element-toolbar',
  templateUrl: './element-toolbar.component.html',
  styleUrls: ['./element-toolbar.component.scss'],
})
export class ElementToolbarComponent implements OnInit {

  @Output() reorderEvent = new EventEmitter<boolean>();
  @Output() addingEvent = new EventEmitter<boolean>();
  
  @Input() addBtnText: string;
  @Input() userId: string;
  @Input() payload: object;
  @Input() adding: boolean;

  @ViewChild('reorderLabel', { read: ElementRef }) reorderLabel: ElementRef;

  reordering = false;

  constructor() { }

  ngOnInit() {}

  triggerReorder(){ 
    this.reordering = !this.reordering;
    this.reorderEvent.next(this.reordering);

    this.reorderLabel.nativeElement.innerText = this.reordering ? 'Done' : 'Reorder'
  }

  triggerAdding(){ this.addingEvent.next(true) }

}
