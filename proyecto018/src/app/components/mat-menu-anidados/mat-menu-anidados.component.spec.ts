import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatMenuAnidadosComponent } from './mat-menu-anidados.component';

describe('MatMenuAnidadosComponent', () => {
  let component: MatMenuAnidadosComponent;
  let fixture: ComponentFixture<MatMenuAnidadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatMenuAnidadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatMenuAnidadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
