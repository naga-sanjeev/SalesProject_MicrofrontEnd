import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  constructor() { }
  @Input() buttonColor = "Primary"
  @Input() buttonText: any
  ngOnInit(): void {
  }
}
