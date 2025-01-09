import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  data: string = "Projects"
  selectedState: any = null;
  name: any
  test: string = "Select Project Name"
  InputFieldName: string = "Select Project Name"
  color: string = "#2368A0"
  buttonName: string = "Reset"
  searchData: any;
  visible: boolean = false;
  states: any[] = [
    { name: 'Industry Type', code: 'Industry Type' },
    { name: 'Atomative', code: 'Atomative' },
    { name: 'Banking & finance', value: 'Banking & finance' },
    { name: 'Business services', code: 'Business services' },
    { name: 'Chemicals', code: 'Chemicals' }
  ];
  states1: any[] = [
    { name: 'Account Type', code: 'Account Type' },
    { name: 'Consultant', code: 'Consultant' },
    { name: 'Contractor', value: 'Contractor' },
    { name: 'Customer', code: 'Customer' }

  ];
  states2: any[] = [
    { name: 'Practice', code: 'Account Type' },
    { name: 'App dev', code: 'Consultant' },
    { name: 'B2B', value: 'Contractor' },
    { name: 'Intigration', code: 'Customer' }

  ];
  cols = [
    { field: 'ProjectName', header: 'Project Name' },
    { field: 'IndustryType', header: 'Industry Type' },
    { field: 'PracticeName', header: 'Practice Name' },
    { field: 'Status', header: 'Status' },
    { field: 'Architecture', header: 'Architecture' },
    { field: 'Project Info', header: 'Project Info' },
    { field: 'Actions', header: 'Actions' },

  ];
  content = [
    {
      "ProjectName": "Project1",
      "IndustryType": "Health Care",
      "PracticeName": "App Dev",
      "Status": "Active",
      "Architecture": "Architecture",
     
    },
    {
      "ProjectName": "Project2",
      "IndustryType": "Busssiness",
      "PracticeName": "B2B",
      "Status": "InActive",
      "Architecture": "Architecture",
     
    },
    {
      "ProjectName": "Project3",
      "IndustryType": "Busssiness",
      "PracticeName": "Intigration",
      "Status": "InActive",
      "Architecture": "Architecture",
     
    }
  ]
  constructor(private dataService: DataService) {
  }
  ngOnInit() {
    this.sendMessage()
  }
  sendMessage() {
    this.dataService.changeMessage(this.data);
  }
  clear(event: any) {
    if (event.target.value == "") {
    }
  }
  clearSearch() {
    if (this.searchData !== "") {
      this.searchData = "";
    }
  }
  search() {
    this.visible = false
  }
}
