import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

//->Environments
import { environment } from '@environments/environment';

//->Modelos
import { ReporteDetalleColumnasResponse } from '@models/modificacion-creditos-models/reportes/ReporteDetalleColumnasResponse';

//->Servicios
import { AuthService } from '@services/security-services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  private _httpClient = inject(HttpClient);
  private _authService = inject(AuthService);

  getColumnasReportes(request: any): Observable<ReporteDetalleColumnasResponse>{
    const sessionToken = this._authService.getContextToken();
    const headers = new HttpHeaders({
      'Authorization': sessionToken
    });
    return this._httpClient.post<ReporteDetalleColumnasResponse>(`${environment.apiUrlAdministracionCarteraModificacionCredito}/Bitacora/ObtenerColumnasReportes`, request, {headers});
  }

  getArrayColumnas(response: ReporteDetalleColumnasResponse, reportHeader?: boolean): string[]{
    const result: string[] = []
    if (response){
      for (const item of response.operationResultItem){
        if (reportHeader){
          result.push(item.reportHeader);
        } else {
          result.push(item.columnaVisible);
        }
      }
    }
    return result;
  }

  exportToCsv(filename: string, data: any[], columnasVisibles: string[], reportHeaders: string[]): void {
    if (!data || data.length === 0) {
      console.warn('No hay datos para exportar.');
      return;
    }

    const csvRows: string[] = [];
    const allRows: any[] = [];

    for (const row of data){
      const entries = Object.entries(row);
      const arraysEnFila = entries.filter(([_, value]) => Array.isArray(value));
      const objetosEnFIla = entries.filter(([_, value]) => typeof value === 'object' && value !== null && !Array.isArray(value));

      const padreSinArraysNiObjetos = Object.fromEntries(entries.filter(([_, value]) => typeof value !== 'object' || value === null));

      if (arraysEnFila.length > 0){
        for (const [_, arrayValue] of arraysEnFila) {
          const detalles = arrayValue as any[];

          if(detalles.length > 0){
            for (const item of detalles){
              allRows.push({...padreSinArraysNiObjetos, ...item});
            }
          } else{
            allRows.push({...padreSinArraysNiObjetos});
          }
        }
      } else if (objetosEnFIla.length > 0){
        for (const [_, objValue] of objetosEnFIla){
          const item = objValue as any;
          allRows.push({...padreSinArraysNiObjetos, ...item});
        }
      }
      else {
        allRows.push({...row});
      }
    }
    const keysParaUsar = columnasVisibles && columnasVisibles.length > 0 ? columnasVisibles : Array.from(new Set(allRows.flatMap((row) => Object.keys(row))));

    const headers = reportHeaders && reportHeaders.length > 0 ? reportHeaders : keysParaUsar;

    //Agregar encabezados
    csvRows.push(headers.join(','));

    //Agregar filas
    for (const row of allRows){
      const values = keysParaUsar.map(key => {
        let value = row[key] ?? '';

        if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T/.test(value))
          value = value.split("T")[0];

        return `"${String(value).replace(/"/g, '""')}"`;
      });
      csvRows.push(values.join(','));
    }

    // Crear blob y descargar archivo
    const csvContent = '\uFEFF' + csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
