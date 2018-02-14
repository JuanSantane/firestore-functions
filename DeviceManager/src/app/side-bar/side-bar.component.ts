import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  sections = [
    { name: 'dashboard', route: 'dashboard', icon: 'dashboard' },
    { name: 'user', route: 'home', icon: 'person' },
    { name: 'table', route: 'dashboard', icon: 'content_paste' },
    { name: 'Typography', route: '/dashboard', icon: 'library_books' },
    { name: 'maps', route: '/dashboard', icon: 'location_on' },
    { name: 'notifications', route: '/dashboard', icon: 'notifications' },
    { name: 'user', route: '/dashboard', icon: 'person' }
  ];

  open = true;


  constructor() { }

  ngOnInit() {
  }


}
