import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//-> Mis modulos
import { BotonesComponent } from './components/botones/botones.component';
import { FormulariosInputComponent } from './components/formularios-input/formularios-input.component';
import { MatRadioButtonYMatRadioGroupComponent } from './components/mat-radio-button-y-mat-radio-group/mat-radio-button-y-mat-radio-group.component';
import { MatCheckboxComponent } from './components/mat-checkbox/mat-checkbox.component';
import { MatSelectComponent } from './components/mat-select/mat-select.component';
import { MatSliderComponent } from './components/mat-slider/mat-slider.component';

//----------------------------------------------

import { FormulariosSelectoresComponent } from './components/formularios-selectores/formularios-selectores.component';
import { LogoComponent } from './components/logo/logo.component';
import { LayoutTabsComponent } from './components/layout-tabs/layout-tabs.component';
//import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { MatTableComponent} from './components/mat-table/mat-table.component';
import { MatTableYMatPaginatiorComponent } from './components/mat-table-y-mat-paginatior/mat-table-y-mat-paginatior.component';
import { MatTableYMatSortComponent } from './components/mat-table-y-mat-sort/mat-table-y-mat-sort.component';

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
    path:'formularios-input',
    component:FormulariosInputComponent
  },
  {
    path:'mat-radio-button-y-mat-radio-group',
    component:MatRadioButtonYMatRadioGroupComponent
  },
  {
    path:'mat-checkbox',
    component:MatCheckboxComponent
  },
  {
    path:'mat-select',
    component:MatSelectComponent
  },
  {
    path:'mat-slider',
    component:MatSliderComponent
  },
  /********************************************* */
  {
    path:'layout-tabs',
    component:LayoutTabsComponent
  },
  {
    path:'formularios-selectores',
    component:FormulariosSelectoresComponent
  },
  
  {
    path:'logo',
    component:LogoComponent
  },
  {
    path:'mat-table',
    component:MatTableComponent
  },
  {
    path:'mat-table-y-mat-paginatior',
    component:MatTableYMatPaginatiorComponent
  },
  {
    path:'mat-table-y-mat-sort',
    component:MatTableYMatSortComponent
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
