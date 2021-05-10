import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../models/user';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent {
  authenticationForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  error: string;

  constructor(private dataService: DataService, private router: Router) { }

  onSubmit() {
    this.dataService.authService.authenticate(
      this.authenticationForm.get('email').value,
      this.authenticationForm.get('password').value
    ).subscribe((data: User) =>
    {
      console.log(this.dataService.authService.currentUser);
      this.dataService.authService.currentUser = data;
      this.router.navigate(["/catalog"])
    }, (error: string) => this.error = error)
  }
}
