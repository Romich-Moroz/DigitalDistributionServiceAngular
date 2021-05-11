import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Digital Distribution Service';
  dataService: DataService;

  siteLanguage: string = 'English';
  siteLocale: string;
  languageList = [
    { code: 'en', label: 'English' },
    { code: 'ru', label: 'Русский' }
  ];

  constructor(dataService: DataService, private router: Router)
  {
    this.dataService = dataService;
    this.dataService.authService.check();
  }

  ngOnInit() {
    this.siteLocale = window.location.pathname.split('/')[1];
    this.siteLanguage = this.languageList.find(f => f.code === this.siteLocale).label;
  }

  onSignOut() {
    this.dataService.authService.logout().subscribe(() =>
    {
      this.dataService.authService.currentUser = null;
      this.router.navigate(["/catalog"]);
    });
  }

}
