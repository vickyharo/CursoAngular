import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    stat: RouterStateSnapshot
  ): boolean | Observable<boolean>{
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/sign-in']); // Redirige al login si no está autenticado
      return false;
    }

    const userPermissions = this.authService.getUserPermissions();
    const url = stat.url.startsWith('/') ? stat.url.substring(1) : stat.url;
    if (!userPermissions.includes(url)){
      this.router.navigate(['/Access-Denied']);
      return false;
    }
    return true;
  }
}
