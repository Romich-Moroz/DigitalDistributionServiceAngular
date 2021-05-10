import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Game } from '../models/game';

@Component({
  selector: 'app-game-preview',
  templateUrl: './game-preview.component.html',
  styleUrls: ['./game-preview.component.css']
})
export class GamePreviewComponent implements OnInit {
  @Input() game: Game;

  ngOnInit() {
    console.log(this.game);
  }

}
