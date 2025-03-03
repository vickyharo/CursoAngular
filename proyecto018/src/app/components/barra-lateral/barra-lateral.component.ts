import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';


@Component({
  selector: 'app-barra-lateral',
  standalone: false,
  templateUrl: './barra-lateral.component.html',
  styleUrl: './barra-lateral.component.css',
})
export class BarraLateralComponent {
 

  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  
}
