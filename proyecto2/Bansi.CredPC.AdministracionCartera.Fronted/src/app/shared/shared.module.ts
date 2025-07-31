import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//->Angular Material
import {SharedAngularMaterialModule} from '../shared-angular-material/shared-angular-material.module'

//->Componentes
import { BootAlertaComponent } from './components/boot-alerta/boot-alerta.component';
import { BsiSpinnerComponent } from './components/bsi-spinner/bsi-spinner.component';
import { ConfirmPasswordComponent } from './components/confirm-password/confirm-password.component';
import { FooterComponentComponent } from './components/footer-component/footer-component.component';
import { LayoutComponentComponent } from './components/layout-component/layout-component.component';
import { SidenavComponentComponent } from './components/sidenav-component/sidenav-component.component';
import { TablaComponentComponent } from './components/tabla-component/tabla-component.component';
import { ToolbarComponentComponent } from './components/toolbar-component/toolbar-component.component';

@NgModule({
  declarations: [
    SidenavComponentComponent,
    FooterComponentComponent,
    BsiSpinnerComponent,
    BootAlertaComponent,
    ConfirmPasswordComponent,
    LayoutComponentComponent,
    TablaComponentComponent,
    ToolbarComponentComponent
  ],
  imports: [CommonModule, RouterModule,SharedAngularMaterialModule],
  exports: [
    SidenavComponentComponent,
    FooterComponentComponent,
    BsiSpinnerComponent,
    BootAlertaComponent,
    ConfirmPasswordComponent,
    LayoutComponentComponent,
    TablaComponentComponent,
    ToolbarComponentComponent
  ]
})
export class SharedModule { }
