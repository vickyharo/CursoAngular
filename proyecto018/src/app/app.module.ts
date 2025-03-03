import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarraLateralComponent } from './components/barra-lateral/barra-lateral.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

//-> Mis componentes
import { BotonesComponent } from './components/botones/botones.component';
//import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { LogoComponent } from './components/logo/logo.component';


@NgModule({
  declarations: [
    AppComponent,
    BarraLateralComponent,
    BotonesComponent,
   // AutocompleteComponent,
    LogoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
