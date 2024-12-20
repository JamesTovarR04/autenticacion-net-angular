import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthRedirectGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    return this.isSignedIn();
  }

  isSignedIn(): Observable<boolean> {
    return this.authService.isSignedIn().pipe(
      map((isSignedIn) => {
        if (isSignedIn) {
          this.router.navigate(['/starter']);
          return false;
        }
        return true;
      })
    );
  }
}
