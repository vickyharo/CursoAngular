import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';

import { provideHttpClient, withInterceptors} from '@angular/common/http';
import { authInterceptor } from '@interceptors/auth.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CarouselModule } from 'ngx-bootstrap/carousel';

//->Modulos de la aplicación
import { HomeComponent } from './features/home/home.component';
import { ModificacionCreditosComponent } from './features/modificacion-creditos/modificacion-creditos.component';

//->Modulos compartidos
import { SharedModule } from "./shared/shared.module";
import {SharedAngularMaterialModule} from "./shared-angular-material/shared-angular-material.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'


@NgModule({
  declarations: [
    AppComponent,
    ModificacionCreditosComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    SharedAngularMaterialModule,
    BrowserAnimationsModule
  ],
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
