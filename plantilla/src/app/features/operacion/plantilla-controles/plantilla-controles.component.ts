import { Component, OnInit } from '@angular/core';
// Componentes
import { ButtonBackComponent } from '../../../shared/components/button-back/button-back.component';
import { SearchBoxComponent } from '../../../shared/components/search-box/search-box.component';
import { ActionButtonsComponent } from '../../../shared/components/action-buttons/action-buttons.component';
import { DynamicTableComponent } from '../../../shared/components/dynamic-table/dynamic-table.component';
import { BaseModalComponent } from '../../../shared/components/base-modal/base-modal.component';
//Angular Material - Formulario
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
@Component({
  selector: 'app-plantilla-controles',
  standalone: true,
  imports: [ButtonBackComponent, SearchBoxComponent, ActionButtonsComponent, DynamicTableComponent, BaseModalComponent, ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule],
  templateUrl: './plantilla-controles.component.html'
})
export class PlantillaControlesComponent implements OnInit {
  form!: FormGroup;


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      tipoInmueble: [''],
      identificador: [{ value: '0', disabled: true }],
      inmuebleConcesion: [false],
      inmuebleEmbargo: [false],
      inmuebleCredito: [false],
      calle: [''],
      noExt: [''],
      noInt: [''],
      colonia: [''],
      cp: [''],
      pais: [''],
      estado: [''],
      ciudad: [''],
      superficie: [''],
      valorTotal: [''],
      estatus: [''],
      fechaRegistro: [''],
    });
  }


  public indices = Array.from({ length: 10 }, (_, i) => i);
  selectedRow: any = null;
  onRowSelected(fideicomiso: any) {
    this.selectedRow = fideicomiso;
  }
  //Seteo de datos
  columns = [
    { key: 'fideicomiso', label: 'Fideicomiso' },
    { key: 'tipo_persona', label: 'Tipo Persona' },
    { key: 'nombre', label: 'Nombre o razón social' },
    { key: 'paterno', label: 'Paterno' },
    { key: 'materno', label: 'Materno' }
  ];

  data = [
    { id: 1, fideicomiso: '30330', tipo_persona: 'Moral', nombre: 'Inmobiliaria Reforma S.A. de C.V.', paterno: '', materno: '' },
    { id: 2, fideicomiso: '10101', tipo_persona: 'Física', nombre: 'Carlos', paterno: 'Ramírez', materno: 'Gómez' },
    { id: 3, fideicomiso: '20202', tipo_persona: 'Física', nombre: 'Ana', paterno: 'Torres', materno: 'Mendoza' },
    { id: 4, fideicomiso: '30300', tipo_persona: 'Física', nombre: 'Jose', paterno: 'Ochoa', materno: 'Torres' },
    { id: 5, fideicomiso: '30303', tipo_persona: 'Física', nombre: 'John', paterno: 'Red', materno: '' }
  ];
  onIndexClick(index: number): void {
    console.log('Se hizo clic en', index);
  }

}