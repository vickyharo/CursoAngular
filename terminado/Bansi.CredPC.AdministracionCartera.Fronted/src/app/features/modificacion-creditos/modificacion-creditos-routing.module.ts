import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './../../core/guards/auth.guard';
import { RegistrarSolicitudComponentComponent } from './cambio-cuenta/registrar-solicitud-component/registrar-solicitud-component.component';
import { AutorizarSolicitudComponentComponent } from './cambio-cuenta/autorizar-solicitud-component/autorizar-solicitud-component.component';
import { RegistrarSolicitudLineaComponentComponent } from './cambio-linea/registrar-solicitud-linea-component/registrar-solicitud-linea-component.component';
import { AutorizarSolicitudLineaComponentComponent } from './cambio-linea/autorizar-solicitud-linea-component/autorizar-solicitud-linea-component.component';
import { BitacoraCambioCuentaComponent } from './consultas/bitacora-cambio-cuenta/bitacora-cambio-cuenta.component';
import { BitacoraCambioMontoLineaComponent } from './consultas/bitacora-cambio-monto-linea/bitacora-cambio-monto-linea.component';

const routes: Routes =[
   /*-------------------------------------------- Cambio de Cuenta Cheques -------------------------------------------------- */
  { path: 'cambio-cuenta/registrar-solicitud', component: RegistrarSolicitudComponentComponent, canActivate: [AuthGuard] },
   { path: 'cambio-cuenta/autorizar-solicitud', component: AutorizarSolicitudComponentComponent, canActivate: [AuthGuard] },
   /*-------------------------------------------- Cambio de Monto de Linea Autorizada -------------------------------------------------- */
   { path: 'cambio-linea/registrar-solicitud', component: RegistrarSolicitudLineaComponentComponent, canActivate: [AuthGuard] },
   { path: 'cambio-linea/autorizar-solicitud', component: AutorizarSolicitudLineaComponentComponent, canActivate: [AuthGuard] },
   /*------------------------------------------------Bitacora----------------------------------- */
   { path: 'consultas/bitacora-cambio-cuenta', component: BitacoraCambioCuentaComponent, canActivate: [AuthGuard] },
   { path: 'consultas/bitacora-cambio-linea', component: BitacoraCambioMontoLineaComponent, canActivate: [AuthGuard] },
   /*---------------------------------------------------------------------------------------------------------------- */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModificacionCreditosRoutingModule { }
