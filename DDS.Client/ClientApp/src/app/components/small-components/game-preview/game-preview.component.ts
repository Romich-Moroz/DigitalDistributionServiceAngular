import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Game } from '../../../models/game';
import { DomSanitizer } from '@angular/platform-browser';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-game-preview',
  templateUrl: './game-preview.component.html',
  styleUrls: ['./game-preview.component.css']
})
export class GamePreviewComponent {
  @Input() game: Game;
  dataService: DataService;

  constructor(dataService: DataService, private sanitizer: DomSanitizer) { this.dataService = dataService; }
}

