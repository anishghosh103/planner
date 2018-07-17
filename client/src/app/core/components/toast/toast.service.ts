import { Injectable } from '@angular/core';

export enum ToastActions {
  ERROR, INFO
}

@Injectable()
export class ToastService {

  private listeners = [];

  constructor() { }

  subscribe(listener) {
    this.listeners.push(listener);
  }

  error(title: string, body: string = '') {
    this.listeners.forEach(listener => listener(ToastActions.ERROR, title, body));
  }

  info(title: string, body: string = '') {
    this.listeners.forEach(listener => listener(ToastActions.INFO, title, body));
  }

}
