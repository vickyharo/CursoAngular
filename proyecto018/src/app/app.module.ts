import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';



//-> Uso de servicios
import { HttpClientModule } from '@angular/common/http';

//-> Navbar
import { BarraLateralComponent } from './components/barra-lateral/barra-lateral.component';

//-> Angular material
import { MaterialModule } from './components/material/material.module'
/*
//-> Componentes de ejemplo de angular material
import { AngularMaterialModuleModule } from './components/angular-material-module/angular-material-module.module'*/

@NgModule({
  declarations: [
    AppComponent,
    BarraLateralComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    //AngularMaterialModuleModule, //-> Modulo creado con los componentes de angular material
    MaterialModule, //-> libreria angular material
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
