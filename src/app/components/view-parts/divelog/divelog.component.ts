
import {Component, Input, OnInit } from '@angular/core';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-divelog',
  templateUrl: './divelog.component.html',
  styleUrls: ['./divelog.component.scss'],
})
export class DivelogComponent implements OnInit {

  @Input() Element: any;
  @Input() User : any
  @Input() UrlSegements : any

  get Divelog(): any { return this._divelog; }
  private _divelog: any;

  constructor() {
   
    
  }
  ngOnInit(): void {
    this._divelog = this.Element
  } 

}
