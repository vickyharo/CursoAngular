import {
  Component,
  EventEmitter,
  Input,
  Output,
  forwardRef
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

@Component({
  selector: 'custom-select',
  templateUrl: './custom-select.component.html',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectComponent),
      multi: true
    }
  ]
})
export class CustomSelectComponent implements ControlValueAccessor {
  // =======================
  // Inputs / Outputs
  // =======================

  /** Marca visual de error desde el componente padre */
  @Input() invalid: boolean = false;

  /** Emitido cuando el input recibe foco (útil para control externo como F3) */
  @Output() focus = new EventEmitter<void>();

  /** Emitido cuando el input pierde el foco */
  @Output() blur = new EventEmitter<void>();

  // =======================
  // Internal State
  // =======================

  /** Lista completa de opciones (internamente clonada del @Input options) */
  private _options: { value: any, label: string }[] = [];

  /** Opciones visibles según búsqueda del usuario */
  filteredOptions: { value: any, label: string }[] = [];

  /** Etiqueta visible del valor seleccionado */
  selectedLabel: string = '';

  /** Valor seleccionado (enlazado al ControlValueAccessor) */
  value: any = '';

  /** Estado del control (disabled / enabled) */
  isDisabled: boolean = false;

  /** Muestra u oculta el dropdown */
  showDropdown: boolean = false;

  /** Indica si el campo tiene foco actualmente */
  focused: boolean = false;

  /** Indica si el mouse está sobre el componente (opcional para estilos) */
  hovered: boolean = false;

  // =======================
  // Form Control Integration
  // =======================

  /** Setters / Getters para el Input options */
  @Input() set options(value: { value: any, label: string }[] | null) {
    this._options = value || [];
    this.filteredOptions = [...this._options]; // Se clona para filtrar sin modificar el original
  }

  get options(): { value: any, label: string }[] {
    return this._options;
  }

  /** Funciones requeridas por ControlValueAccessor */
  onChange = (_: any) => {};
  onTouched = () => {};

  ngOnInit() {
    this.filteredOptions = [...this.options];
  }

  /** ControlValueAccessor: set value desde el exterior */
  writeValue(value: any): void {
    this.value = value;
    const matched = this.options.find(opt => opt.value === value);
    this.selectedLabel = matched?.label ?? '';
  }

  /** ControlValueAccessor: registrar cambio */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /** ControlValueAccessor: registrar blur */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /** ControlValueAccessor: activar o desactivar */
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  // =======================
  // UI Event Handlers
  // =======================

  /** Buscar mientras el usuario escribe */
  onInputChange(event: Event): void {
    const input = (event.target as HTMLInputElement).value.toLowerCase();
    this.selectedLabel = input;

    this.filteredOptions = this.options.filter(opt =>
      opt.label.toLowerCase().includes(input)
    );
  }

  /** Selección de una opción del dropdown */
  selectOption(option: { value: any, label: string }): void {
    this.selectedLabel = option.label;
    this.value = option.value;
    this.onChange(option.value); // Notifica al FormControl
    this.showDropdown = false;
  }

  /** Alternar visibilidad del dropdown */
  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  /** Maneja el foco (ideal para abrir dropdown tras delay) */
  onFocus(): void {
    this.focus.emit();
    this.focused = true;
    setTimeout(() => this.toggleDropdown(), 100);
  }

  /** Maneja el blur (oculta dropdown con delay para evitar colapsos bruscos) */
  blurInput(): void {
    this.blur.emit();
    setTimeout(() => this.showDropdown = false, 200);
    this.focused = false;
    this.onTouched();
  }
}
