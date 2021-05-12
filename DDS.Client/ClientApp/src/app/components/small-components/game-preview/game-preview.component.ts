import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Game } from '../../../models/game';
import { DomSanitizer } from '@angular/platform-browser';
import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-preview',
  templateUrl: './game-preview.component.html',
  styleUrls: ['./game-preview.component.css']
})
export class GamePreviewComponent {
  @Output() deleteEvent = new EventEmitter();
  @Input() game: Game;
  dataService: DataService;
  addedToCart: boolean = false;
  error: string;
  constructor(dataService: DataService, private router: Router) { this.dataService = dataService; }

  onAddToCart(gameId: number) {
    this.dataService.storeService.addToCart(gameId).subscribe(() => { this.addedToCart = true }, (error) => this.error = error);
  }

  onDeleteGame(gameId: number) {
    this.dataService.adminService.deleteGame(gameId).subscribe(() => { this.deleteEvent.emit(null) })
  };
}

