import { Component, HostListener, Input, signal, Output, EventEmitter, computed, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//->Modelos
import { MenuItem } from '@models/security-models/MenuItem';

//->Servicios
import { MenuServiceService } from '@services/security-services/menu.service';
import { AuthService } from '@services/security-services/auth.service';

@Component({
  selector: 'app-sidenav-component',
  templateUrl: './sidenav-component.component.html',
  styleUrl: './sidenav-component.component.css'
})
export class SidenavComponentComponent implements OnInit {
  private menuService = inject(MenuServiceService);
  private _authService = inject(AuthService);


  menuItems: MenuItem[] = [];
  menuModificacionCredito: MenuItem[] = [];
  activeMenuIndex: number | null = null;
  activeSubmenuIndex: number | null = null;
  selectedIndexMenu: number | null = null;
  selectedIndexSubMenu: number | null = null;

  profilePicSize = computed(() => (this.sideNavCollapsed() ? '30' : '50'));
  profilePic = computed(() => (this.sideNavCollapsed() ? 'assets/bansiTransp.png' : 'assets/bansiTransp.png'));

  sideNavCollapsed = signal(false);

  @Input() set collapsed(val: boolean) { this.sideNavCollapsed.set(val); }
  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.menuService.menuItems$.subscribe(item => {
      this.menuItems = item || [];
    });
  }

  onMenuClick(): void {
    this.sideNavCollapsed.set(!this.sideNavCollapsed());
    this.toggleSidenav.emit();
  }

  onMenuPrincipalClick(item: MenuItem, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }

    if (this.activeMenuIndex != item.id) item.expanded = false;

    if (item.subMenu) {
      item.expanded = !item.expanded;
    }

    this.selectedIndexMenu = item.id;
    this.activeMenuIndex = this.activeMenuIndex === item.id ? null : item.id;
  }


  onSubMenuClick(item: MenuItem, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }

    if (this.activeSubmenuIndex != item.id) item.expanded = false;

    if (item.subMenu) {
      item.expanded = !item.expanded;
    }

    this.selectedIndexSubMenu = item.id;

    this.activeSubmenuIndex = this.activeSubmenuIndex === item.id ? null : item.id;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!(event.target as HTMLElement).closest('.dropdown-menu, a[mat-list-item]')) {
      this.activeSubmenuIndex = null;
    }
  }

  navigateToHome(): void {
    this.router.navigate(['/modificacion-creditos/cambio-cuenta/registrar-solicitud']);
  }

  logOut() {
    this._authService.logout().subscribe({
      next: () => {
        this._authService.logout();
        this.router.navigate(['/home/login']);
      },
      error: (err) => {
        console.error('Error during logout:', err);
      },
    });
  }
}
