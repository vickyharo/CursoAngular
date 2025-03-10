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



//-> Mis componentes
import { BotonesComponent } from './components/botones/botones.component';
import { FormulariosInputComponent } from './components/formularios-input/formularios-input.component';
//import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { LogoComponent } from './components/logo/logo.component';
import { LayoutTabsComponent } from './components/layout-tabs/layout-tabs.component';
import { FormulariosSelectoresComponent } from './components/formularios-selectores/formularios-selectores.component';

@NgModule({
  declarations: [
    AppComponent,
    BarraLateralComponent,
    BotonesComponent,
   // AutocompleteComponent,
    LogoComponent,
   FormulariosInputComponent,
   LayoutTabsComponent,
   FormulariosSelectoresComponent
  ],
  imports: [
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
       MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
