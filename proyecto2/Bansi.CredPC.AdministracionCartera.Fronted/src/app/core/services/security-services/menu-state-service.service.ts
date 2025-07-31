import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuStateServiceService {
  private menuCollapsed = new BehaviorSubject<boolean>(false);
  menuCollapsed$ = this.menuCollapsed.asObservable();
  private _lastVisitedRoute = new BehaviorSubject<{
    route: string | null,
    page: number | null,
    rowId: string | null
  }>({
    route: null,
    page: null,
    rowId: null
  });
  lastVisitedRoute$ = this._lastVisitedRoute.asObservable();

  private menuWidth = new BehaviorSubject<string>('270px');
  menuWidth$ = this.menuWidth.asObservable();

  updateMenuState(collapsed: boolean) {
    this.menuCollapsed.next(collapsed);
    this.menuWidth.next(collapsed ? '65px' : '270px');
  }

  updateLastVisitedRouteInfo(route: string, page: number, rowId: string) {
    const safeRoute = route || '';
    const safePage = page > 0 ? page : 1;
    const safeRowId = rowId || null;
    const routeInfo = { route: safeRoute, page: safePage, rowId: safeRowId };
    this._lastVisitedRoute.next(routeInfo);
    localStorage.setItem('lastVisitedRouteInfo', JSON.stringify(routeInfo));
  }

  getLastVisitedRouteInfo() {
    const storedInfo = localStorage.getItem('lastVisitedRouteInfo');
    if (storedInfo) {
      try {
        const parsedInfo = JSON.parse(storedInfo);
        if (parsedInfo &&
          parsedInfo.route &&
          parsedInfo.page &&
          parsedInfo.page > 0) {
          return parsedInfo;
        }
      } catch (error) {
        console.error('Error al analizar la información de la última ruta visitada:', error);
      }
    }
    return null;
  }

  clearLastVisitedRouteInfo() {
    this._lastVisitedRoute.next({ route: null, page: null, rowId: null });
    localStorage.removeItem('lastVisitedRouteInfo');
  }
}