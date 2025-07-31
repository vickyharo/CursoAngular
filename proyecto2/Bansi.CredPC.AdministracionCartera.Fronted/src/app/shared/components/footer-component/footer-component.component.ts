import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '@services/security-services/auth.service';

@Component({
  selector: 'app-footer-component',
  templateUrl: './footer-component.component.html',
  styleUrl: './footer-component.component.css',
})
export class FooterComponentComponent implements OnInit {
  authService = inject(AuthService);
  fechaHoy!: Date | null;
  version: string = "";
  visible: boolean = false;

  ngOnInit(): void {
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
