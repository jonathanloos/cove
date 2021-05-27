import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-toolbar',
  templateUrl: './top-toolbar.component.html',
  styleUrls: ['./top-toolbar.component.scss'],
})
export class TopToolbarComponent implements OnInit {

  @Input() pageTitle : string;
  
  constructor() { }

  ngOnInit() {}

}
