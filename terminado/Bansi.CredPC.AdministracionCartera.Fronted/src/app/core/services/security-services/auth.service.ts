import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, from, map, tap, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

//->Environments
import { environment } from '@environments/environment';

//->Models
import { SecurityJwt } from '@models/security-models/SecurityJwt';
import { LoginResponse } from '@models/security-models/LoginResponse';
import { LoginRequest } from '@models/security-models/LoginRequest';
import { LogoutResponse } from '@models/security-models/LogoutResponse';
import { TokenRefreshResponse } from '@models/security-models/TokenRefreshResponse';
import { FechasVersionResposne } from '@models/security-models/FechasVersionResponse';
import { ConfirmPasswordRequest } from '@models/security-models/ConfirmPasswordRequest';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  USER_ID = 'SecurityUser';
  contextToken: string = '';
  http = inject(HttpClient);
  private apiUrl: string = `${environment.apiUrlAdministracionCarteraSecurity}/Security/`;
  private refreshInterval: any;
  private _userPermissions: string[] = [];
  private _cookieService = inject(CookieService);

  constructor() { }

  setSecurityUserInformation(user: SecurityJwt) {
    if (!user) return;

    sessionStorage.setItem(user.name, user.value);
  }

  /**
  * Envia una petición tipo POST con JSON
  * @param {string} endpoint Endpoint de la petición
  * @param {any} data Información que se enviará
  * @returns
  */
  postLogin(endpoint: string, request: LoginRequest) {
    let headers: Record<string, string> = { 'Content-Type': 'application/json' };
    let token = this.getContextToken();

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    return this.http.post<LoginResponse>(this.apiUrl + `${endpoint}`, request)
      .pipe(
        catchError((error) => {
          console.log('Error: realizar login ' + error.message);
          return throwError(() => new Error('Error al realizar el login'));
        })
      )
  }

  getContextToken(): any | null {
    return this._cookieService.get('Authorization');
  }



  /**
   * valida el usuario y contraseña del usuario que se está logueando
   * @param login
   * @returns
   */
  login(login: any): Observable<LoginResponse> {
    // Llama al método postLogin y devuelve un Observable
    const endpoint = 'LoginUserApplication';
    const observable = this.postLogin(endpoint, login);

    return from(observable).pipe(
      catchError((error) => {
        console.error('Error en la petición de login:', error);
        return throwError(() => error); // Lanza el error para que el bloque "error" en el subscribe lo capture
      })
    );
  }

  /**
   * Envía una petición POST para el cierre de sesión
   * @param endpoint
   * @returns
   */
  postLogout(endpoint: string) {
    const sessionToken = this.getContextToken();
    const headers = new HttpHeaders({
      'Authorization': sessionToken
    });
    return this.http.post<LogoutResponse>(this.apiUrl + `${endpoint}`, null, { headers });
  }

  /**
   * Realiza el request para el cierre de sesión
   * @returns
   */
  logout(): Observable<LogoutResponse> {
    return from(this.postLogout('LogoutUserApplication')).pipe(
      tap(() => {
        // Si la promesa se resuelve correctamente, elimina el token del almacenamiento
        this._cookieService.delete('Authorization', '/');
        sessionStorage.clear();
      }),
      catchError((error) => {
        console.error(error);
        // Lanza el error para que pueda ser manejado por el componente
        return throwError(() => error);
      })
    );
  }

  // Verifica si el usuario está autenticado
  isAuthenticated(): boolean {
    const token = this.getContextToken();

    return !!token; // Devuelve true si hay un token
  }

  getUserPermissions(): string[] {
    return JSON.parse(sessionStorage.getItem("UserPermissions") ?? "") ?? [];
  }

  setUserPermissions(permissions: string[]) {
    sessionStorage.setItem("UserPermissions", JSON.stringify(permissions))
  }

  postRefreshToken(): Observable<TokenRefreshResponse> {
    const sessionToken = this.getContextToken();
    const headers = new HttpHeaders({
      Authorization: sessionToken
    });
    return this.http.post<TokenRefreshResponse>(`${this.apiUrl}RefreshUserApplicationToken`, null, { headers });
  }

  refreshToken(): Observable<string> {
    return this.postRefreshToken().pipe(
      map((data: TokenRefreshResponse) => {

        if (data.failure)
          throw new Error(data.message);

        const newToken = data.operationResultItem;


        // Guarda el nuevo token en la cookie
        this._cookieService.set(
          'Authorization',
          `Bearer ${newToken}`,
          undefined,
          '/',
          undefined,
          true,
          'Strict'
        );

        return newToken;
      }),
      catchError(err => {
        console.error("Error al refrescar el token: ", err);
        return throwError(() => err);
      })
    );
  }

  isExpired(token: string): boolean {
    if (!token) return true;

    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiration = payload.exp * 1000;
    return expiration < Date.now();
  }

  isAboutToExpire(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiration = payload.exp * 1000;
      const now = Date.now();
      const fiveMinutesInMs = 5 * 60 * 1000;
      return expiration - now <= fiveMinutesInMs;
    } catch (e) {
      console.error(' No se pudo leer el token', e);
      return true; // Si falla, asumimos que está vencido
    }
  }

  getVersionDates(): Observable<FechasVersionResposne> {
    return from(this.http.get<FechasVersionResposne>(this.apiUrl + `GetVersionDate`)).pipe(
      catchError((error) => {
        console.log('Error: ' + error.message);
        return throwError(() => new Error('Error al obtener las fechas/versión'));
      })
    );
  }

  getUser(): string {
    return sessionStorage.getItem("SecurityUser") ?? "Usuario Genérico";
  }

  getFullNameUser(): string {
    return sessionStorage.getItem("SecurityFullName") ?? "Usuario Genérico";
  }

  confirmPassword(request: ConfirmPasswordRequest): Observable<any> {
    const sessionToken = this.getContextToken();
    const headers = new HttpHeaders({
      'Authorization': sessionToken
    });
    return from(this.http.post(this.apiUrl + `ConfirmPassword`, request, { headers }).pipe(
      catchError(() => throwError(() => new Error("Error en el endpoint al confirmar contraseña")))
    )).pipe(
      catchError((error) => throwError(() => error))
    );
  }
}
