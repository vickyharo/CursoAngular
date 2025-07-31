// Incluye formularios reactivos, selección de catálogos, y manipulación de datos
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Angular Material - formularios
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

// Componentes reutilizables
import { ButtonBackComponent } from '../../../shared/components/button-back/button-back.component';
import { SearchBoxComponent } from '../../../shared/components/search-box/search-box.component';
import { ActionButtonsComponent } from '../../../shared/components/action-buttons/action-buttons.component';
import { DynamicTableComponent } from '../../../shared/components/dynamic-table/dynamic-table.component';
import { BaseModalComponent } from '../../../shared/components/base-modal/base-modal.component';
import { CustomSelectComponent } from '../../../shared/components/custom-select/custom-select.component';
import { PaginationControlsComponent } from '../../../shared/components/pagination-controls/pagination-controls.component';

// Modelos y pipes
import { Fideicomiso } from '../../../core/models/fideicomiso.model';
import { FilterByKey } from '../../../shared/pipes/filterBykey.pipe';

@Component({
  selector: 'alta-plantilla',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonBackComponent,
    SearchBoxComponent,
    ActionButtonsComponent,
    DynamicTableComponent,
    BaseModalComponent,
    FilterByKey,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CustomSelectComponent,
    PaginationControlsComponent
  ],
  templateUrl: './alta-plantilla.component.html'
})
export class AltaPlantillaComponent implements OnInit {

  // Formularios
  form!: FormGroup;
  formAddNew!: FormGroup;

  // Estados visuales
  searchText1 = '';
  searchText2 = '';
  selectedRow: any = null;
  focusedSelect: string | null = null;
  modalData: any[] = []; // Datos a mostrar en el modal de catálogo
  invalidSelect: { [key: string]: boolean } = {}; //Control visual de errores


  // Abrir modal al presionar F3 si hay un select enfocado
  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'F3' && this.focusedSelect) {
      event.preventDefault();
      this.openModal('lookupModal');
    }
  }

  // Al enfocar un campo tipo select
  onSelectFocus(controlName: string): void {
    if (!controlName) return;

    const requiredControl = controlName === 'estado' ? 'pais' :
      controlName === 'ciudad' ? 'estado' : null;

    if (requiredControl && !this.form.get(requiredControl)?.value) {
      this.invalidSelect[controlName] = true;
      setTimeout(() => {
        this.invalidSelect[controlName] = false;
      }, 2000);
      return;
    }
    this.focusedSelect = controlName;
    const sourceFn = this.dataSources[controlName];
    this.modalData = sourceFn ? sourceFn() : [];
  }

  // Limpiar select enfocado (opcional)
  onSelectBlur() {
    // this.focusedSelect = "";
  }



  // Catálogos estáticos cambiar por valores recibidos de los endpoints
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
    { value: 'AR', label: 'Argentina' },
    { value: 'US', label: 'Esatdos Unidos' },
    { value: 'CN', label: 'Canada' },
    { value: 'BR', label: 'Brasil' },
    { value: 'COL', label: 'Colombia' },
    { value: 'CR', label: 'Costa rica' }
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

  estatusOpciones = [
    { label: 'Activo', value: 'activo' },
    { label: 'Inactivo', value: 'inactivo' }
  ];

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

  fideicomisosCoinciden: Fideicomiso[] = [];

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

  // Mapeo de nombre de control a fuente de datos para modal
  get dataSources(): Record<string, () => any[]> {
    return {
      pais: () => this.paises,
      estado: () => this.estados,
      ciudad: () => this.ciudades,
      estatus: () => this.estatusOpciones
    };
  }

  constructor(private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    // Inicialización de formularios
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

    this.formAddNew = this.fb.group({
      fideicomiso: [''],
      tipo_persona: [''],
      nombre: [''],
      paterno: [''],
      materno: ['']
    });

    // Cambios en selección de país actualizan estados
    this.form.get('pais')?.valueChanges.subscribe((pais: string) => {
      this.estados = this.estadosPorPais[pais] || [];
      this.form.get('estado')?.setValue('');
      this.ciudades = [];
    });

    // Cambios en estado actualizan ciudades
    this.form.get('estado')?.valueChanges.subscribe((estado: string) => {
      this.ciudades = this.ciudadesPorEstado[estado] || [];
      this.form.get('ciudad')?.setValue('');
    });
  }

  // Buscar fideicomiso por ID o mostrar sugerencias
  onSearchFideicomiso(valor: string) {
    const texto = valor?.trim();

    // Si está vacío, no hacer nada
    if (!texto) {
      return;
    }
    const exacto = this.fideicomisos.find(f => f.id.toLowerCase() === valor.toLowerCase());
    if (exacto) {
      this.form.patchValue({ ...exacto });
    } else {
      this.fideicomisosCoinciden = this.fideicomisos.filter(f =>
        f.id.toLowerCase().includes(valor.toLowerCase()) ||
        f.nombre.toLowerCase().includes(valor.toLowerCase())
      );
      this.openModal('SearchFideicomiso');
    }
  }

  valorBusquedaModal: string = '';
  onSearchCustomSelect(valor: string) {
    this.valorBusquedaModal = valor;
    this.paginaActual = 1;
  }


  seleccionarFideicomiso(f: Fideicomiso) {
    this.form.patchValue({ ...f });
    this.closeModal('SearchFideicomiso');
  }

  // Manejo de tabla (selección y acciones)
  onRowSelected(fideicomiso: any) {
    this.selectedRow = fideicomiso;
  }

  onNew() {
    if (this.selectedRow === null) {
      this.openModal('onNew');
    }
  }

  onEdit() {
    if (this.selectedRow !== null) {
      this.router.navigate(['/registro/fideicomisos-administracion/editar-fideicomiso']);
    } else {
      alert('No has seleccionado ningún fideicomiso');
    }
  }

  onDelete() {
    if (this.selectedRow) {
      const confirmado = confirm('Confirma eliminación del fideicomiso.');
      if (confirmado) {
        const id = this.selectedRow.id;
        this.fideicomisos = this.fideicomisos.filter(item => item.id !== id);
        this.selectedRow = null;
      }
    } else {
      alert('No has seleccionado ningún fideicomiso');
    }
  }

  // Manejo genérico de modales
  showModal: Record<string, boolean> = {};
  closeModal(key: string) {
    this.showModal[key] = false;
  }

  openModal(key: string) {
    this.showModal[key] = true;
  }

  canSave() {
    this.showModal['btnSave'] = true;
  }

  // Selección de item del catálogo
  seleccionarDelCatalogo(item: any, focusedSelect: any) {
    const controlName = focusedSelect;
    this.form.get(controlName)?.setValue(item.value || item.id);
    this.showModal['lookupModal'] = false;
    this.focusedSelect = '';
  }

  //Paginado
  paginaActual: number = 1;
  itemsPorPagina: number = 5;

  get totalPaginas(): number {
    return Math.ceil(this.modalData.length / this.itemsPorPagina);
  }

  get modalDataPaginado(): any[] {
    const start = (this.paginaActual - 1) * this.itemsPorPagina;
    return this.modalData.slice(start, start + this.itemsPorPagina);
  }

  onPaginaCambiada(pagina: number) {
    this.paginaActual = pagina;
  }

  onItemsPorPaginaCambiado(cantidad: number) {
    this.itemsPorPagina = cantidad;
    this.paginaActual = 1;
  }


}