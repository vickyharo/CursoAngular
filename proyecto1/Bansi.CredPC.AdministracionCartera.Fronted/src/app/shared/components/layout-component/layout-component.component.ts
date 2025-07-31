import { Component, computed, inject, signal } from '@angular/core';

//->Servicios
import { MenuStateServiceService } from '@services/security-services/menu-state-service.service';

@Component({
  selector: 'app-layout-component',
  templateUrl: './layout-component.component.html',
 // styleUrl: './layout-component.component.scss'
})
export class LayoutComponentComponent {
  private menuStateService = inject (MenuStateServiceService);
  collapsed = signal(true);

  sidenavWidth = computed(() => this.collapsed() ? '65px' : '322px');

  toggleSidenav(): void {
    this.collapsed.set(!this.collapsed());
    this.menuStateService.updateMenuState(this.collapsed());
  }
}