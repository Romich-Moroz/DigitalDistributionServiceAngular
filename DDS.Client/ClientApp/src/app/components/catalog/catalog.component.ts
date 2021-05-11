import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Game } from '../../models/game';
import { Genre } from '../../models/genre';
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
  genres: Genre[];

  searchForm = new FormGroup({
    name: new FormControl('', Validators.required),
    genreId: new FormControl('', Validators.required),
    minPrice: new FormControl('', Validators.required),
    maxPrice: new FormControl('', Validators.required),
  });

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.dataService.storeService.getGenres().subscribe(data => this.genres = data);
    this.onSubmit(1);
  }

  onSubmit(page : number) {
    this.dataService.storeService.getGames
      (
        page,
        this.pageSize,
        this.searchForm.controls["name"].invalid ? '' : this.searchForm.controls["name"].value,
        this.searchForm.controls["minPrice"].invalid ? 0 : this.searchForm.controls["minPrice"].value,
        this.searchForm.controls["maxPrice"].invalid ? 0 : this.searchForm.controls["maxPrice"].value,
        this.searchForm.controls["genreId"].invalid ? 0 : this.searchForm.controls["genreId"].value,
      ).subscribe(data => {
      this.page = data;
    });
  }

  createRange(number) {
    var items: number[] = [];
    for (var i = 1; i <= number; i++) {
      items.push(i);
    }
    return items;
  }

}
