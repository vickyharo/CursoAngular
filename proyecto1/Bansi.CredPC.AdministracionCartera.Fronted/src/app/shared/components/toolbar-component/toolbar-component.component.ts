import { Component, HostListener, ViewChild, ElementRef, inject, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

//->Servicios
import { AuthService } from '@services/security-services/auth.service';
import { MenuServiceService } from '@services/security-services/menu.service';

//->Modelos
import { MenuItem } from '@models/security-models/MenuItem';

@Component({
  selector: 'app-toolbar-component',
  templateUrl: './toolbar-component.component.html',
  //styleUrl: './toolbar-component.component.scss'
})
export class ToolbarComponentComponent implements OnInit {
  username: string = '';
  fullName: string = "";
  isMenuOpen = false;
  routeSegments: { text: string; icon: string; route?: string }[] = [];
  menuItems: MenuItem[] = [];
  private currentSegments: string[] = [];
  _authService = inject(AuthService);
  _menuService = inject(MenuServiceService);
  path:any;

  @ViewChild('dropdownMenu') dropdownMenu: ElementRef | undefined;

  constructor(private router: Router) {
    this.path = this.router.url.split('/').slice(1).join('/');
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const currentPath = decodeURIComponent(this.router.url);
      this.currentSegments = currentPath.split('/').filter(segment => segment);
      if (this.menuItems.length > 0) {
        this.updateRouteSegments(this.currentSegments);
      }
    });
  }

  ngOnInit(): void {
    this.username = this._authService.getUser();
    this.fullName = this._authService.getFullNameUser();

    this._menuService.menuItems$.subscribe({
      next: (items) => {
        this.menuItems = items;
        if (this.currentSegments.length > 0) {
          this.updateRouteSegments(this.currentSegments);
        }
      },
      error: (error) => {
        console.error('Error cargando items:', error);
      }
    });
  }

  private updateRouteSegments(segments: string[]): void {
    this.routeSegments = [];
    if (segments.length >= 2) {
      const parentSegment = segments[0];
      const childSegment = segments[1];
      const fullSegment = `${parentSegment}/${childSegment}`;

      let childMenuItem:MenuItem | undefined;
      let parentMenuItem:MenuItem | undefined;

      for (const menuItem of this.menuItems){
        childMenuItem = menuItem.subMenu?.find(subItem => subItem.route === fullSegment);
        if (childMenuItem){
          parentMenuItem = menuItem;
          break;
        }
      }
      if (childMenuItem && parentMenuItem){
        this.routeSegments.push({
          text: `${parentMenuItem?.name}.${childMenuItem.name}`,
          icon: parentMenuItem.icon,
          route: `/${fullSegment}`
        });
      }
    }
  }

  private normalizeText(text: string): string {
    return text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  }

  navigateToRoute(route: string | undefined): void {
    if (route) {
      this.router.navigate([route]);
    }
  }

  toggleMenu = () => this.isMenuOpen = !this.isMenuOpen;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.dropdownMenu && !this.dropdownMenu.nativeElement.contains(event.target)) {
      this.isMenuOpen = false;
    }
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