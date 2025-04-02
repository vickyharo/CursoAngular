import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

//-> Uso de servicios
import { HttpClientModule } from '@angular/common/http';

//->Todos los componentes usados por angular material
import {CdkStepperModule} from '@angular/cdk/stepper';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { A11yModule } from '@angular/cdk/a11y';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { LayoutModule } from '@angular/cdk/layout';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatSliderModule } from '@angular/material/slider';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

//->Routing del modulo
import { AppRoutingModule } from './app-routing.module';

//->Barra de navegacion
import { BarraLateralComponent } from './components/home/barra-lateral/barra-lateral.component';

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
import { MatAutocompleteComponent } from './components/angular-material-ejemplos/mat-autocomplete/mat-autocomplete.component';
import { DialogoarticuloComponent } from './components/angular-material-ejemplos/mat-dialog/dialogoarticulo/dialogoarticulo.component';
import { MatTableEncabezadosDivididosComponent } from './components/angular-material-ejemplos/mat-table-encabezados-divididos/mat-table-encabezados-divididos.component';

//******** Formularios reactivos
import { ReactiveFormsModuleYFormControlComponent } from './components/formularios-reactivos/reactive-forms-module-y-form-control/reactive-forms-module-y-form-control.component';
import { FormGroupComponent } from './components/formularios-reactivos/form-group/form-group.component';
import { ControlesCheckboxRadioYSelectComponent } from './components/formularios-reactivos/controles-checkbox-radio-y-select/controles-checkbox-radio-y-select.component';
import { MatTableResizeColumnComponent } from './components/angular-material-ejemplos/mat-table-resize-column/mat-table-resize-column.component';

@NgModule({
  declarations: [
    AppComponent,
    BarraLateralComponent,

    /*Ejemplos angular material*/
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
    MatAutocompleteComponent,
    DialogoarticuloComponent,
    MatTableEncabezadosDivididosComponent,

    /*Formularios reactivos*/
    ReactiveFormsModuleYFormControlComponent,
    FormGroupComponent,
    ControlesCheckboxRadioYSelectComponent,
    MatTableResizeColumnComponent,

  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,

    CdkStepperModule,
    A11yModule,
    ScrollingModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    FormsModule,
    MatSliderModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatGridListModule,
    MatAccordion,
    MatExpansionModule,
    MatDividerModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatListModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatProgressBarModule,
    LayoutModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatRadioModule,
    MatSlideToggleModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
