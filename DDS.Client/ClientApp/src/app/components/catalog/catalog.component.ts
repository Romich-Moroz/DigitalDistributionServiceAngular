import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from '../../models/game';
import { Page } from '../../models/page';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  page: Page<Game>;
  pageSize: number = 5;
  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.dataService.storeService.getGames(1, this.pageSize).subscribe(data =>
    {
      this.page = data;
    });
  }

}
