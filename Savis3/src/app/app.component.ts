import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  template: `
  <div>
    {{ message }}
  <div>
  `
})
export class AppComponent implements OnInit {
  title = 'Savis3';
  message = '';

  constructor(private dataService: DataService) {}

  ngOnInit() {
      this.dataService.getTestData().subscribe(data => {
        this.message = data.message
      })
  }
}
