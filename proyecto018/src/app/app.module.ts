import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


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
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
