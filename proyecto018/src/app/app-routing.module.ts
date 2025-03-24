import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//-> Mis componentes
//******** Ejemplos angular material
import { BotonesComponent } from './components/angular-material-ejemplos/botones/botones.component';
import { FormulariosInputComponent } from './components/angular-material-ejemplos/formularios-input/formularios-input.component';
import { MatRadioButtonYMatRadioGroupComponent } from './components/angular-material-ejemplos/mat-radio-button-y-mat-radio-group/mat-radio-button-y-mat-radio-group.component';
import { MatCheckboxComponent } from './components/angular-material-ejemplos/mat-checkbox/mat-checkbox.component';
import { MatSelectComponent } from './components/angular-material-ejemplos/mat-select/mat-select.component';
import { MatSliderComponent } from './components/angular-material-ejemplos/mat-slider/mat-slider.component';
import { MatSlideToggleComponent } from './components/angular-material-ejemplos/mat-slide-toggle/mat-slide-toggle.component';
import { LayoutTabsComponent } from './components/angular-material-ejemplos/layout-tabs/layout-tabs.component';
import { MatTableComponent } from './components/angular-material-ejemplos/mat-table/mat-table.component';
import { MatTableYMatPaginatiorComponent } from './components/angular-material-ejemplos/mat-table-y-mat-paginatior/mat-table-y-mat-paginatior.component';
import { MatTableYMatSortComponent } from './components/angular-material-ejemplos/mat-table-y-mat-sort/mat-table-y-mat-sort.component';
import { MatTableYFiltrarDatosComponent } from './components/angular-material-ejemplos/mat-table-y-filtrar-datos/mat-table-y-filtrar-datos.component';
import { MatDialogComponent } from './components/angular-material-ejemplos/mat-dialog/mat-dialog.component';
import { MatMenuComponent } from './components/angular-material-ejemplos/mat-menu/mat-menu.component';
import { MatMenuAnidadosComponent } from './components/angular-material-ejemplos/mat-menu-anidados/mat-menu-anidados.component';
import { MatCardComponent } from './components/angular-material-ejemplos/mat-card/mat-card.component';
import { MatToolbarComponent } from './components/angular-material-ejemplos/mat-toolbar/mat-toolbar.component';
import { MatExpansionPanelComponent } from './components/angular-material-ejemplos/mat-expansion-panel/mat-expansion-panel.component';

//******** Formularios reactivos
import { ReactiveFormsModuleYFormControlComponent } from './components/formularios-reactivos/reactive-forms-module-y-form-control/reactive-forms-module-y-form-control.component';
import { FormGroupComponent } from './components/formularios-reactivos/form-group/form-group.component';

const routes: Routes = [
  //******** Ejemplos angular material
  { path: 'botones', component: BotonesComponent },
  { path: 'formularios-input', component: FormulariosInputComponent },
  { path: 'mat-radio-button-y-mat-radio-group', component: MatRadioButtonYMatRadioGroupComponent },
  { path: 'mat-checkbox', component: MatCheckboxComponent },
  { path: 'mat-select', component: MatSelectComponent },
  { path: 'mat-slider', component: MatSliderComponent },
  { path: 'mat-slide-toggle', component: MatSlideToggleComponent },
  { path: 'layout-tabs', component: LayoutTabsComponent },
  { path: 'mat-table', component: MatTableComponent },
  { path: 'mat-table-y-mat-paginatior', component: MatTableYMatPaginatiorComponent },
  { path: 'mat-table-y-mat-sort', component: MatTableYMatSortComponent },
  { path: 'mat-table-y-filtrar-datos', component: MatTableYFiltrarDatosComponent },
  { path: 'mat-dialog', component: MatDialogComponent },
  { path: 'mat-menu', component: MatMenuComponent },
  { path: 'mat-menu-anidado', component: MatMenuAnidadosComponent },
  { path: 'mat-card', component: MatCardComponent },
  { path: 'mat-toolbar', component: MatToolbarComponent },
  { path: 'mat-expansion-panel', component: MatExpansionPanelComponent },
  //******** Formularios reactivos
  { path: 'reactive-forms-module-y-form-control', component: ReactiveFormsModuleYFormControlComponent },
  { path: 'form-group', component: FormGroupComponent },
  //******** Home
  { path: '', redirectTo: '/botones', pathMatch: 'full' }, // Ruta por defecto
  { path: '**', redirectTo: '/botones' } // Ruta comodín para manejar errores 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
