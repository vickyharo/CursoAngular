import { Routes } from '@angular/router';
import { LayoutVerticalComponent } from './shared/components/layout-vertical/layout-vertical.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
    // Login (obligatorio siempre)
    {
        path: 'sign-in', loadComponent: () => import('./features/seguridad/login/login.component').then((m) => m.LoginComponent)
    },

    // Layout principal y rutas protegidas
    {
        path: '',
        component: LayoutVerticalComponent,
        //canActivateChild: [AuthGuard], 
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },

            // Consultas
            {
                path: 'consultas',
                children: [
                    {
                        path: 'consulta-plantilla',
                        loadComponent: () =>
                            import('./features/consultas/consulta-plantilla/consulta-plantilla.component').then(
                                (m) => m.ConsultaPlanillaComponent
                            )
                    }
                ]
            },

            // Operaciones
            {
                path: 'operacion',
                children: [
                    {
                        path: 'alta-plantilla',
                        loadComponent: () =>
                            import('./features/operacion/alta-plantilla/alta-plantilla.component').then(
                                (m) => m.AltaPlantillaComponent
                            )
                    },
                    {
                        path: 'plantilla-controles',
                        loadComponent: () =>
                            import('./features/operacion/plantilla-controles/plantilla-controles.component').then(
                                (m) => m.PlantillaControlesComponent
                            )
                    },
                    {
                        path: 'carrusel-plantilla',
                        loadComponent: () =>
                            import('./features/operacion/carrusel/carrusel-plantilla.component').then(
                                (m) => m.CarruselPlantillaComponent
                            )
                    }
                ]
            },
            // Página 404 standalone
            {
                path: '404',
                loadComponent: () =>
                    import('./shared/components/errors/not-found/not-found.component').then(
                        (m) => m.NotFoundComponent
                    )
            }
        ]
    },

    // Ruta comodín para cualquier error
    {
        path: '**',
        redirectTo: '404'
    }
];
