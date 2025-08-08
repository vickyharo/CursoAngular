import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@services/security-services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, stat: RouterStateSnapshot): boolean | Observable<boolean> {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/home/login']); // Redirige al login si no está autenticado
      return false;
    }
    const userPermissions = this.authService.getUserPermissions();
    if (!userPermissions.includes(stat.url)) {
      this.router.navigate(['/home/access-denied']);
      return false;
    }
    return true;
  }
}

/**
 * Permisos especiales a los botones de accion de los formularios
 */
export class ComprobarPermisosEspecialesBotones {
  constructor(private authService: AuthService) { }

  tienePermiso(accesoBoton: string): boolean {
    const userPermissions = this.authService.getUserPermissions();

    if (!userPermissions.includes(accesoBoton)) {
      return false;
    }

    return true;
  }
}
