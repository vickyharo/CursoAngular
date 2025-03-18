import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTableYFiltrarDatosComponent } from './mat-table-y-filtrar-datos.component';

describe('MatTableYFiltrarDatosComponent', () => {
  let component: MatTableYFiltrarDatosComponent;
  let fixture: ComponentFixture<MatTableYFiltrarDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatTableYFiltrarDatosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatTableYFiltrarDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
