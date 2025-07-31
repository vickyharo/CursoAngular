import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//->Routing
import { HomeRoutingModule } from './home-routing.module';

//->Componentes compartidos entre los modulos
import {SharedModule} from '../../shared/shared.module';

//->Angular Material
import {SharedAngularMaterialModule} from '../../shared-angular-material/shared-angular-material.module'

//->Componentes del modulo
import { LoginComponent } from './login/login.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';


@NgModule({
  declarations: [
    LoginComponent,
    AccessDeniedComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    SharedAngularMaterialModule
  ]
})
export class HomeModule { }
