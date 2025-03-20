import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//-> Mis modulos
import { BotonesComponent } from './components/botones/botones.component';
import { FormulariosInputComponent } from './components/formularios-input/formularios-input.component';
import { MatRadioButtonYMatRadioGroupComponent } from './components/angular-material-module/mat-radio-button-y-mat-radio-group/mat-radio-button-y-mat-radio-group.component';
import { MatCheckboxComponent } from './components/mat-checkbox/mat-checkbox.component';
import { MatSelectComponent } from './components/angular-material-module/mat-select/mat-select.component';
import { MatSliderComponent } from './components/angular-material-module/mat-slider/mat-slider.component';
import { MatSlideToggleComponent } from './components/angular-material-module/mat-slide-toggle/mat-slide-toggle.component';
import { LayoutTabsComponent } from './components/layout-tabs/layout-tabs.component';
import { MatTableComponent } from './components/angular-material-module/mat-table/mat-table.component';
import { MatTableYMatPaginatiorComponent } from './components/angular-material-module/mat-table-y-mat-paginatior/mat-table-y-mat-paginatior.component';
import { MatTableYMatSortComponent } from './components/angular-material-module/mat-table-y-mat-sort/mat-table-y-mat-sort.component';
import { MatTableYFiltrarDatosComponent } from './components/angular-material-module/mat-table-y-filtrar-datos/mat-table-y-filtrar-datos.component';
import { MatDialogComponent } from './components/angular-material-module/mat-dialog/mat-dialog.component';
import { MatMenuComponent } from './components/angular-material-module/mat-menu/mat-menu.component';
import { MatMenuAnidadosComponent } from './components/angular-material-module/mat-menu-anidados/mat-menu-anidados.component';
import { MatCardComponent } from './components/mat-card/mat-card.component';
import { MatToolbarComponent } from './components/angular-material-module/mat-toolbar/mat-toolbar.component';
import { MatExpansionPanelComponent } from './components/angular-material-module/mat-expansion-panel/mat-expansion-panel.component';

const routes: Routes = [
  {
    path: '',
    component: BotonesComponent
  },
  {
    path: 'botones',
    component: BotonesComponent
  },
  {
    path: 'formularios-input',
    component: FormulariosInputComponent
  },
  {
    path: 'mat-radio-button-y-mat-radio-group',
    component: MatRadioButtonYMatRadioGroupComponent
  },
  {
    path: 'mat-checkbox',
    component: MatCheckboxComponent
  },
  {
    path: 'mat-select',
    component: MatSelectComponent
  },
  {
    path: 'mat-slider',
    component: MatSliderComponent
  },
  {
    path: 'mat-slide-toggle',
    component: MatSlideToggleComponent
  },
  {
    path: 'layout-tabs',
    component: LayoutTabsComponent
  },
  {
    path: 'mat-table',
    component: MatTableComponent
  },
  {
    path: 'mat-table-y-mat-paginatior',
    component: MatTableYMatPaginatiorComponent
  },
  {
    path: 'mat-table-y-mat-sort',
    component: MatTableYMatSortComponent
  },
  {
    path: 'mat-table-y-filtrar-datos',
    component: MatTableYFiltrarDatosComponent
  },
  {
    path: 'mat-dialog',
    component: MatDialogComponent
  },
  {
    path: 'mat-menu',
    component: MatMenuComponent
  },
  {
    path: 'mat-menu-anidado',
    component: MatMenuAnidadosComponent
  },
  {
    path: 'mat-card',
    component: MatCardComponent
  },
  {
    path: 'mat-toolbar',
    component: MatToolbarComponent
  },
  {
    path: 'mat-expansion-panel',
    component: MatExpansionPanelComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
