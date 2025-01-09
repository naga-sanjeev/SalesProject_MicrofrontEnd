import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-my-activities',
  templateUrl: './my-activities.component.html',
  styleUrls: ['./my-activities.component.css']
})
export class MyActivitiesComponent implements OnInit {
  data:string="My activities"
  InputFieldName:string="Client Name"
  selectedState: any;
  selectedState2: any;
  cols: any
  buttonName:string="Reset";
  color:string= "Primary"
  content: any
  states: any[] = [
    { name: 'Sector Type', code: 'Sector Type' },
    { name: 'Atomative', code: 'Atomative' },
    { name: 'Banking & finance', value: 'Banking & finance' },
    { name: 'Business services', code: 'Business services' },
    { name: 'Chemicals', code: 'Chemicals' }
  ];
  states1: any[] = [
    { name: 'Status', code: 'Status' },
    { name: 'Active', code: 'Active' },
    { name: 'InActive', value: 'InActive' },
   
  ];
  constructor(private dataService: DataService) {
  }
  ngOnInit() {
    this.sendMessage()

    this.cols = [
      { field: 'Project Name', header: 'Project Name' },
    { field: 'Industry Type', header: 'Industry Type' },
    { field: 'Practice Name', header: 'Practice Name' },
    { field: 'Status', header: 'Status' },
    { field: 'Architecture', header: 'Architecture' },
    { field: 'Project Info', header: 'Project Info' },
    { field: 'Actions', header: 'Actions' },
    ];

    this.content = [
      {
        "Project Name": "Project1",
        "Industry Type": "Health Care",
        "Practice Name": "App Dev",
        "Status": "Active",
        "Architecture": "Architecture",
       
        },
        {
          "Project Name": "Project2",
          "Industry Type": "Busssiness",
          "Practice Name": "B2B",
          "Status": "InActive",
          "Architecture": "Architecture",
          
          },
          {
            "Project Name": "Project3",
            "Industry Type": "Busssiness",
            "Practice Name": "Intigration",
            "Status": "InActive",
            "Architecture": "Architecture",
          
            }
    ]

 
  }
  sendMessage() {
    this.dataService.changeMessage(this.data);
  }

}
