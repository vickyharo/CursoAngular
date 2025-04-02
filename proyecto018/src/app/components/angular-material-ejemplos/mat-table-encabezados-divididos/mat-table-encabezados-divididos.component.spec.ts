import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTableEncabezadosDivididosComponent } from './mat-table-encabezados-divididos.component';

describe('MatTableEncabezadosDivididosComponent', () => {
  let component: MatTableEncabezadosDivididosComponent;
  let fixture: ComponentFixture<MatTableEncabezadosDivididosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatTableEncabezadosDivididosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatTableEncabezadosDivididosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
