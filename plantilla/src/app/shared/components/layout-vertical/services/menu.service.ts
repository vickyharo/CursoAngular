import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MenuItem } from '../../../../core/models/menu-item';

@Injectable({ providedIn: 'root' })
export class MenuService {
    private defaultMenu: MenuItem[] = [
        {
            id: 1,
            name: 'Dashboard',
            icon: 'home',
            parentId: null,
            route: '/dashboard',
            subMenu: null
        },
        {
            id: 2,
            name: 'Consultas',
            icon: 'document-magnifying-glass',
            parentId: null,
            route: null,
            subMenu: [
                {
                    id: 21,
                    name: 'Consulta Plantilla',
                    icon: 'viewfinder-circle',
                    parentId: 2,
                    route: '/consultas/consulta-plantilla',
                    subMenu: null
                }
            ]
        },
        {
            id: 3,
            name: 'Operación',
            icon: 'document-text',
            parentId: null,
            route: null,
            subMenu: [
                {
                    id: 31,
                    name: 'Alta Fideicomiso',
                    icon: 'document-check',
                    parentId: 3,
                    route: '/operacion/alta-plantilla',
                    subMenu: null
                },
                {
                    id: 32,
                    name: 'Plantilla controles',
                    icon: 'puzzle-piece',
                    parentId: 3,
                    route: '/operacion/plantilla-controles',
                    subMenu: null
                }
                ,
                {
                    id: 32,
                    name: 'Carrusel plantilla',
                    icon: 'rectangle-group',
                    parentId: 3,
                    route: '/operacion/carrusel-plantilla',
                    subMenu: null
                }
            ]
        }
    ];

    private menuItems = new BehaviorSubject<MenuItem[]>(this.defaultMenu);

    getMenu() {
        return this.menuItems.asObservable();
    }

    setMenu(items: MenuItem[]) {
        this.menuItems.next(items);
    }
}
