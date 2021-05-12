import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Review } from '../../models/review';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  reviews: Review[];


  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router) { }
  error: string;
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let gameId = params['id'];
      this.dataService.storeService.getGameReviews(gameId).subscribe(data => this.reviews = data, error => this.error = error);
    });

  }

}
