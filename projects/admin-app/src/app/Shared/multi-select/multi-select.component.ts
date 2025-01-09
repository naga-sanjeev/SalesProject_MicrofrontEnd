import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.css']
})
export class MultiSelectComponent implements OnInit {
  @Input() options: any;
  @Input() selectedState: any
  @Output() valueChange = new EventEmitter();
  @Input() placeholderValue: string = " "
  @Input() optionLabel: any;
  @Input() useMarginLeft: boolean = false;
  @Input() control: any;
  group: any = []
  value: any = '';
  @Input() optionValue: any;
  selectedValue: any
  optionSelected: any;
  constructor() { }

  ngOnInit(): void {
  }

}
