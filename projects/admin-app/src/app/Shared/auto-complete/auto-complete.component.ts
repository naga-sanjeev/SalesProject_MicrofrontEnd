import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from '../../Services/data.service';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css']
})
export class AutoCompleteComponent implements OnInit {

  constructor(private dataService: DataService) { }
  results: any = [];
  text: string = '';
  @Input() allValues: any
  @Input() InputFieldName: any;
  @Input() placeholder: string = 'enter'
  @Input() control: any
  filteredValues: any = [];
  @Output() optionSelected = new EventEmitter<any>();
  ngOnInit(): void {
  }

  search(event: any) {
    this.results = this.allValues
    this.filteredValues = this.results?.filter((value: any) =>
      value.label.toLowerCase().includes(event.query?.toLowerCase())
    );
  }
  onOptionSelect(event: any) {
    this.optionSelected.emit(event.value);
  }

}
