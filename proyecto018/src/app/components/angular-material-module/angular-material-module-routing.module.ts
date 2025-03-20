import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//-> Mis componentes
import { BotonesComponent } from './botones/botones.component';
import { FormulariosInputComponent } from './formularios-input/formularios-input.component';
import { MatRadioButtonYMatRadioGroupComponent } from './mat-radio-button-y-mat-radio-group/mat-radio-button-y-mat-radio-group.component';
import { MatCheckboxComponent } from './mat-checkbox/mat-checkbox.component';
import { MatSelectComponent } from './mat-select/mat-select.component';
import { MatSliderComponent } from './mat-slider/mat-slider.component';
import { MatSlideToggleComponent } from './mat-slide-toggle/mat-slide-toggle.component';
import { LayoutTabsComponent } from './layout-tabs/layout-tabs.component';
import { MatTableComponent } from './mat-table/mat-table.component';
import { MatTableYMatPaginatiorComponent } from './mat-table-y-mat-paginatior/mat-table-y-mat-paginatior.component';
import { MatTableYMatSortComponent } from './mat-table-y-mat-sort/mat-table-y-mat-sort.component';
import { MatTableYFiltrarDatosComponent } from './mat-table-y-filtrar-datos/mat-table-y-filtrar-datos.component';
import { MatDialogComponent } from './mat-dialog/mat-dialog.component';
import { MatMenuComponent } from './mat-menu/mat-menu.component';
import { MatMenuAnidadosComponent } from './mat-menu-anidados/mat-menu-anidados.component';
import { MatCardComponent } from './mat-card/mat-card.component';
import { MatToolbarComponent } from './mat-toolbar/mat-toolbar.component';
import { MatExpansionPanelComponent } from './mat-expansion-panel/mat-expansion-panel.component';

const routes: Routes = [
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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AngularMaterialRoutingModule { }
