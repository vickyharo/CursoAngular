import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/enviroment.prod';
import { MenuItem } from '../models/menu-item';
import { UserOptionsAllowed } from '../models/securityLogin/LoginResponse';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MenuServiceService {
  private urlMenuItems = environment.apiUrl;
  private menuItemsSource = new BehaviorSubject<MenuItem[]>(this.getMenuFromStorage());
  menuItems$ = this.menuItemsSource.asObservable();
  authService = inject(AuthService);

  constructor() { }

  setMenuItems(userOptionsAllowed: UserOptionsAllowed[]) {
    let rutasActivas:string[] = []
    const menuItems = userOptionsAllowed.map(option =>
      this.mapToMenuItem(option)
    );
    this.menuItemsSource.next(menuItems);

    for (const menuPadre of menuItems){
      if(menuPadre.subMenu){
        for(const menuHijo of menuPadre.subMenu){
          if (menuHijo.route)
            rutasActivas.push(menuHijo.route);
        }
      }
    }
    console.log(`RUTAS ACTIVAS: ${rutasActivas}`);
    sessionStorage.setItem("menuItems", JSON.stringify(menuItems));
    this.authService.setUserPermissions(rutasActivas);
  }

  private mapToMenuItem(option: UserOptionsAllowed): MenuItem {
    return {
      id: option.id,
      name: option.name,
      icon: this.getIcon(option.id),
      parentId: option.parentId ?? null,
      subMenu: option.opcionesHijas ? option.opcionesHijas.map(child => this.mapToMenuItem(child)) : null,
      route: this.getRoutes(option.id),
    }
  }

  private getIcon(optionId: number): string {
    let ICON: string = "arrow_right_alt" //-> Default submenus

    if (optionId == 1) {
      ICON = 'payments';
    }
    if (optionId == 4) {
      ICON = 'paid';
    }
    if (optionId == 7) {
      ICON = 'summarize';
    }

    return ICON;
  }

  private getRoutes(optionId: number): string | null {
    const routeMap: { [key: number]: string | null } = {
      2: "cuenta-cheques/registrar-solicitud",
      3: "cuenta-cheques/autorizar-solicitud",
      5: "linea-autorizada/registrar-solicitud",
      6: "linea-autorizada/autorizar-solicitud",
      8: "consultas/bitacora-cambio-cuenta",
      9: "consultas/bitacora-monto-linea",
      0: null,
    }
    return routeMap[optionId] || routeMap[0];
  }

  private getMenuFromStorage(): MenuItem[] {
    const storedMenu = sessionStorage.getItem("menuItems");
    return storedMenu ? JSON.parse(storedMenu) : [];
  }
}
