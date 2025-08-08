import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

//->Url del servicio
import { environment } from '@environments/environment';

//->Modelos
import { ConsultarSolicitudesCambioCuentaRequest } from '@models/modificacion-creditos-models/cambio-cuenta/ConsultarSolicitudesCambioCuentaRequest';
import { ConsultarSolicitudesCambioCuentaResponse } from '@models/modificacion-creditos-models/cambio-cuenta/ConsultarSolicitudesCambioCuentaResponse';
import { RegistrarSolicitudCambioCuentaRequest } from '@models/modificacion-creditos-models/cambio-cuenta/RegistrarSolicitudCambioCuentaRequest';
import { RegistrarSolicitudCambioCuentaResponse } from '@models/modificacion-creditos-models/cambio-cuenta/RegistrarSolicitudCambioCuentaResponse';
import { CancelarSolicitudCambioCuentaRequest } from '@models/modificacion-creditos-models/cambio-cuenta/CancelarSolicitudCambioCuentaRequest';
import { CancelarSolicitudCambioCuentaResponse } from '@models/modificacion-creditos-models/cambio-cuenta/CancelarSolicitudCambioCuentaResponse';
import { AutorizarSolicitudCambioCuentaRequest } from '@models/modificacion-creditos-models/cambio-cuenta/AutorizarSolicitudCambioCuentaRequest';
import { AutorizarSolicitudCambioCuentaResponse } from '@models/modificacion-creditos-models/cambio-cuenta/AutorizarSolicitudCambioCuentaResponse';
import { AplicarSolicitudCambioCuentaRequest } from '@models/modificacion-creditos-models/cambio-cuenta/AplicarSolicitudCambioCuentaRequest';
import { AplicarSolicitudCambioCuentaResponse } from '@models/modificacion-creditos-models/cambio-cuenta/AplicarSolicitudCambioCuentaResponse';
import { ConsultarInformacionCreditoRequest } from '@models/modificacion-creditos-models/cambio-cuenta/ConsultarInformacionCreditoRequest';
import { ConsultarInformacionCreditoResponse } from '@models/modificacion-creditos-models/cambio-cuenta/ConsultarInformacionCreditoResponse';
import { ConsultarCuentasAsociadasCreditoRequest } from '@models/modificacion-creditos-models/cambio-cuenta/ConsultarCuentasAsociadasCreditoRequest';
import { ConsultarCuentasAsociadasCreditoResponse } from '@models/modificacion-creditos-models/cambio-cuenta/ConsultarCuentasAsociadasCreditoResponse';
import { ConsultarInformacionCuentaRequest } from '@models/modificacion-creditos-models/cambio-cuenta/ConsultarInformacionCuentaRequest';
import { ConsultarInformacionCuentaResponse } from '@models/modificacion-creditos-models/cambio-cuenta/ConsultarInformacionCuentaResponse';
import { ObtenerEstatusSolicitudCambioCuentaResponse } from '@models/modificacion-creditos-models/cambio-cuenta/ObtenerEstatusSolicitudCambioCuentaResponse';
import { ValidarCuentaPermiteAbonoResponse } from '@models/modificacion-creditos-models/cambio-cuenta/ValidarCuentaPermiteAbonoResponse';
import { ValidarCuentaPermiteAbonoRequest } from '@models/modificacion-creditos-models/cambio-cuenta/ValidarCuentaPermiteAbonoRequest';
import { ValidarCuentaPermiteCargoResponse } from '@models/modificacion-creditos-models/cambio-cuenta/ValidarCuentaPermiteCargoResponse';
import { ValidarCuentaPermiteCargoRequest } from '@models/modificacion-creditos-models/cambio-cuenta/ValidarCuentaPermiteCargoRequest';

//->Servicios
import { AuthService } from '@services/security-services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CambioCuentaChequesService {
  /** Propiedades */
  private url = `${environment.apiUrlAdministracionCarteraModificacionCredito}/ModificacionCuenta/`;

  /** Constructor */
  constructor(private http: HttpClient, private authService: AuthService) { }

  /**
   * Consultar solicitudes cambio de cuenta
   * @param {ConsultarSolicitudesCambioCuentaRequest} request
   * @returns {Observable<ConsultarSolicitudesCambioCuentaResponse>}
   */
  postConsultarSolicitudesCambioCuenta(request: ConsultarSolicitudesCambioCuentaRequest): Observable<ConsultarSolicitudesCambioCuentaResponse> {
    const sessionToken = this.authService.getContextToken();
    const headers = new HttpHeaders({
      'Authorization': sessionToken
    });

    return this.http.post<ConsultarSolicitudesCambioCuentaResponse>(
      this.url + 'ConsultarSolicitudesCambioCuenta', request, { headers }
    )
      .pipe(
        catchError((error) => {
          console.log('Error: Consultar solicitud cambio de cuenta' + error.message);
          return throwError(() => new Error('Error al consultar solicitud cambio de cuenta'));
        })
      );
  }

  /**
   * Registrar solicitud cambio de cuenta
   *
   * @param {RegistrarSolicitudCambioCuentaRequest} request
   * @returns {Observable<RegistrarSolicitudCambioCuentaResponse>}
   */
  postRegistrarSolicitudCambioCuenta(request: RegistrarSolicitudCambioCuentaRequest): Observable<RegistrarSolicitudCambioCuentaResponse> {
    const sessionToken = this.authService.getContextToken();
    const headers = new HttpHeaders({
      'Authorization': sessionToken
    });

    return this.http.post<RegistrarSolicitudCambioCuentaResponse>(
      this.url + 'RegistrarSolicitudCambioCuenta', request, { headers }
    )
      .pipe(
        catchError((error) => {
          console.log('Error: Guardar solicitud cambio de cuenta ' + error.message);
          return throwError(() => new Error('Error al guardar la solicitud de cambio de cuenta'));
        })
      );
  }

  /**
   * Cancelar solicitud cambio de cuenta
   *
   * @param {CancelarSolicitudCambioCuentaRequest} request
   * @returns {Observable<CancelarSolicitudCambioCuentaResponse>}
   */
  postCancelarSolicitudCambioCuenta(request: CancelarSolicitudCambioCuentaRequest): Observable<CancelarSolicitudCambioCuentaResponse> {
    const sessionToken = this.authService.getContextToken();
    const headers = new HttpHeaders({
      'Authorization': sessionToken
    });

    return this.http.post<CancelarSolicitudCambioCuentaResponse>(
      this.url + 'CancelarSolicitudCambioCuenta', request, { headers }
    )
      .pipe(
        catchError((error) => {
          console.log('Error: Cancelar solicitud cambio de cuenta ' + error.message);
          return throwError(() => new Error('Error al cancelar solicitud cambio de cuenta'));
        })
      );
  }

  /**
   * Autorizar solicitud cambio de cuenta
   *
   * @param {AutorizarSolicitudCambioCuentaRequest} request
   * @returns {Observable<AutorizarSolicitudCambioCuentaResponse>}
   */
  postAutorizarSolicitudCambioCuenta(request: AutorizarSolicitudCambioCuentaRequest): Observable<AutorizarSolicitudCambioCuentaResponse> {
    const sessionToken = this.authService.getContextToken();
    const headers = new HttpHeaders({
      'Authorization': sessionToken
    });

    return this.http.post<AutorizarSolicitudCambioCuentaResponse>(
      this.url + 'AutorizarSolicitudCambioCuenta', request, { headers }
    )
      .pipe(
        catchError((error) => {
          console.log('Error: Autorizar solicitud cambio de cuenta ' + error.message);
          return throwError(() => new Error('Error al autorizar solicitud cambio de cuenta'));
        })
      );
  }

  /**
   * Aplicar solicitud cambio de cuenta
   *
   * @param {AplicarSolicitudCambioCuentaRequest} request
   * @returns {Observable<AplicarSolicitudCambioCuentaResponse>}
   */
  postAplicarSolicitudCambioCuenta(request: AplicarSolicitudCambioCuentaRequest): Observable<AplicarSolicitudCambioCuentaResponse> {
    const sessionToken = this.authService.getContextToken();
    const headers = new HttpHeaders({
      'Authorization': sessionToken
    });

    return this.http.post<AplicarSolicitudCambioCuentaResponse>(
      this.url + 'AplicarSolicitudCambioCuenta', request, { headers }
    )
      .pipe(
        catchError((error) => {
          console.log('Error: Aplicar solicitud cambio de cuenta ' + error.message);
          return throwError(() => new Error('Error al aplicar solicitud cambio de cuenta'));
        })
      );
  }

  /**
   * Consulta la informacion del credito ingresado en el buscador
   *
   * @param {string} numeroCredito
   * @returns {Observable<ConsultarInformacionCreditoRequest>}
   */
  postConsultarInformacionCredito(request: ConsultarInformacionCreditoRequest): Observable<ConsultarInformacionCreditoResponse> {
    const sessionToken = this.authService.getContextToken();
    const headers = new HttpHeaders({
      'Authorization': sessionToken
    });

    return this.http.post<ConsultarInformacionCreditoResponse>(
      this.url + 'ConsultarInformacionCredito', request, { headers }
    )
      .pipe(
        catchError((error) => {
          console.log('Error: Consultar información del crédito ' + error.message);
          return throwError(() => new Error('Error al consultar la informacion del crédito'));
        })
      );
  }

  /**
   * Consultar las cuentas asociadas
   *
   * @param {ConsultarCuentasAsociadasCreditoRequest} request
   * @returns {Observable<ConsultarCuentasAsociadasCreditoResponse>}
   */
  postConsultarCuentasAsociadasCredito(request: ConsultarCuentasAsociadasCreditoRequest): Observable<ConsultarCuentasAsociadasCreditoResponse> {
    const sessionToken = this.authService.getContextToken();
    const headers = new HttpHeaders({
      'Authorization': sessionToken
    });

    return this.http.post<ConsultarCuentasAsociadasCreditoResponse>(
      this.url + 'ConsultarCuentasAsociadasCredito', request, { headers }
    )
      .pipe(
        catchError((error) => {
          console.log('Error: Buscar cuentas asociadas ' + error.message);
          return throwError(() => new Error('Error al obtener las cuentas asociadas'));
        })
      );
  }

  /**
   * Consultar la información de la cuenta
   *
   * @param {ConsultarInformacionCuentaRequest} request
   * @returns {Observable<ConsultarInformacionCuentaResponse>}
   */
  postConsultarInformacionCuenta(request: ConsultarInformacionCuentaRequest): Observable<ConsultarInformacionCuentaResponse> {
    const sessionToken = this.authService.getContextToken();
    const headers = new HttpHeaders({
      'Authorization': sessionToken
    });

    return this.http.post<ConsultarInformacionCuentaResponse>(
      this.url + 'ConsultarInformacionCuenta', request, { headers }
    )
      .pipe(
        catchError((error) => {
          console.log('Error: Buscar información cuenta ' + error.message);
          return throwError(() => new Error('Error al obtener la información de cuenta'));
        })
      );
  }

  /**
   * Obtener los tipos de solicitudes: cambio de cuenta y modificacion monto de linea
   *
   * @returns {Observable<ObtenerEstatusSolicitudCambioCuentaResponse>}
   */
  getObtenerEstatusSolicitudCambioCuenta(): Observable<ObtenerEstatusSolicitudCambioCuentaResponse> {
    const sessionToken = this.authService.getContextToken();
    const headers = new HttpHeaders({
      'Authorization': sessionToken
    });

    return this.http.get<ObtenerEstatusSolicitudCambioCuentaResponse>(this.url + 'ObtenerEstatusSolicitudCambioCuenta', { headers }).pipe(
      catchError((error) => {
        console.error('Error: obtener estatus solicitud cambio cuenta', error.message);
        return throwError(() => new Error('Error al obtener el estatus solicitud cambio cuenta'));
      })
    );
  }

  /**
   * Validar si una cuenta permite un abono
   *
   * @returns {Observable<ValidarCuentaPermiteAbonoResponse>}
   */
    postValidarCuentaPermiteAbono(request: ValidarCuentaPermiteAbonoRequest): Observable<ValidarCuentaPermiteAbonoResponse> {
      const sessionToken = this.authService.getContextToken();
      const headers = new HttpHeaders({
        'Authorization': sessionToken
      });

      return this.http.post<ValidarCuentaPermiteAbonoResponse>(this.url + 'ValidarCuentaPermiteAbono', request,{ headers }).pipe(
        catchError((error) => {
          console.error('Error: Validar si una cuenta permite abono', error.message);
          return throwError(() => new Error('Error al validar si una cuenta permite un abono'));
        })
      );
    }

  /**
   * Validar si una cuenta permite un cargo
   *
   * @returns {Observable<ValidarCuentaPermiteCargoResponse>}
   */
  postValidarCuentaPermiteCargo(request: ValidarCuentaPermiteCargoRequest): Observable<ValidarCuentaPermiteCargoResponse> {
    const sessionToken = this.authService.getContextToken();
    const headers = new HttpHeaders({
      'Authorization': sessionToken
    });

    return this.http.post<ValidarCuentaPermiteCargoResponse>(this.url + 'ValidarCuentaPermiteCargo', request,{ headers }).pipe(
      catchError((error) => {
        console.error('Error: validar si una cuenta permite cargo', error.message);
        return throwError(() => new Error('Error al validar si una cuenta permite un cargo'));
      })
    );
  }
}//-> Cierre clase
