import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Fideicomiso } from '../../../core/models/fideicomiso.model';

@Component({
    selector: 'app-form',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
    form!: FormGroup;

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

    // Método público para que AltaPlantilla lo use
    setFideicomisoEnFormulario(f: Fideicomiso) {
        this.form.patchValue({
            identificador: f.id,
            tipoInmueble: f.tipo,
            calle: f.calle,
            noExt: f.noExt || '',
            noInt: f.noInt || '',
            colonia: f.colonia || '',
            cp: f.cp,
            pais: f.pais || '',
            estado: f.estado || '',
            ciudad: f.ciudad || '',
            superficie: f.superficie || '',
            valorTotal: f.valorTotal || '',
            estatus: f.estatus || '',
            fechaRegistro: f.fechaRegistro || ''
        });
    }

}
