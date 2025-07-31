import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//->Modulos de la aplicación
import { HomeComponent } from './features/home/home.component';
import { ModificacionCreditosComponent } from './features/modificacion-creditos/modificacion-creditos.component';

const routes: Routes = [
  { path: '', redirectTo: '/home/login', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'modificacion-creditos',
    component: ModificacionCreditosComponent,
    loadChildren: () => import('./features/modificacion-creditos/modificacion-creditos.module').then(m => m.ModificacionCreditosModule)
  },
  {
    path: '**',
    redirectTo: '/home/access-denied' , pathMatch: 'full'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
