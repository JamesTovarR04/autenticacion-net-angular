import { Component } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/core/identity/service';

@Component({
  selector: 'app-side-login',
  standalone: true,
  imports: [
    RouterModule,
    MaterialModule,
    NgIf,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './side-login.component.html',
  providers: [AuthService],
})
export class AppSideLoginComponent {
  options = this.settings.getOptions();
  msg = '';
  constructor(
    private settings: CoreService,
    private routes: Router,
    private service: AuthService
  ) {}

  check(uname: string, p: string) {
    this.service
      .signIn(uname, p)
      .forEach((response) => {
        if (response) {
          this.routes.navigate(['/starter']);
        }
      })
      .catch((_) => {
        this.msg = 'Invalid username or password';
      });
  }
}
