import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

//->Models
import { MenuItem } from '@models/security-models/MenuItem';
import { UserOptionsAllowed } from '@models/security-models/LoginResponse';

//->Servicios
import { AuthService } from '@services/security-services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MenuServiceService {
  private menuItemsSource = new BehaviorSubject<MenuItem[]>(this.getMenuFromStorage());
  menuItems$ = this.menuItemsSource.asObservable();
  authService = inject(AuthService);

  constructor() { }

  setMenuItems(userOptionsAllowed: UserOptionsAllowed[]) {
    let rutasActivas: string[] = []
    const menuItems = userOptionsAllowed.map(option =>
      this.mapToMenuItem(option)
    );

    this.menuItemsSource.next(menuItems);
    rutasActivas = this.getRoutesMenu(menuItems);

    sessionStorage.setItem("menuItems", JSON.stringify(menuItems));
    this.authService.setUserPermissions(rutasActivas);
  }

  private getRoutesMenu(menu: MenuItem[]): string[] {
    let rutasActivas: string[] = []

    for (const menuPadre of menu) {
      if (menuPadre.subMenu?.length) {
        rutasActivas.push(menuPadre.route ? menuPadre.route : '');
        let routes: string[] = this.getRoutesMenu(menuPadre.subMenu);
        routes.forEach(x => rutasActivas.push(x));
      }
      else {

        rutasActivas.push(menuPadre.route ? menuPadre.route : '');
      }
    }
    return rutasActivas;
  }

  private mapToMenuItem(option: UserOptionsAllowed): MenuItem {
    return {
      id: option.id,
      name: option.name,
      icon: this.getIcon(option.id),
      parentId: option.parentId ?? null,
      subMenu: option.opcionesHijas ? option.opcionesHijas.map(child => this.mapToMenuItem(child)) : null,
      route: this.getRoutes(option.id),
      expanded: false
    }
  }

  private getIcon(optionId: number): string {
    let ICON: string = "arrow_right_alt" //-> Default submenus

    if (optionId == 1) {
      ICON = 'dashboard icon';
    }
    if (optionId == 2) {
      ICON = 'payments';
    }
    if (optionId == 11) {
      ICON = 'paid';
    }
    if (optionId == 20) {
      ICON = 'summarize';
    }

    return ICON;
  }

  private getRoutes(optionId: number): string | null {
    const routeMap: { [key: number]: string | null } = {
      //1: "/modificacion-creditos",
      //2: "/modificacion-creditos/cambio-cuenta",
      3: "/modificacion-creditos/cambio-cuenta/registrar-solicitud",
      4: "boton-ccc-cccregistrar-guardar-solicitud",
      5: "boton-ccc-cccregistrar-guardar-autorizar-solicitud",
      6: "boton-ccc-cccregistrar-cancelar-solicitud",
      7: "/modificacion-creditos/cambio-cuenta/autorizar-solicitud",
      8: "boton-ccc-cccautorizar-autorizar-solicitud",
      9: "boton-ccc-cccautorizar-aplicar-solicitud",
      10: "boton-ccc-cccautorizar-cancelar-solicitud",
      //11: "/modificacion-creditos/cambio-linea",
      12: "/modificacion-creditos/cambio-linea/registrar-solicitud",
      13: "boton-cmla-cmlaregistrar-guardar-solicitud",
      14: "boton-cmla-cmlaregistrar-guardar-autorizar-solicitud",
      15: "boton-cmla-cmlaregistrar-cancelar-solicitud",
      16: "/modificacion-creditos/cambio-linea/autorizar-solicitud",
      17: "boton-cmla-cmlaautorizar-autorizar-solicitud",
      18: "boton-cmla-cmlaautorizar-aplicar-solicitud",
      19: "boton-cmla-cmlaautorizar-cancelar-solicitud",
      //20: "/modificacion-creditos/consultas",
      21: "/modificacion-creditos/consultas/bitacora-cambio-cuenta",
      22: "/modificacion-creditos/consultas/bitacora-cambio-linea",
      0: null,
    }
    return routeMap[optionId] || routeMap[0];
  }

  private getMenuFromStorage(): MenuItem[] {
    const storedMenu = sessionStorage.getItem("menuItems");
    return storedMenu ? JSON.parse(storedMenu) : [];
  }
}
