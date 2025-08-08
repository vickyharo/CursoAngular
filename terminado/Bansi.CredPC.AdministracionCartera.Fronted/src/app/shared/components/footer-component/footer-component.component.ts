import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '@services/security-services/auth.service';
import { constantsSecurity} from '@consts/security.constants';

@Component({
  selector: 'app-footer-component',
  templateUrl: './footer-component.component.html'
})
export class FooterComponentComponent implements OnInit {
  authService = inject(AuthService);
  fechaHoy!: Date | null;
  version: string = "";
  visible: boolean = false;
  nombreSistema: string = '';

  ngOnInit(): void {
    this.nombreSistema = constantsSecurity.NOMBRE_SISTEMA;
    this.authService.getVersionDates().subscribe({
      next: ((response) => {
        if (response.success) {
          this.fechaHoy = response.operationResultItem.fechaHoy;
          this.version = response.operationResultItem.version;
          this.visible = true;
        }
      }),
    });
  }
}
