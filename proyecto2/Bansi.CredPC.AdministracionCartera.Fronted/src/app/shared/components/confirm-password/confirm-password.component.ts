import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

//->Contantes
import { constantsSecurity } from '@consts/security.constants';

//->Modelos
import { ConfirmPasswordRequest } from '@models/security-models/ConfirmPasswordRequest';

//->Servicios
import { SpinnerService } from '@services/shared-services/spinner.service';
import { AuthService } from '@services/security-services/auth.service';

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrl: './confirm-password.component.css'
})
export class ConfirmPasswordComponent implements OnInit{
  //CONSTANTES
  MAX_CHAR_PASSWORD = constantsSecurity.MAX_CHAR_PASSWORD;
  CONTAINS_LETTERS = "/[a-zA-Z]/";

  //PROPIEDADES
  formLogin!: FormGroup;
  hidePassword: boolean = true;
  @Input() usuario: any = new EventEmitter<any>();
  @Input() cancelar: boolean = false;
  txtUsuario: string = "";
  successState: boolean = false;
  comentarios: string = "";
  @Output() onConfirm = new EventEmitter<{success: boolean, comentarios: string}>();

  //SERVICIOS
  fb = inject(FormBuilder);
  spinnerService = inject(SpinnerService);
  authService = inject(AuthService);
  bsModalRef = inject(BsModalRef);

  //EVENTOS
  ngOnInit(): void {
    this.txtUsuario = this.usuario;
    this.formLogin = this.fb.group({
          username: [{value: this.txtUsuario, disabled:true}, null],
          password: ['', [Validators.required, Validators.minLength(constantsSecurity.MIN_CHAR_PASSWORD), Validators.maxLength(constantsSecurity.MAX_CHAR_PASSWORD)]],
          comentarios: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(254)]]
      });
    if (this.cancelar){
      const regex = new RegExp("[a-zA-Z]");
      this.formLogin.get("comentarios")?.setValidators([Validators.required, Validators.minLength(10), Validators.maxLength(254), Validators.pattern(regex)])
    } else {
      this.formLogin.get("comentarios")?.clearValidators();
    }

    this.formLogin.get("comentarios")?.updateValueAndValidity();
  }

  validatePassword(event: Event){
    const pass = event.target as HTMLInputElement;

    if(pass.value.length !== 0)
      this.formLogin.get('password')?.markAsTouched();

  }

  //MÉTODOS
  confirmPassword(){
    if(this.formLogin.invalid) return;
    this.spinnerService.show();

    const data: ConfirmPasswordRequest = {
      usuario: this.formLogin.get('username')?.value,
      password: this.formLogin.get('password')?.value,
    };

    this.formLogin.get('username')?.disable();
    this.formLogin.get('password')?.disable();

    this.authService.confirmPassword(data).subscribe({
      next: ((response) => {
        this.successState = response.operationResultItem;
        this.comentarios = this.formLogin.get("comentarios")?.value;
      }),
      error: ((error) =>
        console.error(error)
      ),
      complete:(() => {
        this.onConfirm.emit({
          success: this.successState,
          comentarios: this.comentarios
        });
        this.spinnerService.hide();
        this.onClose();
      }),
    });
  }

  /**
   * Validaciones
   */

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
    if(control?.hasError("pattern")){
      return `${fieldName} carece de caracteres válidos.`;
    }
    return '';
  }

  areValidInput(): boolean {
    return this.formLogin.get('username')?.value?.length > 0 && this.formLogin.get('password')?.value?.length && this.formLogin.valid;
  }

  onClose() {
    this.bsModalRef.hide();
  }
}
