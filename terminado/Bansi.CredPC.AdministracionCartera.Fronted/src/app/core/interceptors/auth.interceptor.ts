import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '@services/security-services/auth.service';
import { switchMap } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn) => {
  const cookieService = inject(CookieService);
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getContextToken();

  if (token) {

    //Decodificar el token y comprobar la fecha de expiración
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirationMs = payload.exp * 1000;

    const expirationDate = new Date(expirationMs);
    console.log('📅 Expiración del token:', expirationDate.toLocaleString());

    if (req.url.includes('RefreshUserApplicationToken')) {

      return next(req);
    }

    if (token && authService.isExpired(token)) {
      // Token expirado
      sessionStorage.clear();
      cookieService.delete('Authorization', '/');

      AlertaError("Sesión expirada");

      router.navigate(['/home/login']);
      return next(req);
    }

    if (token && authService.isAboutToExpire(token)) {
      // Token por expirar -> refrescar primero
      return authService.refreshToken().pipe(
        switchMap((newToken) => {
          const cloned = addToken(req, newToken);
          return next(cloned);
        })
      );
    }
  } else {
    console.log("no hay token");
  }

  return next(addToken(req, token));
};

function addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
  return req.clone({
    setHeaders: {
      Authorization: `${token}`
    }
  });
}

function AlertaError(mensaje: string): void {
  Swal.fire({
    title: 'HA OCURRIDO UN ERROR',
    text: mensaje,
    icon: 'error',
  });
}