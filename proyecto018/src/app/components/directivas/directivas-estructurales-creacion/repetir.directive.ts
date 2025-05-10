import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';

@Directive({
  selector: '[appRepetir]',
  standalone: false
})
export class RepetirDirective {

  constructor(private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) { }

  @Input() set appRepetir(numero: number) {
    for (var i = 0; i < numero; i++)
      this.viewContainer.createEmbeddedView(this.templateRef);
  }

}
