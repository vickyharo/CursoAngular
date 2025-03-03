import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//-> Mis modulos
import { BotonesComponent } from './components/botones/botones.component';
import { LogoComponent } from './components/logo/logo.component';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';

const routes: Routes = [
  {
    path:'',
    component:BotonesComponent
  },
  {
    path:'botones',
    component:BotonesComponent
  },
  {
    path:'logo',
    component:LogoComponent
  },
  {
    path:'autocomplete',
    component:AutocompleteComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
