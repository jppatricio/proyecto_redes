import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  classApplied = false;
  selectedPage = 1;

  constructor() { }

  ngOnInit(): void {
  }

  toggleClass(){
    this.classApplied = !this.classApplied;
  }

}
