import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-add-new-client',
  templateUrl: './add-new-client.component.html',
  styleUrls: ['./add-new-client.component.css']
})
export class AddNewClientComponent implements OnInit {
  InputFieldName: string = "Date"
  data: string = "Add New Client"
  selectedState: any = null;
  ClientName: string = "ClientName";
  test: string = "Client"
  InputFieldName1: string = "Poc"
  name: any
  cols: any
  content: any
  states: any[] = [
    { name: 'Sector Type', code: 'Sector Type' },
    { name: 'Atomative', code: 'Atomative' },
    { name: 'Banking & finance', value: 'Banking & finance' },
    { name: 'Business services', code: 'Business services' },
    { name: 'Chemicals', code: 'Chemicals' }
  ];
  constructor(private dataService: DataService) {
  }
  ngOnInit(): void {
    this.sendMessage()
    this.content = [
      {
        "code": "f230fh0g3",
        "name": "Bamboo Watch",
        "category": "Accessories",
        "quantity": 24
      },
      {
        "code": "nvklal433",
        "name": "Black Watch",
        "category": "Fitness",
        "quantity": 61
      },
      {
        "code": "244wgerg2",
        "name": "Blue T-Shirt",
        "category": "	Clothing",
        "quantity": 25
      },
    ]
    this.cols = [
      { field: 'code', header: 'Code' },
      { field: 'name', header: 'Name' },
      { field: 'category', header: 'Category' },
      { field: 'quantity', header: 'Quantity' }
    ];
  }
  sendMessage() {
    this.dataService.changeMessage(this.data);
  }

}
