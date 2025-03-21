import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

//->Routing del modulo
import { AppRoutingModule } from './app-routing.module';

//->Barra de navegacion
import { BarraLateralComponent } from './shared/barra-lateral/barra-lateral.component';



//-> Mis componentes
import { BotonesComponent } from './components/angular-material-module/botones/botones.component';
import { FormulariosInputComponent } from './components/angular-material-module/formularios-input/formularios-input.component';
import { MatRadioButtonYMatRadioGroupComponent } from './components/angular-material-module/mat-radio-button-y-mat-radio-group/mat-radio-button-y-mat-radio-group.component';
import { MatCheckboxComponent } from './components/angular-material-module/mat-checkbox/mat-checkbox.component';
import { MatSelectComponent } from './components/angular-material-module/mat-select/mat-select.component';
import { MatSliderComponent } from './components/angular-material-module/mat-slider/mat-slider.component';
import { MatSlideToggleComponent } from './components/angular-material-module/mat-slide-toggle/mat-slide-toggle.component';
import { LayoutTabsComponent } from './components/angular-material-module/layout-tabs/layout-tabs.component';
import { MatTableComponent } from './components/angular-material-module/mat-table/mat-table.component';
import { MatTableYMatPaginatiorComponent } from './components/angular-material-module/mat-table-y-mat-paginatior/mat-table-y-mat-paginatior.component';
import { MatTableYMatSortComponent } from './components/angular-material-module/mat-table-y-mat-sort/mat-table-y-mat-sort.component';
import { MatTableYFiltrarDatosComponent } from './components/angular-material-module/mat-table-y-filtrar-datos/mat-table-y-filtrar-datos.component';
import { MatDialogComponent } from './components/angular-material-module/mat-dialog/mat-dialog.component';
import { MatMenuComponent } from './components/angular-material-module/mat-menu/mat-menu.component';
import { MatMenuAnidadosComponent } from './components/angular-material-module/mat-menu-anidados/mat-menu-anidados.component';
import { MatCardComponent } from './components/angular-material-module/mat-card/mat-card.component';
import { MatToolbarComponent } from './components/angular-material-module/mat-toolbar/mat-toolbar.component';
import { MatExpansionPanelComponent } from './components/angular-material-module/mat-expansion-panel/mat-expansion-panel.component';
import { MatAutocompleteComponent } from './components/angular-material-module/mat-autocomplete/mat-autocomplete.component';
import { DialogoarticuloComponent } from './components/angular-material-module/mat-dialog/dialogoarticulo/dialogoarticulo.component';
/*
//-> Uso de servicios
import { HttpClientModule } from '@angular/common/http';

//-> Navbar
import { BarraLateralComponent } from './shared/barra-lateral/barra-lateral.component';

//-> Angular material
import { MaterialModule } from './shared/material/material.module'
/*
//-> Componentes de ejemplo de angular material
import { AngularMaterialModuleModule } from './components/angular-material-module/angular-material-module.module'*/

@NgModule({
  declarations: [
    AppComponent,
    BarraLateralComponent,
   /* BotonesComponent,
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
        MatToolbarComponent,*/
       // MatExpansionPanelComponent,
      //  MatAutocompleteComponent
  ],
  imports: [
   /* HttpClientModule,*/
    BrowserModule,  
    AppRoutingModule,

   // MatAutocompleteComponent
  ],
    
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
