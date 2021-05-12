import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Review } from '../../../models/review';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-update-review',
  templateUrl: './update-review.component.html',
  styleUrls: ['./update-review.component.css']
})
export class UpdateReviewComponent implements OnInit {
  review: Review = null;

  form = new FormGroup({
    rating: new FormControl('', [Validators.required]),
    comment: new FormControl('', [Validators.required]),
  });

  error: string;
  message: string;

  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let ownershipId = params['id'];
      this.dataService.storeService.getReview(ownershipId).subscribe(data =>
      {
        this.review = data;
        if (this.review == null)
          this.review = new Review(0, ownershipId);
      }, error => this.error = error);
    });
    
  }

  onSubmit() {
    if (this.review.reviewId == 0) {
      this.dataService.storeService.addReview(
        this.review.ownershipId,
        this.form.get('rating').value,
        this.form.get('comment').value
      ).subscribe((data) => {
        this.message = "Review was added"
        this.review = data;
      }, (error: string) => this.error = error)
    }
    else {
      this.dataService.storeService.updateReview(
        this.review.ownershipId,
        this.review.reviewId,
        this.form.get('rating').value,
        this.form.get('comment').value
      ).subscribe(() => {
        this.message = "Review was updated"
      }, (error: string) => this.error = error)
    }
  }

  onReviewDelete() {
    this.dataService.storeService.deleteReview(this.review.ownershipId, this.review.reviewId).subscribe(() => {
      this.router.navigate(["/library"]);
    }, error => this.error = error);
  }

}
