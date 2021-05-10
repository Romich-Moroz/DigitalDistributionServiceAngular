import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {

  settingsForm = new FormGroup({
    newPassword: new FormControl('', [Validators.required]),
  });
  error: string;
  message: string;

  constructor(private dataService: DataService) { }

  onChangePassword() {
    this.dataService.accountService.changePassword(
      this.settingsForm.get('newPassword').value
    ).subscribe(() => { this.message="Success!" }, (error: string) => this.error = error)
  }

}
