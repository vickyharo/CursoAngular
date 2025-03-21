import { Component, inject,ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';


//-> Angular material
import { MaterialModule } from '../material/material.module'
@Component({
  selector: 'app-barra-lateral',
  standalone: true,
  templateUrl: './barra-lateral.component.html',
  styleUrl: './barra-lateral.component.css',
  imports:[MaterialModule]
})
export class BarraLateralComponent {
  opened = true;

  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  showSubSubMenuFormularios: boolean = false;

  mouseenter() {
    if (!this.opened) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.opened) {
      this.isShowing = false;
    }
  }

}
