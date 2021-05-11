import { Component, Input, OnInit } from '@angular/core';
import { Review } from '../../../models/review';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent {
  @Input() review: Review;
  error: string;
  constructor(private dataService: DataService) { }

}
