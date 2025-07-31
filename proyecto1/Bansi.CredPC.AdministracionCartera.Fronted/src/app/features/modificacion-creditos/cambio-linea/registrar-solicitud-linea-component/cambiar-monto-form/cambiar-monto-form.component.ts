import { CurrencyPipe } from '@angular/common';
import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cambiar-monto-form',
  providers: [CurrencyPipe],
  templateUrl: './cambiar-monto-form.component.html',
  styleUrl: './cambiar-monto-form.component.scss',
})
export class CambiarMontoFormComponent {
  /**
   * Inputs
   */
  @Input() montoOriginalRecibido: number = 0;
  @Input() tieneSolicitudesPendientesRecibido: boolean = true;

  /**
   * Outputs
   */
  @Output() montoNuevoEnviado = new EventEmitter<number>();

  /**
   * Propiedades
   */
  txtMontoOriginal: string = '';
  txtNuevoMonto: string = '0';
  nuevoMontoAntesMoneda: number = 0;
  tieneSolicitudesPendientes: boolean = true;
  amount: any;

  /**
   ************************ S T A R T ********************************
   */

  constructor(
    private currencyPipe: CurrencyPipe
  ) { }

  /** Evento para controlar el numero de credito ingresado */
  ngOnChanges() {
    this.tieneSolicitudesPendientes = this.tieneSolicitudesPendientesRecibido;
    this.txtMontoOriginal = `${this.montoOriginalRecibido}`;
    this.nuevoMontoAntesMoneda = 0;
    this.txtNuevoMonto = '$0.00';
  }

  /**
   * Transformar monto a moneda
   *
   * @param {*} elemento
   */
  public TransformarMonto(elemento: any) {
    if (!this.txtNuevoMonto) {
      this.txtNuevoMonto = '$0.00';
      this.nuevoMontoAntesMoneda = 0;
    } else {
      this.nuevoMontoAntesMoneda = parseFloat(this.txtNuevoMonto);
    }

    const monedaCambio = this.currencyPipe.transform(
      this.nuevoMontoAntesMoneda,
      '$'
    );
    this.txtNuevoMonto = `${monedaCambio}`;

    elemento.target.value = this.txtNuevoMonto;
  }

  /**
   * Notificamos al padre que cambio el monto
   *
   * @param {*} elemento
   */
  public CambioDeMonto(elemento: any) {
    //-> cambiar el monto en el padre para la solicitud
    this.montoNuevoEnviado.emit(elemento);
  }

  /**
   * Evento para permitir solo la escritura de números
   * @param event
   */
  public ValidateNumericInput(
    event: KeyboardEvent,
    permitirDecimales = true
  ): void {
    let allowedKeys: RegExp;

    allowedKeys = permitirDecimales ? /^[0-9.]$/ : /[0-9]/;
    if (!allowedKeys.test(event.key)) {
      event.preventDefault();
    }
  }

  /**
   * Evento para permitir solo la escritura de números
   * @param event
   */
  public AllowPasteOnlyNumbers(event: ClipboardEvent): void {
    const clipboardData = event.clipboardData || (window as any).clipboardData;
    const pastedText = clipboardData?.getData('text') || '';

    const allowedPattern = /^[0-9]*$/; // Permitir solo números y puntos
    if (!allowedPattern.test(pastedText)) {
      event.preventDefault(); // Bloquear contenido no válido
    }
  }
}
