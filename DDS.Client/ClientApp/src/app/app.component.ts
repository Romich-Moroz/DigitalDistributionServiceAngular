import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './services/data.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Digital Distribution Service';
  dataService: DataService;

  constructor(public translate: TranslateService, dataService: DataService, private router: Router)
  {
    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang('en');
    this.dataService = dataService;
    this.dataService.authService.check();
  }
  ngOnInit(): void {
      this.router.navigate["/catalog"];
    }

  onSignOut() {
    this.dataService.authService.logout().subscribe(() =>
    {
      this.dataService.authService.currentUser = null;
      this.router.navigate(["/catalog"]);
    });
  }

  switchLang(lang: string) {
    console.log(lang);
    this.translate.use(lang);
  }

}
