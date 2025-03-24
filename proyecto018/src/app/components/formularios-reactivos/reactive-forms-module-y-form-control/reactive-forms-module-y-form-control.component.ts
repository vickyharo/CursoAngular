import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-reactive-forms-module-y-form-control',
  standalone: false,
  templateUrl: './reactive-forms-module-y-form-control.component.html',
  styleUrl: './reactive-forms-module-y-form-control.component.css'
})
export class ReactiveFormsModuleYFormControlComponent {
  actividad = new FormControl();

  lista!: string[];

  ngOnInit(): void {
    this.lista=[];
    let datos=localStorage.getItem("actividades");
    if(datos!=null) {
      let arreglo=JSON.parse(datos);
      if (arreglo!=null)
        for(let actividad of arreglo)
          this.lista.push(actividad);
    }
  }

  agregar() {
    this.lista.push(this.actividad.value);    
    localStorage.setItem('actividades', JSON.stringify(this.lista));
    this.actividad.setValue('');
  }

  borrar(pos:number) {
    this.lista.splice(pos,1);
    localStorage.clear();
    localStorage.setItem('actividades', JSON.stringify(this.lista));
  }

  borrarTodas() {
    localStorage.clear();
    this.lista=[];
  }
}
