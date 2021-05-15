import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Genre } from '../../../models/genre';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-update-genres',
  templateUrl: './update-genres.component.html',
  styleUrls: ['./update-genres.component.css']
})
export class UpdateGenresComponent implements OnInit {
  genres: Genre[];

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });
  error: string;
  message: string;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.storeService.getGenres().subscribe(data => this.genres = data);
  }

  onAddGenre() {
    this.dataService.adminService.addGenre(
      this.form.get('name').value
    ).subscribe((genre: Genre) => {
      this.form.controls['name'].setValue('');
      this.genres.push(genre);
    }, (error: string) => this.error = error)
  }

  onDeleteGenre(id: number) {
    console.log(id);
    this.dataService.adminService.deleteGenre(id).subscribe(() =>
    {
      this.genres.splice(this.genres.findIndex(g => g.genreId == id), 1);
    }, (error: string) => this.error = error);
  }

}
