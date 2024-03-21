import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private _items: { icon: string }[] = [];

  constructor() {

    this._items = JSON.parse(localStorage.getItem('items') ||'[]'); // get the data at lunch 
  }

  remove(item: any) {
    const index = this._items.indexOf(item);
    this._items.splice(index,1);
    this.syncItems();
  }

  add(item: any) { 
     this._items.push(item);
     this.syncItems();
  }

  get length() : number{
    return this._items.length
  }

  get items(){
    return this._items.slice(0)
  }

  syncItems(){
    localStorage.setItem('items',JSON.stringify(this._items)); // sync the data

  }
}
