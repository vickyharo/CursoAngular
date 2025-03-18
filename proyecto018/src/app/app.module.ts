import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarraLateralComponent } from './components/barra-lateral/barra-lateral.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';

//-> Uso de servicios
import { HttpClientModule } from '@angular/common/http';

//-> Mis componentes
import { BotonesComponent } from './components/botones/botones.component';
import { FormulariosInputComponent } from './components/formularios-input/formularios-input.component';
import { MatRadioButtonYMatRadioGroupComponent } from './components/mat-radio-button-y-mat-radio-group/mat-radio-button-y-mat-radio-group.component';
import { MatCheckboxComponent } from './components/mat-checkbox/mat-checkbox.component';
import { MatSelectComponent } from './components/mat-select/mat-select.component';
import { MatSliderComponent } from './components/mat-slider/mat-slider.component';
import { MatSlideToggleComponent } from './components/mat-slide-toggle/mat-slide-toggle.component';
import { LayoutTabsComponent } from './components/layout-tabs/layout-tabs.component';
import { MatTableComponent } from './components/mat-table/mat-table.component';
import { MatTableYMatPaginatiorComponent } from './components/mat-table-y-mat-paginatior/mat-table-y-mat-paginatior.component';
import { MatTableYMatSortComponent } from './components/mat-table-y-mat-sort/mat-table-y-mat-sort.component';
import { MatTableYFiltrarDatosComponent } from './components/mat-table-y-filtrar-datos/mat-table-y-filtrar-datos.component';
import { MatDialogComponent } from './components/mat-dialog/mat-dialog.component';
import { DialogoarticuloComponent } from './components/mat-dialog/dialogoarticulo/dialogoarticulo.component';
import { MatMenuComponent } from './components/mat-menu/mat-menu.component';
import { MatMenuAnidadosComponent } from './components/mat-menu-anidados/mat-menu-anidados.component';
import { MatCardComponent } from './components/mat-card/mat-card.component';

//import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { LogoComponent } from './components/logo/logo.component';

import { FormulariosSelectoresComponent } from './components/formularios-selectores/formularios-selectores.component';
import { MatToolbarComponent } from './components/mat-toolbar/mat-toolbar.component';








@NgModule({
  declarations: [
    AppComponent,
    BarraLateralComponent,
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

    // AutocompleteComponent,
    LogoComponent,
    FormulariosSelectoresComponent,
    MatCheckboxComponent,
    MatToolbarComponent,



  ],
  imports: [
    HttpClientModule,

    BrowserModule,
    AppRoutingModule,

    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatExpansionModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatRadioModule,
    MatMenuModule,
    MatCheckboxModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
