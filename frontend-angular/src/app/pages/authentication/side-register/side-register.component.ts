import { Component } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { AuthService } from 'src/app/core/identity/service';

@Component({
  selector: 'app-side-register',
  standalone: true,
  imports: [
    RouterModule,
    MaterialModule,
    NgIf,
    NgFor,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './side-register.component.html',
  providers: [AuthService],
})
export class AppSideRegisterComponent {
  options = this.settings.getOptions();
  errors: string[] = [];

  constructor(
    private settings: CoreService,
    private router: Router,
    private authService: AuthService
  ) {}

  form = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    const email = this.form.value.email!;
    const password = this.form.value.password!;
    this.authService
      .register(email, password)
      .forEach((response) => {
        if (response) {
          this.router.navigate(['/starter']);
        }
      })
      .catch((err) => {
        if (err.error) {
          const jsonErrors = JSON.parse(err.error);
          for (const key in jsonErrors.errors) {
            this.errors.push(jsonErrors.errors[key][0]);
          }
          console.log(this.errors);
        }
      });
  }
}
