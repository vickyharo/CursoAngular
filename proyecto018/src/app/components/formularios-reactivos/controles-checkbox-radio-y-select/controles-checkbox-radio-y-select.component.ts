import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-controles-checkbox-radio-y-select',
  standalone: false,
  templateUrl: './controles-checkbox-radio-y-select.component.html',
  styleUrl: './controles-checkbox-radio-y-select.component.css'
})
export class ControlesCheckboxRadioYSelectComponent {
  conversion!: string;
  potenciaNumero!: number;
  cantidad!: number;

  formularioConversion = new FormGroup({
    numerodecimal: new FormControl(''),
    base: new FormControl('octal'),
    potencia: new FormControl('2'),
    largo: new FormControl(true)
  });

  submit() {
    if (this.formularioConversion.value.base == "hexadecimal")
    {
      let valor:string = this.formularioConversion.value.numerodecimal;
      let valor2:number = parseInt(valor);
    }
      /*this.conversion = parseInt*/(this.formularioConversion.value.numerodecimal).toString(16);


    if (this.formularioConversion.value.base == "octal")
      this.conversion = parseInt(this.formularioConversion.value.numerodecimal).toString(8);
    this.potenciaNumero = Math.pow(parseInt(this.formularioConversion.value.numerodecimal), parseInt(this.formularioConversion.value.potencia));
    if (this.formularioConversion.value.largo)
      this.cantidad = this.formularioConversion.value.numerodecimal.length;
  }
}
