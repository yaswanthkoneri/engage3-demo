import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { EndPoint } from '../../apiUrl';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient, private router: Router) { }

  login(user) {
    return this.http.post<any>(EndPoint.HOST_URL + 'users/login', user).pipe(map(data => {
     return data;
      }
    ));
  }
  finishAuthentication(): void {
    this.router.navigateByUrl('/admin/jobs');
  }

  isAuthenticated(): boolean {
    if (JSON.parse(localStorage.getItem('currentUser'))) {
      return true;
    } else {
      return false;
    }
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['login']);
    }
  }
}
