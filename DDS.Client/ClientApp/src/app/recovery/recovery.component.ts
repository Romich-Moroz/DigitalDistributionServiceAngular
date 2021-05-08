import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent {
  recoveryForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  onRequest() {
    // TODO: Use EventEmitter with form value
    console.warn(this.recoveryForm.value);
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.recoveryForm.value);
  }

}
