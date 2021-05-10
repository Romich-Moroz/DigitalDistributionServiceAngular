import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { User } from '../models/user';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent {
  recoveryForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(36), Validators.maxLength(36)]),
  });
  error: string;
  message: string;

  constructor(private dataService: DataService, private router: Router) { }

  onRequest() {
    this.dataService.authService.restore(
      this.recoveryForm.get('email').value
    ).subscribe(() => { this.message = "Enter recieved code below" }, (error: string) => this.error = error)
  }

  onSubmit() {
    this.dataService.authService.confirm(
      this.recoveryForm.get('password').value
    ).subscribe((data: User) => {
      this.dataService.authService.currentUser = data;
      this.router.navigate(["/account"])
    }, (error: string) => this.error = error)
  }

}
