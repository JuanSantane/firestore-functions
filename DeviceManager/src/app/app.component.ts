import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  showNotification(from, align) {
    const type = ['', 'info', 'success', 'warning', 'danger'];
    const color = Math.floor((Math.random() * 4) + 1);
  }
}
