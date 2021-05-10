import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Game } from '../../../models/game';
import { GameGenre } from '../../../models/gameGenre';
import { Genre } from '../../../models/genre';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-update-game',
  templateUrl: './update-game.component.html',
  styleUrls: ['./update-game.component.css']
})
export class UpdateGameComponent implements OnInit {
  @Input() game: Game = null;
  leftoverGenres: Genre[];
  imageFile: File;

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    developer: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
  });
  formGenre = new FormGroup({
    name: new FormControl('', [Validators.required]),
    selectedGenre: new FormControl('', [Validators.required])
  });


  error: string;
  message: string;

  constructor(private dataService: DataService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.dataService.storeService.getGenres().subscribe(data => this.leftoverGenres = data);
    this.route.params.subscribe(params => {
      let id = params['id'];
      if (id == 0) {
        this.game = new Game();
        this.game.gameId = 0;
      }
      else {
        this.dataService.storeService.getGame(id).subscribe(data =>
        {
          this.game = data;
          for (var i = 0; i < this.game.gameGenres.length; i++) {
            this.leftoverGenres.splice(this.leftoverGenres.findIndex(g => g.genreId == this.game.gameGenres[i].genreId), 1);
          }
        });
      }
    });
    
  }

  onSubmit() {
    if (this.game == null || this.game.gameId == 0) {
      this.dataService.adminService.addGame(
        this.form.get('name').value,
        this.form.get('developer').value,
        this.form.get('description').value,
        this.form.get('price').value,
        this.imageFile
      ).subscribe((data: Game) => {
        this.game = data;
        this.message = "Game was added to catalog"
      }, (error: string) => this.error = error)
    }
    else {
      this.dataService.adminService.updateGame(
        this.game.gameId,
        this.form.get('name').value,
        this.form.get('developer').value,
        this.form.get('description').value,
        this.form.get('price').value,
        this.imageFile
      ).subscribe((data: Game) => {
        this.game = data;
        this.message = "Game was updated"
      }, (error: string) => this.error = error)
    }
  }

  onDeleteGameGenre(gameId: number, genreId: number) {
    this.dataService.adminService.deleteGameGenre(gameId, genreId).subscribe(() => {
      var genre = this.game.gameGenres.find(g => g.genreId == genreId).genre;
      this.game.gameGenres.splice(this.game.gameGenres.findIndex(g => g.genreId == genre.genreId), 1);
      this.leftoverGenres.push(genre);
    });
  }

  onAddGameGenre(gameId: number, genreId: number) {
    this.dataService.adminService.addGameGenre(gameId, genreId).subscribe(() =>
    {
      var genre = this.leftoverGenres.find(g => g.genreId == genreId);
      this.leftoverGenres.splice(this.leftoverGenres.findIndex(g => g.genreId == genre.genreId), 1);
      this.game.gameGenres.push(new GameGenre(genre.genreId, gameId, genre));
    })
  }

  handleFileInput(files: FileList) {
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.game.image = reader.result.toString().split(',')[1];
    }
    this.imageFile = files.item(0);
  }

}
