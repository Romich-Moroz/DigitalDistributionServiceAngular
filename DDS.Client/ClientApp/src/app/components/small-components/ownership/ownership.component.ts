import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../../../models/game';
import { Ownership } from '../../../models/ownership';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-ownership',
  templateUrl: './ownership.component.html',
  styleUrls: ['./ownership.component.css']
})
export class OwnershipComponent {
  @Input() ownership: Ownership;
  dataService: DataService;
  constructor(dataService: DataService) { this.dataService = dataService; }

  onUpdateReview

}
