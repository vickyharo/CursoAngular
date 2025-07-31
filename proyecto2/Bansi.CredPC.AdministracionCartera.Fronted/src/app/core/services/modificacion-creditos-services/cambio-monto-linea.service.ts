import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

//->Url del servicio
import { environment } from '@environments/environment';

//->Interfaces
import { AutorizarSolicitudCambioLineaRequest } from '@models/modificacion-creditos-models/cambio-linea/AutorizarSolicitudCambioLineaRequest';
import { AutorizarSolicitudCambioLineaResponse } from '@models/modificacion-creditos-models/cambio-linea/AutorizarSolicitudCambioLineaResponse';
import { CancelarSolicitudCambioLineaRequest } from '@models/modificacion-creditos-models/cambio-linea/CancelarSolicitudCambioLineaRequest';
import { CancelarSolicitudCambioLineaResponse } from '@models/modificacion-creditos-models/cambio-linea/CancelarSolicitudCambioLineaResponse';
import { ConsultarInformacionLineaRequest } from '@models/modificacion-creditos-models/cambio-linea/ConsultarInformacionLineaRequest';
import { ConsultarInformacionLineaResponse } from '@models/modificacion-creditos-models/cambio-linea/ConsultarInformacionLineaResponse';
import { ConsultarSolicitudesCambioLineaRequest } from '@models/modificacion-creditos-models/cambio-linea/ConsultarSolicitudesCambioLineaRequest';
import { ConsultarSolicitudesCambioLineaResponse } from '@models/modificacion-creditos-models/cambio-linea/ConsultarSolicitudesCambioLineaResponse';
import { RegistrarSolicitudCambioLineaRequest } from '@models/modificacion-creditos-models/cambio-linea/RegistrarSolicitudCambioLineaRequest';
import { RegistrarSolicitudCambioLineaResponse } from '@models/modificacion-creditos-models/cambio-linea/RegistrarSolicitudCambioLineaResponse';
import { AplicarSolicitudCambioLineaRequest } from '@models/modificacion-creditos-models/cambio-linea/AplicarSolicitudCambioLineaRequest';
import { AplicarSolicitudCambioLineaResponse } from '@models/modificacion-creditos-models/cambio-linea/AplicarSolicitudCambioLineaResponse';

//->Servicios
import { AuthService } from '@services/security-services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CambioMontoLineaService {

  /** Propiedades */
  private url = `${environment.apiUrlAdministracionCarteraModificacionCredito}/ModificacionLinea/`;

  /** Constructor */
  constructor(private http: HttpClient, private authService: AuthService) { }

  /**
   * Consulta la informacion de la linea autorizada ingresada
   * @param {ConsultarInformacionLineaRequest} request
   * @returns {Observable<ConsultarInformacionLineaResponse>}
   */
  postConsultarInformacionLinea(request: ConsultarInformacionLineaRequest): Observable<ConsultarInformacionLineaResponse> {
    const sessionToken = this.authService.getContextToken();
    const headers = new HttpHeaders({
      'Authorization': sessionToken
    });

    return this.http.post<ConsultarInformacionLineaResponse>(
      this.url + 'ConsultarInformacionLinea', request, { headers }
    )
      .pipe(
        catchError((error) => {
          console.log('Error: Consultar información de la linea ' + error.message);
          return throwError(() => new Error('Error al consultar la informacion de la linea'));
        })
      );
  }

  /**
   * Consulta las solicitudes registradas del cambio de linea
   * @param {ConsultarSolicitudesCambioLineaRequest} request
   * @returns {Observable<ConsultarSolicitudesCambioLineaResponse>}
   */
  postConsultarSolicitudesCambioLinea(request: ConsultarSolicitudesCambioLineaRequest): Observable<ConsultarSolicitudesCambioLineaResponse> {
    const sessionToken = this.authService.getContextToken();
    const headers = new HttpHeaders({
      'Authorization': sessionToken
    });

    return this.http.post<ConsultarSolicitudesCambioLineaResponse>(
      this.url + 'ConsultarSolicitudesCambioLinea', request, { headers }
    )
      .pipe(
        catchError((error) => {
          console.log('Error: Consultar solicitudes cambio linea ' + error.message);
          return throwError(() => new Error('Error al consultar las solicitudes cambio linea'));
        })
      );
  }

  /**
   * Registrar una solicitud de cambio de monto de linea
   * @param {RegistrarSolicitudCambioLineaRequest} request
   * @returns {Observable<RegistrarSolicitudCambioLineaResponse>}
   */
  postRegistrarSolicitudCambioLinea(request: RegistrarSolicitudCambioLineaRequest): Observable<RegistrarSolicitudCambioLineaResponse> {
    const sessionToken = this.authService.getContextToken();
    const headers = new HttpHeaders({
      'Authorization': sessionToken
    });

    return this.http.post<RegistrarSolicitudCambioLineaResponse>(
      this.url + 'RegistrarSolicitudCambioLinea', request, { headers }
    )
      .pipe(
        catchError((error) => {
          console.log('Error: Registrar solicitud cambio linea ' + error.message);
          return throwError(() => new Error('Error al registrar solicitud de cambio de linea'));
        })
      );
  }

  /**
   * Cancelar la solicitud de cambio de linea
   * @param {CancelarSolicitudCambioLineaRequest} request
   * @returns {Observable<CancelarSolicitudCambioLineaResponse>}
   */
  postCancelarSolicitudCambioLinea(request: CancelarSolicitudCambioLineaRequest): Observable<CancelarSolicitudCambioLineaResponse> {
    const sessionToken = this.authService.getContextToken();
    const headers = new HttpHeaders({
      'Authorization': sessionToken
    });

    return this.http.post<CancelarSolicitudCambioLineaResponse>(
      this.url + 'CancelarSolicitudCambioLinea', request, { headers }
    )
      .pipe(
        catchError((error) => {
          console.log('Error: Cancelar la solicitud de cambio de linea ' + error.message);
          return throwError(() => new Error('Error al cancelar solicitud cambio linea'));
        })
      );
  }

  /**
   * Autorizar solicitud de cambio de linea
   * @param {AutorizarSolicitudCambioLineaRequest} request
   * @returns {Observable<AutorizarSolicitudCambioLineaResponse>}
   */
  postAutorizarSolicitudCambioLinea(request: AutorizarSolicitudCambioLineaRequest): Observable<AutorizarSolicitudCambioLineaResponse> {
    const sessionToken = this.authService.getContextToken();
    const headers = new HttpHeaders({
      'Authorization': sessionToken
    });

    return this.http.post<AutorizarSolicitudCambioLineaResponse>(
      this.url + 'AutorizarSolicitudCambioLinea', request, { headers }
    )
      .pipe(
        catchError((error) => {
          console.log('Error: Autorizar solicitud de cambio de linea ' + error.message);
          return throwError(() => new Error('Error al autorizar la solicitud de cambio de linea'));
        })
      );
  }

  /**
   * Aplicar solicitud de cambio de linea
   * @param {AplicarSolicitudCambioLineaRequest} request
   * @returns {Observable<AplicarSolicitudCambioLineaResponse>}
   */
  postAplicarSolicitudCambioLinea(request: AplicarSolicitudCambioLineaRequest): Observable<AplicarSolicitudCambioLineaResponse> {
    const sessionToken = this.authService.getContextToken();
    const headers = new HttpHeaders({
      'Authorization': sessionToken
    });

    return this.http.post<AplicarSolicitudCambioLineaResponse>(
      this.url + 'AplicarSolicitudCambioLinea', request, { headers }
    )
      .pipe(
        catchError((error) => {
          console.log('Error: Aplicar solicitud de cambio de linea ' + error.message);
          return throwError(() => new Error('Error al aplicar la solicitud de cambio de linea'));
        })
      );
  }
}//->Cierre clase
