import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Digital Distribution Service';
  dataService: DataService;

  constructor(dataService: DataService, private router: Router)
  {
    this.dataService = dataService;
    this.dataService.authService.check();
  }

  onSignOut() {
    this.dataService.authService.logout().subscribe(() =>
    {
      this.dataService.authService.currentUser = null;
      this.router.navigate(["/catalog"]);
    });
  }

}
