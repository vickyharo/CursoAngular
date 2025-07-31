
import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MaterialModule } from '../../../shared/material/material.module';
import { BsiSpinnerComponent } from '../../../shared/components/bsi-spinner/bsi-spinner.component';
import { AuthService } from '../../../core/services/auth/auth.service';
import { constants } from '../../../core/consts/constants';
import { ContinueAuthenticationRequest } from '../../../core/models/securityLogin/ContinueAuthenticationRequest';
import { MenuServiceService } from '../../../core/services/menu-service.service';
import { CookieService } from 'ngx-cookie-service';
//--------------------------
//login Process
import { SecurityJwt } from '../../../core/models/securityLogin/SecurityJwt';
import { LoginRequest } from '../../../core/models/securityLogin/LoginRequest';
import { LoginResponse } from '../../../core/models/securityLogin/LoginResponse';

//AngularMaterial
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MaterialModule, BsiSpinnerComponent, MatIconModule,
  ],
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
  showTokenForm = false;
  MAX_CHAR_USERNAME = constants.MAX_CHAR_USERNAME;
  MAX_CHAR_PASSWORD = constants.MAX_CHAR_PASSWORD;
  CHAR_TOKEN_LENGTH = constants.CHAR_TOKEN_LENGTH;
  nameSystem: string = "Nombre del sistema";
  version: string = "0.0.1"; //Crear script o llamar desde envioroment
  fechaActual: string = new Date().toLocaleDateString('es-MX'); //Pedir de la api

  //services
  private authService = inject(AuthService);
  private _menuService = inject(MenuServiceService);
  private _cookieService = inject(CookieService);

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    // Definir formulario reactivo
    this.formLogin = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(constants.MAX_CHAR_USERNAME)]],
      password: ['', [Validators.required, Validators.minLength(constants.MIN_CHAR_PASSWORD), Validators.maxLength(constants.MAX_CHAR_PASSWORD)]],
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
  }

  onLoginSubmit() {
    if (this.formLogin.invalid) return;

    this.showSpinner();

    // Simulación de respuesta exitosa sin conexión real
    const fakeToken = 'demo-token';
    // const fakeUser: SecurityJwt = { name: 'SecurityUser', value: 'DemoUser' };
    // const fakeFullName: SecurityJwt = { name: 'SecurityFullName', value: 'Usuario Demo' };

    // Guardar token en cookie

    this.hideSpinner();

    // Redirigir directamente al módulo deseado
    this.router.navigate(['/dashboard']);
    //------------------------------------------
    /*
    const loginData: LoginRequest = {
      userName: this.formLogin.get('username')?.value,
      userPassword: this.formLogin.get('password')?.value,
      applicationName: constants.APP_NAME
    };

    //Bloquear entrada de usuario y password
    this.formLogin.get('username')?.disable();
    this.formLogin.get('password')?.disable();

    this.authService.login(loginData).subscribe({
      next: (response: LoginResponse) => {
        console.log('respueta api login',response);
        if (response.success) {

          //Validar si requiere Token, mostrar el campo de token
          if (response.operationResultItem.mustContinue) {
            //TODO: hacer algo si no necesita token bansí;
          } else { //Si no requiere token se redirige al Home
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
            this.router.navigate(['/cuentas-cheques/registrar-solicitud']);

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
    */
  }


  onTokenSubmit() {
    if (this.formLogin.invalid) return;

    this.showSpinner();

    // Validación del contexto
    /*if (!this.authService.getContextToken()) {
      this.apiError = "El token de contexto no es válido.";
      return;
    }

    let continueAuthenticationRequest: ContinueAuthenticationRequest = {
      password: this.formLogin.get('token')?.value,
      contextToken: this.authService.getContextToken()
    };
    */
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

  validatePassword(event: Event) {
    const pass = event.target as HTMLInputElement;

    if (pass.value.length !== 0)
      this.formLogin.get('password')?.markAsTouched();

  }

  resetearFormulario() {

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

  setUserOptions(response: LoginResponse) {
    const userOptions = response.operationResultItem.userOptionsAllowed;
    this._menuService.setMenuItems(userOptions);
  }


}
