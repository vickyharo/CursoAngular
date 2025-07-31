import { Component, Input, ContentChildren, QueryList, TemplateRef, AfterContentInit, EventEmitter, Output } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'carrusel-base',
  standalone: true,
  imports: [NgTemplateOutlet, CommonModule],
  templateUrl: './carrusel-base.component.html'
})
export class CarruselBaseComponent implements AfterContentInit {
  @Input() titulo: string = '';
  @ContentChildren(TemplateRef) templates!: QueryList<TemplateRef<any>>;

  items: TemplateRef<any>[] = [];
  indiceActual: number = 0;

  constructor(
    private cd: ChangeDetectorRef
  ) { }


  ngAfterContentInit() {
    this.items = this.templates.toArray();
  }

  siguiente() {
    if (this.indiceActual < this.items.length - 1) {
      this.indiceActual++;
    }
  }

  anterior() {
    if (this.indiceActual > 0) {
      this.indiceActual--;
    }
  }


}