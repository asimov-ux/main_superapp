import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

export interface DscSelectOption {
  label: string;
  value: any;
  disabled?: boolean;
  options?: DscSelectOption[]; // For optgroup
}

export type DscSelectSize = 'small' | 'standard' | 'large';

@Component({
  selector: 'dsc-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dsc-select.component.html',
  styleUrls: ['./dsc-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DscSelectComponent),
      multi: true,
    },
  ],
})
export class DscSelectComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() placeholder: string = 'Escolha uma opção';
  @Input() options: DscSelectOption[] = [];
  @Input() multiple: boolean = false;
  @Input() showFilter: boolean = false;
  @Input() disabled: boolean = false;
  @Input() size: DscSelectSize = 'standard';
  @Input() labelHint: string = '';
  @Input() labelHintTooltip: string = '';
  @Input() iconPrefix: string = '';
  @Input() formFieldHint: string = '';
  @Input() errorMessage: string = '';
  @Input() compareWith: (o1: any, o2: any) => boolean = (o1, o2) => o1 === o2;

  @Output() selectionChange = new EventEmitter<any>();
  @Output() openedChange = new EventEmitter<boolean>();

  filterText: string = '';
  isOpen: boolean = false;
  value: any = null;

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  get filteredOptions(): DscSelectOption[] {
    if (!this.showFilter || !this.filterText) {
      return this.options;
    }

    const filterLower = this.filterText.toLowerCase();
    return this.options.filter((option) => {
      if (option.options) {
        // Optgroup
        return option.options.some((opt) =>
          opt.label.toLowerCase().includes(filterLower)
        );
      }
      return option.label.toLowerCase().includes(filterLower);
    });
  }

  toggleDropdown(): void {
    if (!this.disabled) {
      this.isOpen = !this.isOpen;
      this.openedChange.emit(this.isOpen);
      if (!this.isOpen) {
        this.filterText = '';
      }
    }
  }

  onSelectOption(option: DscSelectOption): void {
    if (option.disabled) return;

    if (this.multiple) {
      const currentValue = Array.isArray(this.value) ? this.value : [];
      const index = currentValue.findIndex((v) =>
        this.compareWith(v, option.value)
      );

      if (index > -1) {
        this.value = currentValue.filter((_, i) => i !== index);
      } else {
        this.value = [...currentValue, option.value];
      }
    } else {
      this.value = option.value;
      this.isOpen = false;
    }

    this.onChange(this.value);
    this.selectionChange.emit(this.value);
  }

  isSelected(option: DscSelectOption): boolean {
    if (this.multiple && Array.isArray(this.value)) {
      return this.value.some((v) => this.compareWith(v, option.value));
    }
    return this.compareWith(this.value, option.value);
  }

  getSelectedLabel(): string {
    if (!this.value) return '';

    if (this.multiple && Array.isArray(this.value)) {
      const labels = this.value
        .map((val) => {
          const option = this.findOptionByValue(val);
          return option?.label || '';
        })
        .filter(Boolean);
      return labels.join(', ');
    }

    const option = this.findOptionByValue(this.value);
    return option?.label || '';
  }

  private findOptionByValue(value: any): DscSelectOption | undefined {
    for (const option of this.options) {
      if (option.options) {
        const found = option.options.find((opt) =>
          this.compareWith(opt.value, value)
        );
        if (found) return found;
      } else if (this.compareWith(option.value, value)) {
        return option;
      }
    }
    return undefined;
  }
}
