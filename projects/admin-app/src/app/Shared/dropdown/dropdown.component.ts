import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {
  @Input() options:any;
  @Input() selectedState:any;
  @Input() optionLabel:any;
  constructor() { }
  ngOnInit(): void {
  }

}
