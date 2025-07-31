import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//->Routing
import { ModificacionCreditosRoutingModule } from './modificacion-creditos-routing.module';

//->Componentes compartidos entre los modulos
import { SharedModule } from '../../shared/shared.module';

//->Angular Material
import { SharedAngularMaterialModule } from '../../shared-angular-material/shared-angular-material.module'

//->ngx-bootstrap
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BsModalService } from 'ngx-bootstrap/modal';

//->Componentes del modulo
import { RegistrarSolicitudComponentComponent } from './cambio-cuenta/registrar-solicitud-component/registrar-solicitud-component.component';
import { BuscarCreditoFormComponent } from './cambio-cuenta/registrar-solicitud-component/buscar-credito-form/buscar-credito-form.component';
import { CuentasCreditoFormComponent } from './cambio-cuenta/registrar-solicitud-component/cuentas-credito-form/cuentas-credito-form.component';
import { DetalleCuentaComponentComponent } from './cambio-cuenta/registrar-solicitud-component/detalle-cuenta-component/detalle-cuenta-component.component';
import { NuevaCuentaModalComponent } from './cambio-cuenta/registrar-solicitud-component/nueva-cuenta-modal/nueva-cuenta-modal.component';
import { SeleccionCreditoModalComponent } from './cambio-cuenta/registrar-solicitud-component/seleccion-credito-modal/seleccion-credito-modal.component';
import { AutorizarSolicitudComponentComponent } from './cambio-cuenta/autorizar-solicitud-component/autorizar-solicitud-component.component';
import { DetalleSolicitudModalComponent } from './cambio-cuenta/autorizar-solicitud-component/detalle-solicitud-modal/detalle-solicitud-modal.component';
import { RegistrarSolicitudLineaComponentComponent } from './cambio-linea/registrar-solicitud-linea-component/registrar-solicitud-linea-component.component';
import { BuscarLineaFormComponent } from './cambio-linea/registrar-solicitud-linea-component/buscar-linea-form/buscar-linea-form.component';
import { CambiarMontoFormComponent } from './cambio-linea/registrar-solicitud-linea-component/cambiar-monto-form/cambiar-monto-form.component';
import { SeleccionLineaModalComponent } from './cambio-linea/registrar-solicitud-linea-component/seleccion-linea-modal/seleccion-linea-modal.component';
import { AutorizarSolicitudLineaComponentComponent } from './cambio-linea/autorizar-solicitud-linea-component/autorizar-solicitud-linea-component.component';
import { DetalleSolicitudLineaModalComponent } from './cambio-linea/autorizar-solicitud-linea-component/detalle-solicitud-linea-modal/detalle-solicitud-linea-modal.component';
import { BitacoraCambioCuentaComponent } from './consultas/bitacora-cambio-cuenta/bitacora-cambio-cuenta.component';
import { BuscarCambioCuentaFormComponent } from './consultas/bitacora-cambio-cuenta/buscar-cambio-cuenta-form/buscar-cambio-cuenta-form.component';
import { BitacoraCambioMontoLineaComponent } from './consultas/bitacora-cambio-monto-linea/bitacora-cambio-monto-linea.component';
import { BuscarMontoLineaFormComponent } from './consultas/bitacora-cambio-monto-linea/buscar-monto-linea-form/buscar-monto-linea-form.component';

@NgModule({
  declarations: [
    RegistrarSolicitudComponentComponent,
    BuscarCreditoFormComponent,
    CuentasCreditoFormComponent,
    DetalleCuentaComponentComponent,
    NuevaCuentaModalComponent,
    SeleccionCreditoModalComponent,
    AutorizarSolicitudComponentComponent,
    DetalleSolicitudModalComponent,
    RegistrarSolicitudLineaComponentComponent,
    BuscarLineaFormComponent,
    CambiarMontoFormComponent,
    SeleccionLineaModalComponent,
    AutorizarSolicitudLineaComponentComponent,
    DetalleSolicitudModalComponent,
    DetalleSolicitudLineaModalComponent,
    BitacoraCambioCuentaComponent,
    BuscarCambioCuentaFormComponent,
    BitacoraCambioMontoLineaComponent,
    BuscarMontoLineaFormComponent
  ],
  imports: [
    CommonModule,
    CarouselModule,
    ModificacionCreditosRoutingModule,
    SharedModule,
    SharedAngularMaterialModule,
  ],
  providers: [BsModalService ]
})
export class ModificacionCreditosModule { }
