import { Component } from '@angular/core';

@Component({
  selector: 'd3-app',
  template: `
    <div [style.background]="backgroundColor">
      <h2>Hello, world! I'm learning {{course}} and my favorite color is <span [style.color]="favoriteColor">{{favoriteColor}}</span>.</h2>
      <label>Enter favorite color: </label><input type="text" [(ngModel)]="favoriteColor">
      <button (click)="changeBackgroundColor()">Change background color</button>
    </div>  
    `
})

export class AppComponent {
  backgroundColor = 'white';
  course = 'Angular 2';
  favoriteColor = 'black';

  changeBackgroundColor() {
    this.backgroundColor = this.backgroundColor === 'white' ? 'grey' : 'white';
  }
}
