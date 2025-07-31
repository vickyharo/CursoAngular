import { Component } from '@angular/core';
import { Router } from '@angular/router';
//Componentes
import { SearchBoxComponent } from "../../../shared/components/search-box/search-box.component";
import { DynamicTableComponent } from '../../../shared/components/dynamic-table/dynamic-table.component';
import { ActionButtonsComponent } from '../../../shared/components/action-buttons/action-buttons.component';
import { ButtonBackComponent } from '../../../shared/components/button-back/button-back.component';
//Servicios y pipes
import { FilterByKey } from '../../../shared/pipes/filterBykey.pipe';
@Component({
  standalone: true,
  selector: 'consulta-plantilla.component',
  imports: [SearchBoxComponent, ButtonBackComponent, DynamicTableComponent, ActionButtonsComponent, FilterByKey],
  templateUrl: './consulta-plantilla.component.html'
})
export class ConsultaPlanillaComponent {

selectedRow: any = null;
//Filtros
 searchText: string = '';

//Variables para los botones de accion
  routerNew: string = '/registro/fideicomisos-administracion/editar-fideicomiso';
  routerEdit: string = '/registro/fideicomisos-administracion/editar-fideicomiso';

  constructor(
    private router: Router) {

  }
  onRowSelected(fideicomiso: any) {
    console.log('fideicomiso seleccionado:', fideicomiso);
    this.selectedRow = fideicomiso;
  }

  onNew() {
    if (this.selectedRow === null) {
      this.router.navigate(['registro/fideicomisos-administracion/editar-fideicomiso']);
    }
  }

  onEdit() {
    console.log("Valor:", this.selectedRow);
    if (this.selectedRow !== null) {
      this.router.navigate(['registro/fideicomisos-administracion/editar-fideicomiso']);
    }else{
      alert('No has seleccionado ningun fideicomiso')
    }
  }

  onDelete() {
    if (this.selectedRow) {
      const confirmado = confirm('¿Estás seguro de que deseas eliminar este fideicomiso?');
      if (confirmado) {
        const id = this.selectedRow.id;
        // Elimina de la lista local
        this.fideicomisos = this.fideicomisos.filter(item => item.id !== id);
        this.fideicomisos = [...this.fideicomisos.filter(item => item.id !== id)];// Solo para datos harcodeados
        // Limpia selección
        this.selectedRow = null;
        console.log(this.fideicomisos)
      }
    } else {
      alert('No has seleccionado ningun fideicomiso');
    }
  }

  //Harcodear DATOS
  // En lugar de tener un array de strings, crea un array de objetos con key y label
  columns = [
    { key: 'status', label: 'Status' },
    { key: 'id', label: 'ID' },
    { key: 'fideicomiso', label: 'Fideicomiso' },
    { key: 'tipo', label: 'Tipo de inmueble' },
    { key: 'calle', label: 'Calle' },
    { key: 'numero', label: 'Número exterior' }
  ];

  fideicomisos = [
    {
      status: 'Vigente',
      id: '4362',
      fideicomiso: '30330',
      tipo: 'Casa',
      calle: 'Av. Reforma',
      numero: '101'
    },
    {
      status: 'Caducado',
      id: '5642',
      fideicomiso: '30330',
      tipo: 'Departamento',
      calle: 'Insurgentes',
      numero: '202'
    },
    {
      status: 'Vigente',
      id: '5677',
      fideicomiso: '30330',
      tipo: 'Departamento',
      calle: 'Minerva',
      numero: '701'
    }
  ];
}
