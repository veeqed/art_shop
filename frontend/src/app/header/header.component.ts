import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  menuWidth = '0px';

  constructor() {

  }

  public openMenu() {
    this.menuWidth = "250px";
  }

  public closeMenu() {
    this.menuWidth = "0px";
  }

}
