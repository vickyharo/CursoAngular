import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//-> Mis componentes
//******** Ejemplos angular material
import { BotonesComponent } from './components/angular-material-ejemplos/botones/botones.component';
import { FormulariosInputComponent } from './components/angular-material-ejemplos/formularios-input/formularios-input.component';
import { MatRadioButtonYMatRadioGroupComponent } from './components/angular-material-ejemplos/mat-radio-button-y-mat-radio-group/mat-radio-button-y-mat-radio-group.component';
import { MatCheckboxComponent } from './components/angular-material-ejemplos/mat-checkbox/mat-checkbox.component';
import { MatSelectComponent } from './components/angular-material-ejemplos/mat-select/mat-select.component';
import { MatSliderComponent } from './components/angular-material-ejemplos/mat-slider/mat-slider.component';
import { MatSlideToggleComponent } from './components/angular-material-ejemplos/mat-slide-toggle/mat-slide-toggle.component';
import { LayoutTabsComponent } from './components/angular-material-ejemplos/layout-tabs/layout-tabs.component';
import { MatTableComponent } from './components/angular-material-ejemplos/mat-table/mat-table.component';
import { MatTableYMatPaginatiorComponent } from './components/angular-material-ejemplos/mat-table-y-mat-paginatior/mat-table-y-mat-paginatior.component';
import { MatTableYMatSortComponent } from './components/angular-material-ejemplos/mat-table-y-mat-sort/mat-table-y-mat-sort.component';
import { MatTableYFiltrarDatosComponent } from './components/angular-material-ejemplos/mat-table-y-filtrar-datos/mat-table-y-filtrar-datos.component';
import { MatDialogComponent } from './components/angular-material-ejemplos/mat-dialog/mat-dialog.component';
import { MatMenuComponent } from './components/angular-material-ejemplos/mat-menu/mat-menu.component';
import { MatMenuAnidadosComponent } from './components/angular-material-ejemplos/mat-menu-anidados/mat-menu-anidados.component';
import { MatCardComponent } from './components/angular-material-ejemplos/mat-card/mat-card.component';
import { MatToolbarComponent } from './components/angular-material-ejemplos/mat-toolbar/mat-toolbar.component';
import { MatExpansionPanelComponent } from './components/angular-material-ejemplos/mat-expansion-panel/mat-expansion-panel.component';
import { MatTableEncabezadosDivididosComponent } from './components/angular-material-ejemplos/mat-table-encabezados-divididos/mat-table-encabezados-divididos.component';

//******** Formularios reactivos
import { ReactiveFormsModuleYFormControlComponent } from './components/formularios-reactivos/reactive-forms-module-y-form-control/reactive-forms-module-y-form-control.component';
import { FormGroupComponent } from './components/formularios-reactivos/form-group/form-group.component';
import { ControlesCheckboxRadioYSelectComponent } from './components/formularios-reactivos/controles-checkbox-radio-y-select/controles-checkbox-radio-y-select.component';
import { FormGroupAnidadosComponent } from './components/formularios-reactivos/form-group-anidados/form-group-anidados.component';
import { ValidacionesEstandaresDeAngularComponent } from './components/formularios-reactivos/validaciones-estandares-de-angular/validaciones-estandares-de-angular.component';
import { ValidacionesPersonalizadasComponent } from './components/formularios-reactivos/validaciones-personalizadas/validaciones-personalizadas.component';
import { FormBuilderComponent } from './components/formularios-reactivos/form-builder/form-builder.component';

//******** Componentes
import { PasarDatosDeLaComponentePadreALaComponenteHijaComponent } from './components/componentes/pasar-datos-de-la-componente-padre-a-la-componente-hija/pasar-datos-de-la-componente-padre-a-la-componente-hija.component';
import { DisparoDeEventosDeLaComponenteHijaALaComponentePadreComponent } from './components/componentes/disparo-de-eventos-de-la-componente-hija-a-la-componente-padre/disparo-de-eventos-de-la-componente-hija-a-la-componente-padre.component';
import { LlamarAMetodosDeLaComponenteHijaDesdeElTemplateDelPadreComponent } from './components/componentes/llamar-a-metodos-de-la-componente-hija-desde-el-template-del-padre/llamar-a-metodos-de-la-componente-hija-desde-el-template-del-padre.component';
import { EnlaceDePropiedadesPropertyBindingComponent } from './components/componentes/enlace-de-propiedades-property-binding/enlace-de-propiedades-property-binding.component';

//******** Directivas estructurales
import { NgModelComponent } from './components/directivas/ng-model/ng-model.component';
import { NgifNgforComponent } from './components/directivas/ngif-ngfor/ngif-ngfor.component';
import { NgForComponent } from './components/directivas/ng-for/ng-for.component';
import { NgIfComponent } from './components/directivas/ng-if/ng-if.component';
import { NgSwitchCaseComponent } from './components/directivas/ng-switch-case/ng-switch-case.component';
import { NgStyleComponent } from './components/directivas/ng-style/ng-style.component';
import { NgClassComponent } from './components/directivas/ng-class/ng-class.component';
import { DirectivasAtributoCreacionComponent } from './components/directivas/directivas-atributo-creacion/directivas-atributo-creacion.component';
import { DirectivasAtributoPropiedadesComponent } from './components/directivas/directivas-atributo-propiedades/directivas-atributo-propiedades.component';
import { DirectivasAtributoEventosComponent } from './components/directivas/directivas-atributo-eventos/directivas-atributo-eventos.component';
import { DirectivasEstructuralesCreacionComponent } from './components/directivas/directivas-estructurales-creacion/directivas-estructurales-creacion.component';

//******** Pipes
import { PipesDefinicionComponent } from './components/pipes/pipes-definicion/pipes-definicion.component';
import { PipesPersonalizadasComponent } from './components/pipes/pipes-personalizadas/pipes-personalizadas.component';

//******** Servicios
import { PeticionJsonServidorComponent } from './components/Servicios/peticion-json-servidor/peticion-json-servidor.component';
import { ConceptosPasosCreacionComponent } from './components/Servicios/conceptos-pasos-creacion/conceptos-pasos-creacion.component';
import { RecuperarDatosServidorWebComponent } from './components/Servicios/recuperar-datos-servidor-web/recuperar-datos-servidor-web.component';

//******** Otros
import { InterpolacionComponent } from './components/Otros/interpolacion/interpolacion.component';
import { EventosComponent } from './components/Otros/eventos/eventos.component';

const routes: Routes = [
  //******** Ejemplos angular material
  { path: 'botones', component: BotonesComponent },
  { path: 'formularios-input', component: FormulariosInputComponent },
  { path: 'mat-radio-button-y-mat-radio-group', component: MatRadioButtonYMatRadioGroupComponent },
  { path: 'mat-checkbox', component: MatCheckboxComponent },
  { path: 'mat-select', component: MatSelectComponent },
  { path: 'mat-slider', component: MatSliderComponent },
  { path: 'mat-slide-toggle', component: MatSlideToggleComponent },
  { path: 'layout-tabs', component: LayoutTabsComponent },
  { path: 'mat-table', component: MatTableComponent },
  { path: 'mat-table-y-mat-paginatior', component: MatTableYMatPaginatiorComponent },
  { path: 'mat-table-y-mat-sort', component: MatTableYMatSortComponent },
  { path: 'mat-table-y-filtrar-datos', component: MatTableYFiltrarDatosComponent },
  { path: 'mat-dialog', component: MatDialogComponent },
  { path: 'mat-menu', component: MatMenuComponent },
  { path: 'mat-menu-anidado', component: MatMenuAnidadosComponent },
  { path: 'mat-card', component: MatCardComponent },
  { path: 'mat-toolbar', component: MatToolbarComponent },
  { path: 'mat-expansion-panel', component: MatExpansionPanelComponent },
  { path: 'mat-table-encabezados-divididos', component: MatTableEncabezadosDivididosComponent },
  //******** Formularios reactivos
  { path: 'reactive-forms-module-y-form-control', component: ReactiveFormsModuleYFormControlComponent },
  { path: 'form-group', component: FormGroupComponent },
  { path: 'controles-checkbox-radio-y-select', component: ControlesCheckboxRadioYSelectComponent },
  { path: 'form-group-anidados', component: FormGroupAnidadosComponent },
  { path: 'validaciones-estandares-de-angular', component: ValidacionesEstandaresDeAngularComponent },
  { path: 'validaciones-personalizadas', component: ValidacionesPersonalizadasComponent },
  { path: 'form-builder', component: FormBuilderComponent },
  //******** Componentes
  { path: 'pasar-datos-de-la-componente-padre-a-la-componente-hija', component: PasarDatosDeLaComponentePadreALaComponenteHijaComponent },
  { path: 'disparo-de-eventos-de-la-componente-hija-a-la-componente-padre', component: DisparoDeEventosDeLaComponenteHijaALaComponentePadreComponent },
  { path: 'llamar-a-metodos-de-la-componente-hija-desde-el-template-del-padre', component: LlamarAMetodosDeLaComponenteHijaDesdeElTemplateDelPadreComponent },
  { path: 'enlace-de-propiedades-property-binding', component: EnlaceDePropiedadesPropertyBindingComponent },
  //******** Directivas
  { path: 'ng-model', component: NgModelComponent },
  { path: 'ngif-ngfor', component: NgifNgforComponent },
  { path: 'ng-for', component: NgForComponent },
  { path: 'ng-if', component: NgIfComponent },
  { path: 'ng-switch-case', component: NgSwitchCaseComponent },
  { path: 'ng-style', component: NgStyleComponent },
  { path: 'ng-class', component: NgClassComponent },
  { path: 'directivas-atributo-creacion', component: DirectivasAtributoCreacionComponent },
  { path: 'directivas-atributo-propiedades', component: DirectivasAtributoPropiedadesComponent },
  { path: 'directivas-atributo-eventos', component: DirectivasAtributoEventosComponent },
  { path: 'directivas-estructurales-creacion', component: DirectivasEstructuralesCreacionComponent },
  //********* Pipes
  { path: 'pipes-definicion', component: PipesDefinicionComponent },
  { path: 'pipes-personalizadas', component: PipesPersonalizadasComponent },
  //********* Servicios
  { path: 'peticion-json-servidor', component: PeticionJsonServidorComponent },
  { path: 'conceptos-pasos-creacion', component: ConceptosPasosCreacionComponent },
  { path: 'recuperar-datos-servidor-web', component: RecuperarDatosServidorWebComponent },
  //********* Otros
  { path: 'interpolacion', component: InterpolacionComponent },
  { path: 'eventos', component: EventosComponent },

  //******** Home
  { path: '', redirectTo: '/botones', pathMatch: 'full' }, // Ruta por defecto
  { path: '**', redirectTo: '/botones' } // Ruta comodín para manejar errores 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
