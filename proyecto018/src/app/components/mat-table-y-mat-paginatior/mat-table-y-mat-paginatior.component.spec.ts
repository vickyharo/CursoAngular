import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTableYMatPaginatiorComponent } from './mat-table-y-mat-paginatior.component';

describe('MatTableYMatPaginatiorComponent', () => {
  let component: MatTableYMatPaginatiorComponent;
  let fixture: ComponentFixture<MatTableYMatPaginatiorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatTableYMatPaginatiorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatTableYMatPaginatiorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
