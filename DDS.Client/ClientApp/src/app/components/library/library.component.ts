import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ownership } from '../../models/ownership';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  ownerships: Ownership[];
  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.dataService.storeService.getOwnerships().subscribe(data => this.ownerships = data);
  }

}
