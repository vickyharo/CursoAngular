import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//-> Mis modulos
import { BotonesComponent } from './components/botones/botones.component';
import { FormulariosInputComponent } from './components/formularios-input/formularios-input.component';
import { FormulariosSelectoresComponent } from './components/formularios-selectores/formularios-selectores.component';
import { LogoComponent } from './components/logo/logo.component';
import { LayoutTabsComponent } from './components/layout-tabs/layout-tabs.component';
//import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';

const routes: Routes = [
  {
    path:'',
    component:BotonesComponent
  },
  {
    path:'formularios-input',
    component:FormulariosInputComponent
  },
  {
    path:'layout-tabs',
    component:LayoutTabsComponent
  },
  {
    path:'formularios-selectores',
    component:FormulariosSelectoresComponent
  },
  {
    path:'botones',
    component:BotonesComponent
  },
  {
    path:'logo',
    component:LogoComponent
  },
  /*{
    path:'autocomplete',
    component:AutocompleteComponent
  },*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
