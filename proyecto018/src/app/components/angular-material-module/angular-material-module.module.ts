import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
import { DialogoarticuloComponent } from './mat-dialog/dialogoarticulo/dialogoarticulo.component';
import { MatMenuComponent } from './mat-menu/mat-menu.component';
import { MatMenuAnidadosComponent } from './mat-menu-anidados/mat-menu-anidados.component';
import { MatCardComponent } from './mat-card/mat-card.component';
import { MatToolbarComponent } from './mat-toolbar/mat-toolbar.component';
import { MatExpansionPanelComponent } from './mat-expansion-panel/mat-expansion-panel.component';
import { MatAutocompleteComponent } from './mat-autocomplete/mat-autocomplete.component';

@NgModule({
  imports: [
    CommonModule
  ],
  /*exportar los componentes que acabamos de crear para que otros modulos puedan utilizarlos*/
  exports: [
    BotonesComponent,
    FormulariosInputComponent,
    MatRadioButtonYMatRadioGroupComponent,
    MatCheckboxComponent,
    MatSelectComponent,
    MatSliderComponent,
    MatSlideToggleComponent,
    LayoutTabsComponent,
    MatTableComponent,
    MatTableYMatPaginatiorComponent,
    MatTableYMatSortComponent,
    MatTableYFiltrarDatosComponent,
    MatDialogComponent,
    DialogoarticuloComponent,
    MatMenuComponent,
    MatMenuAnidadosComponent,
    MatCardComponent,
    MatToolbarComponent,
    MatExpansionPanelComponent,
    MatAutocompleteComponent
  ],
  declarations: [
    BotonesComponent,
    FormulariosInputComponent,
    MatRadioButtonYMatRadioGroupComponent,
    MatCheckboxComponent,
    MatSelectComponent,
    MatSliderComponent,
    MatSlideToggleComponent,
    LayoutTabsComponent,
    MatTableComponent,
    MatTableYMatPaginatiorComponent,
    MatTableYMatSortComponent,
    MatTableYFiltrarDatosComponent,
    MatDialogComponent,
    DialogoarticuloComponent,
    MatMenuComponent,
    MatMenuAnidadosComponent,
    MatCardComponent,
    MatToolbarComponent,
    MatExpansionPanelComponent,
    MatAutocompleteComponent
  ]
})
export class AngularMaterialModuleModule { }
