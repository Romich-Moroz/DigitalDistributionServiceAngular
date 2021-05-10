import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registrationForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  error: string;

  constructor(private dataService: DataService, private router: Router) { }

  onSubmit() {
    this.dataService.register(
      this.registrationForm.get('email').value,
      this.registrationForm.get('password').value
    ).subscribe(() => { this.router.navigate(["/authentication"]) }, (error: string) => this.error = error)
  }
}
