import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationHistoryService {
  private history: string[] = [];

  constructor(private router: Router) {}

  pushUrl(url: string) {
    this.history.push(url);
  }

  popUrl() {
    return this.history.pop();
  }

  getCurrentUrl() {
    return this.history[this.history.length - 1];
  }
}