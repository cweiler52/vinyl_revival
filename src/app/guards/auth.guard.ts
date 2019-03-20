import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DatabaseService } from '../database.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  auth = this.dbService.getCookies();

  constructor(private dbService: DatabaseService, private router: Router) { }

  canActivate (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(next.data[0] === 'user'){
        //this.router.navigate(['/dashboard']);
        if(!this.auth.is_admin) {
          return true;
        }else{
          this.router.navigate(['/']);
        }
        return false;

      }else if(next.data[0] === 'admin'){
        if(this.auth.is_admin) {
          return true;
        }else{
          this.router.navigate(['/']);
        }
        return false;
      }
    }
}
