import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-textarea',
  templateUrl: './input-textarea.component.html',
  styleUrls: ['./input-textarea.component.css'],
  providers: [
    {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputTextareaComponent),
    multi: true
    }
    ]
})
export class InputTextareaComponent implements OnInit, ControlValueAccessor {

  @Input() textareaPlaceholder: any;
  @Input() control: any;
  
  constructor() { }

  ngOnInit(): void {
  }
  value: any = '';
  onChange: any = () => {};
  onTouch: any = () => {};

  writeValue(value: any): void {
      this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  updateValue(val: any): void {
    this.value = val.target?.value;
    this.onChange(this.value);
    this.onTouch(val);
  }

}
