import { Component, inject, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
//Modelos
import { MenuService } from './services/menu.service';
import { MenuItem } from '../../../core/models/menu-item';

@Component({
  selector: 'layout-vertical',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './layout-vertical.component.html'
})
export class LayoutVerticalComponent implements OnInit {
  nameSystem: string = "Nombre del sistema";
  version: string = "0.0.1"; //Crear script o llamar desde envioroment
  fechaActual: string = new Date().toLocaleDateString('es-MX'); //Pedir de la api
  openMenu: number | null = null;//Bandera para los submenus
  currentRouteName: string = '';//Bread Crumb
  collapsed = true;//Bandera para el menu
  menuItems: MenuItem[] = [];

  constructor(private router: Router, private menuService: MenuService) {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe((event) => {
        this.updateCurrentRoute(event.urlAfterRedirects);
      });
  }
  ngOnInit(): void {
    //Menu
    this.menuService.getMenu().subscribe(items => {
      this.menuItems = items;
    });
  }

  toggleMenu(id: number): void {
    if (this.collapsed) {
      this.toggleCollapse(false);
    } else {
      this.resetCollapseTimeout();
    }

    this.openMenu = this.openMenu === id ? null : id;
  }

  toggleCollapse(key?: boolean): void {
    this.collapsed = key !== undefined ? key : !this.collapsed;

    if (this.collapsed) {
      this.openMenu = null;
      //this.resetCollapseTimeout();
    } else {
      //this.closeModalSubMenu();
     // this.resetCollapseTimeout();
    }
  }

  private collapseTimeoutId: any;

  private resetCollapseTimeout(): void {
    if (this.collapseTimeoutId) {
      clearTimeout(this.collapseTimeoutId);
      this.collapseTimeoutId = null;
    }

    this.collapseTimeoutId = setTimeout(() => {
      this.collapsed = true;
      this.openMenu = null;
      this.collapseTimeoutId = null;
    }, 5000);
  }


  updateCurrentRoute(url: string) {
    const parts = url.split('/').filter(p => p);
    this.currentRouteName = parts.length > 0 ? parts.join(' > ') : 'Dashboard';
  }

  routerlink(key: string): void {
    this.router.navigate([key]);
    this.collapsed = true;
    this.openMenu = null;
    this.closeModalSubMenu();
  }

  handleMenuClick(item: MenuItem, event?: MouseEvent) {
    if (this.collapsed && item.subMenu) {
      if (this.collapsedSubMenuItem) {
        this.closeModalSubMenu();
      } else {
        // Menú colapsado y tiene submenú
        this.handleCollapsedSubMenu(item, event);
      }
    } else if (item.subMenu) {
      // Menú expandido y tiene submenú
      this.toggleMenu(item.id);
    } else {
      // Siempre va a la ruta si no tiene submenú
      this.routerlink(item.route!);
    }
  }

  collapsedSubMenuItem: MenuItem | null = null;
  popupPosition: { top: number, left: number } = { top: 0, left: 0 };

  handleCollapsedSubMenu(item: MenuItem, event?: MouseEvent) {
    // Guarda el item activo y la posición donde se mostrará
    this.collapsedSubMenuItem = item;

    // Usa el evento click para calcular la posición del popup
    if (event) {
      const rect = (event.target as HTMLElement).getBoundingClientRect();

      console.log('top');
      console.log(rect.top);

      console.log('right');
      console.log(rect.right);

      this.popupPosition = {
        top: rect.top,
        left: rect.right + 28 // justo a la derecha
      };
    }
  }
  closeModalSubMenu() {
    this.collapsedSubMenuItem = null;
  }

  logOut(){
    this.routerlink('/sign-in');
  }
}
