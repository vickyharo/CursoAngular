import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTableYMatSortComponent } from './mat-table-y-mat-sort.component';

describe('MatTableYMatSortComponent', () => {
  let component: MatTableYMatSortComponent;
  let fixture: ComponentFixture<MatTableYMatSortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatTableYMatSortComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatTableYMatSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
