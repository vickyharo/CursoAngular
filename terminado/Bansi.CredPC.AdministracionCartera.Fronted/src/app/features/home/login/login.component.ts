import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

//->Constantes
import { constantsSecurity } from '@consts/security.constants';

//->Modelos
import { LoginRequest } from '@models/security-models/LoginRequest';
import { LoginResponse } from '@models/security-models/LoginResponse';
import { ContinueAuthenticationRequest } from '@models/security-models/ContinueAuthenticationRequest';
import { SecurityJwt } from '@models/security-models/SecurityJwt';

//->Servicios
import { AuthService } from '@services/security-services/auth.service';
import { MenuServiceService } from '@services/security-services/menu.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements AfterViewInit, OnInit {
  @ViewChild('userNameInput') userNameInput!: ElementRef;
  @ViewChild('tokenInput') tokenInput!: ElementRef;
  formLogin: FormGroup;
  apiError: string | null = null;
  tokenError: string | null = null;
  hidePassword: boolean = true;
  hideUsername: boolean = true;
  nombreSistema: string | null = null;
  showTokenForm = false;
  MAX_CHAR_USERNAME = constantsSecurity.MAX_CHAR_USERNAME;
  MAX_CHAR_PASSWORD = constantsSecurity.MAX_CHAR_PASSWORD;
  CHAR_TOKEN_LENGTH = constantsSecurity.CHAR_TOKEN_LENGTH;
  private authService = inject(AuthService);
  private _menuService = inject(MenuServiceService);
  private _cookieService = inject(CookieService);
  fechaHoy!: Date | null;
  version: string = "";

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    // Definir formulario reactivo
    this.formLogin = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(constantsSecurity.MAX_CHAR_USERNAME)]],
      password: ['', [Validators.required, Validators.minLength(constantsSecurity.MIN_CHAR_PASSWORD), Validators.maxLength(constantsSecurity.MAX_CHAR_PASSWORD)]],
      token: [''], // Campo token incluido desde el inicio
    });

  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.userNameInput.nativeElement.focus();
    }, 1000);

  }

  ngOnInit(): void {
    this._cookieService.delete('Authorization', '/');

    this.nombreSistema = constantsSecurity.NOMBRE_SISTEMA;
    this.authService.getVersionDates().subscribe({
      next: ((response) => {
        if (response.success) {
          this.fechaHoy = response.operationResultItem.fechaHoy;
          this.version = response.operationResultItem.version;
        }
      }),
    });
  }

  onLoginSubmit() {
    if (this.formLogin.invalid) return;

    this.showSpinner();
    const loginData: LoginRequest = {
      userName: this.formLogin.get('username')?.value,
      userPassword: this.formLogin.get('password')?.value,
      applicationName: constantsSecurity.APP_NAME
    };

    //Bloquear entrada de usuario y password
    this.formLogin.get('username')?.disable();
    this.formLogin.get('password')?.disable();

    this.authService.login(loginData).subscribe({
      next: (response: LoginResponse) => {
        if (response.success) {

          //Validar si requiere Token, mostrar el campo de token
          if (response.operationResultItem.mustContinue) {
            //TODO: hacer algo si no necesita token bansí;
          } else { //Si no requiere token se 'redirige' al Home
            this._cookieService.set(
              'Authorization',
              `Bearer ${response.operationResultItem.tokenApplication}`,
              undefined,
              '/',
              undefined,
              true,
              'Strict');

            const userInfo: SecurityJwt = {
              name: "SecurityUser",
              value: response.operationResultItem.sesionInformation.userInformation.name,
            };

            const userInfoFullName: SecurityJwt = {
              name: "SecurityFullName",
              value: response.operationResultItem.sesionInformation.userInformation.fullName,
            };
            this.authService.setSecurityUserInformation(userInfo);
            this.authService.setSecurityUserInformation(userInfoFullName);

            this.hideSpinner();
            this.router.navigate(['/modificacion-creditos']);

            this.setUserOptions(response);
          }

          this.apiError = '';
          this.hideSpinner();
        } else {
          this.apiError = response.message;

            //Desbloquear entrada de usuario y password en caso de error
            this.formLogin.get('username')?.enable();
            this.formLogin.get('password')?.enable();
        }
        this.hideSpinner();
      },
      error: (err) => {
        this.hideSpinner();
        this.formLogin.get('username')?.enable();
        this.formLogin.get('password')?.enable();
        this.apiError = 'No se pudo establecer conexión con el servidor. Verifique su conexión a internet o intente más tarde.';
        },
    });
  }

  onTokenSubmit() {
    if (this.formLogin.invalid) return;

    this.showSpinner();

    // Validación del contexto
    if (!this.authService.getContextToken()) {
      this.apiError = "El token de contexto no es válido.";
      return;
    }

    let continueAuthenticationRequest: ContinueAuthenticationRequest = {
      password: this.formLogin.get('token')?.value,
      contextToken: this.authService.getContextToken()
    };
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
    return '';
  }

  isLoading: boolean = false;

  showSpinner() {
    this.isLoading = true;
  }

  hideSpinner() {
    this.isLoading = false;
  }

  /**
   * Evento para permitir solo la escritura de números para el token
   * @param event
   */
  validateNumericInput(event: KeyboardEvent): void {
    const allowedKeys = /[0-9]/;

    // Permitir números y la tecla Enter
    if (!allowedKeys.test(event.key) && event.key !== 'Enter') {
        event.preventDefault();
    } else if (event.key === 'Enter') {
      const submitButton = document.getElementById('submitBtn') as HTMLButtonElement;
        if (submitButton && this.showTokenForm && this.formLogin.valid) {
        }
    }
}

  validatePassword(event: Event){
    const pass = event.target as HTMLInputElement;

    if(pass.value.length !== 0)
      this.formLogin.get('password')?.markAsTouched();

  }

  resetearFormulario(){

    this.formLogin.reset({
      username: '',
      password: '',
      token: '',
    });

    this.formLogin.enable();
    this.formLogin.get('username')?.setErrors(null);
    this.formLogin.get('username')?.markAsUntouched;
    this.formLogin.get('password')?.setErrors(null);
    this.formLogin.get('password')?.markAsUntouched;
    this.formLogin.get('token')?.setErrors(null);
    this.formLogin.setErrors({ 'generalError': true });
    this.apiError = '';
    this.showTokenForm = false;

    setTimeout(() => {
      this.userNameInput.nativeElement.focus();
    }, 100);
  }

  areValidInput(): boolean {
    return this.showTokenForm ?
      this.formLogin.get('username')?.value?.length > 0 && this.formLogin.get('password')?.value?.length > 0 && this.formLogin.get('token')?.value?.length > 0 && this.formLogin.valid
      : this.formLogin.get('username')?.value?.length > 0 && this.formLogin.get('password')?.value?.length && this.formLogin.valid;
  }

  someInputIsNotEmpty(): boolean {
    return this.showTokenForm ?
      this.formLogin.get('username')?.value?.length > 0 || this.formLogin.get('password')?.value?.length > 0 || this.formLogin.get('token')?.value?.length > 0
      : this.formLogin.get('username')?.value?.length > 0 || this.formLogin.get('password')?.value?.length;
  }

  setUserOptions(response: LoginResponse){
    const userOptions = response.operationResultItem.userOptionsAllowed;
    this._menuService.setMenuItems(userOptions);
  }
}
