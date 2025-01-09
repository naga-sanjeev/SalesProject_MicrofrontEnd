import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CalendarComponent),
      multi: true
    }
  ]
})
export class CalendarComponent implements OnInit, ControlValueAccessor {
  @Input() dateField: string = '';
  @Input() useMarginLeft: boolean = false;
  @Input() control: any;
  selectedDate: string = ''
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void { }
  onChange: any = () => { };
  onTouch: any = () => { };

  writeValue(value: any): void {
    this.selectedDate = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  updateValue(event: any): void {
    if (event) {
      this.selectedDate = event;
      this.onChange(event);
      this.onTouch(event);
    }
  }
  getErrorStyle(): any {
    if (this.useMarginLeft) {
      return {
        'margin-left': '1px'
      };
    } else {
      return {};
    }
  }

}