import { Component, Input, OnInit } from "@angular/core";

@Component({ selector: 'element-collection', styleUrls: ['../../self-description-browser.component.scss'], templateUrl: './info-view-template.component.html' })

export class InfoViewTemplate<T extends Object> implements OnInit {

  @Input() name: string = "";
  @Input() element?: T;

  ngOnInit() { }

}
