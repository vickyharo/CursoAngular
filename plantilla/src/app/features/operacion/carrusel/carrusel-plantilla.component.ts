import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, AfterViewChecked } from '@angular/core';
//Angular Material - Formulario
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from "@angular/material/icon";
// Componentes
import { ButtonBackComponent } from '../../../shared/components/button-back/button-back.component';
import { SearchBoxComponent } from '../../../shared/components/search-box/search-box.component';
import { BaseModalComponent } from '../../../shared/components/base-modal/base-modal.component';
import { CarruselBaseComponent } from '../../../shared/components/carrusel-base/carrusel-base.component';
import { Fideicomiso } from '../../../core/models/fideicomiso.model';
//Constantes
import { constants } from '../../../core/consts/constants';


@Component({
  selector: 'carrusel-plantilla',
  standalone: true,
  imports: [
    ButtonBackComponent,
    SearchBoxComponent,
    CarruselBaseComponent,
    CommonModule,
    ReactiveFormsModule,
    ButtonBackComponent,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BaseModalComponent,
    MatIconModule
  ],
  templateUrl: './carrusel-plantilla.component.html'
})
export class CarruselPlantillaComponent implements OnInit, AfterViewChecked {
  //limpia los datos seteados y crea tus propos grupos de formulario

  //Modal confiramcion
  formLogin: FormGroup;
  hideUsername: boolean = true;
  hidePassword: boolean = true;
  MAX_CHAR_USERNAME = constants.MAX_CHAR_USERNAME;
  MAX_CHAR_PASSWORD = constants.MAX_CHAR_PASSWORD;
  CHAR_TOKEN_LENGTH = constants.CHAR_TOKEN_LENGTH;
  //------

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) {
    // Definir formulario reactivo
    this.formLogin = this.fb.group({
      username: [''],
      password: [],
      detalle: [''],
    });
  }

  ngAfterViewChecked(): void {
    this.cd.detectChanges();
  }

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

    //Form 2
    this.form2 = this.fb.group({
      sucursal: [''],
      ejecutivo: [''],
      fecha: [''],
      personalidad: [''],
      nombre: [''],
      segundoNombre: [''],
      apellidoPaterno: [''],
      apellidoMaterno: ['']
    });

    this.form.get('pais')?.valueChanges.subscribe((pais: string) => {
      this.estados = this.estadosPorPais[pais] || [];
      this.form.get('estado')?.setValue('');
      this.ciudades = [];
    });

    this.form.get('estado')?.valueChanges.subscribe((estado: string) => {
      this.ciudades = this.ciudadesPorEstado[estado] || [];
      this.form.get('ciudad')?.setValue('');
    });
  }


  onIndexClick(index: number): void {
    console.log('Se hizo clic en', index);
  }

  public indices = Array.from({ length: 10 }, (_, i) => i);

  //Confiramcion - Modal
  apiError: string | null = null;
  validatePassword(event: Event) {
    const pass = event.target as HTMLInputElement;

    if (pass.value.length !== 0)
      this.formLogin.get('password')?.markAsTouched();

  }

  getErrorMessage(controlName: string, fieldName: string): string {
    const control = this.formLogin.get(controlName);

    if (control?.hasError('minlength')) {
      const requiredLength = control.errors?.['minlength'].requiredLength;
      return `${fieldName} debe tener al menos ${requiredLength} caracteres.`;
    }
    if (control?.hasError('maxlength')) {
      const requiredLength = control.errors?.['maxlength'].requiredLength;
      return `${fieldName} no debe tener más de ${requiredLength} caracteres.`;
    }
    return '';
  }

  //Forumualrio
  form!: FormGroup;
  form2!: FormGroup;

  tipoInmuebles = [
    { value: 'casa', label: 'Casa' },
    { value: 'departamento', label: 'Departamento' },
    { value: 'oficina', label: 'Oficina' },
    { value: 'bodega', label: 'Bodega' },
    { value: 'local', label: 'Local comercial' },
    { value: 'terreno', label: 'Terreno' },
    { value: 'nave', label: 'Nave industrial' },
    { value: 'consultorio', label: 'Consultorio' },
    { value: 'hospital', label: 'Hospital o Clínica' },
    { value: 'hotel', label: 'Hotel / Posada' },
    { value: 'escuela', label: 'Escuela / Universidad' },
    { value: 'otros', label: 'Otros' },
    { value: 'otras', label: 'Otras' }
  ];

  paises = [
    { value: 'MX', label: 'México' },
    { value: 'AR', label: 'Argentina' }
  ];

  estados: { value: string, label: string }[] = [];
  ciudades: { value: string, label: string }[] = [];

  estadosPorPais: { [key: string]: { value: string, label: string }[] } = {
    MX: [
      { value: 'JAL', label: 'Jalisco' },
      { value: 'CDMX', label: 'Ciudad de México' }
    ],
    AR: [
      { value: 'BA', label: 'Buenos Aires' },
      { value: 'CBA', label: 'Córdoba' }
    ]
  };

  ciudadesPorEstado: { [key: string]: { value: string, label: string }[] } = {
    JAL: [
      { value: 'GDL', label: 'Guadalajara' },
      { value: 'ZAP', label: 'Zapopan' }
    ],
    CDMX: [
      { value: 'COY', label: 'Coyoacán' },
      { value: 'IZT', label: 'Iztapalapa' }
    ],
    BA: [
      { value: 'CAP', label: 'Capital' }
    ],
    CBA: [
      { value: 'COR', label: 'Córdoba Capital' }
    ]
  };

  fideicomisos: Fideicomiso[] = [
    {
      id: '30303',
      nombre: 'Fideicomiso Alfa',
      tipo: 'Inmueble',
      calle: 'Av. Reforma',
      cp: '01010',
      noExt: '12',
      noInt: '3B',
      colonia: 'Juárez',
      pais: 'MX',
      estado: 'CDMX',
      ciudad: 'COY',
      superficie: 150,
      valorTotal: 2500000,
      estatus: 'activo',
      fechaRegistro: '2024-06-01',
      inmuebleConcesion: true,
      inmuebleEmbargo: false,
      inmuebleCredito: true
    },
    {
      id: '30000',
      nombre: 'Fideicomiso Beta',
      tipo: 'Terreno',
      calle: 'Calle Morelos',
      cp: '02020',
      noExt: '45',
      noInt: '',
      colonia: 'Centro',
      pais: 'MX',
      estado: 'JAL',
      ciudad: 'GDL',
      superficie: 400,
      valorTotal: 3800000,
      estatus: 'inactivo',
      fechaRegistro: '2024-01-15',
      inmuebleConcesion: false,
      inmuebleEmbargo: true,
      inmuebleCredito: false
    },
    {
      id: '30033',
      nombre: 'Fideicomiso Gamma',
      tipo: 'Oficina',
      calle: 'Insurgentes',
      cp: '03030',
      noExt: '100',
      noInt: '9',
      colonia: 'Del Valle',
      pais: 'MX',
      estado: 'CDMX',
      ciudad: 'IZT',
      superficie: 250,
      valorTotal: 3000000,
      estatus: 'activo',
      fechaRegistro: '2024-03-20',
      inmuebleConcesion: false,
      inmuebleEmbargo: false,
      inmuebleCredito: true
    }
  ];

  sucursales = [
    { value: 'TB', label: 'Torres Bansi' },
    { value: 'OF', label: 'Oficinas' },
    { value: 'OT', label: 'Otro' }
  ];

  ejecutivos = [
    { value: '01', label: 'Felipe de jesus' },
    { value: '02', label: 'Ana Viramontes' },
    { value: '03', label: 'Jose Antonio' }
  ];

  personalidades = [
    { value: '01', label: 'Fisica' },
    { value: '02', label: 'Moral' }
  ];


  //Modales
  showModal: Record<string, boolean> = {};
  cerrarModal(key: string) {
    this.showModal[key] = false;
  }
  canSave() {
    this.showModal['btnSave'] = true;
  }
}
