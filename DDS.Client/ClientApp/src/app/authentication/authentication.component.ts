import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

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
    this.dataService.authenticate(
      this.authenticationForm.get('email').value,
      this.authenticationForm.get('password').value
    ).subscribe(() => { this.router.navigate(["/catalog"]) }, (error: string) => this.error = error)
  }
}
