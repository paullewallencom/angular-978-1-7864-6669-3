import { Component, ElementRef, OnInit } from '@angular/core';
import * as D3 from 'd3/index';

@Component({
  selector: 'app-root',
  template: '<ng-content></ng-content>',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  errorMessage: string;
  host;
  svg;

  constructor (private element: ElementRef) {
    this.host = D3.select(this.element.nativeElement);
  }

  ngOnInit() {
    this.buildSVG();
  }

  buildSVG(): void {
    this.host.html('');
    this.svg = this.host.append('svg')
      .attr('width', '600')
      .attr('height', '400')
      .style('background-color', 'blue');
  }
}
