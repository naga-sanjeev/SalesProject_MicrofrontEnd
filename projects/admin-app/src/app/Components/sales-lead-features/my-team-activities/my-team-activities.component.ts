import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { industryDropdownQuery, practicesDropdownQuery, reportsToQuery } from '../../../Services/query';
import { DetailsService } from '../../../Services/details.service';
import { DataService } from '../../../Services/data.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-my-team-activities',
  templateUrl: './my-team-activities.component.html',
  styleUrls: ['./my-team-activities.component.css']
})
export class MyTeamActivitiesComponent implements OnInit {
  data: string = "My Team Activities"
  loginData: any
  reportsTo: any
  tableData: any[] = []
  InputFieldName: string = "Client Name"
  selectedState: any;
  selectedState2: any;
  cols: any
  resetButton: string = "Reset";
  searchButton: string = "Search";
  resetButtonColor: string = "#0d416b";
  searchButtonColor: string = "#00aae7";
  content: any
  industryPlaceholder: string = "Industry Type";
  practicePlaceholder: string = "Practice"
  myTeamActivitiesForm: FormGroup;
  dateField: string = "Date";
  industrydropdownData: any = [];
  practiceDropdownData: any = [];
  searchData: any;
  filteredTableData: any = [];
  display: boolean = false;
  breadcrumb = [{ label: 'Home' }, { label: 'My Team Activities' }]
  autocompleteValues: any = [];
  constructor(private fb: FormBuilder, private details: DetailsService, private dataService: DataService, private datePipe: DatePipe) {
    this.myTeamActivitiesForm = this.fb.group({
      clientName: [[]],
      industryType: [[]],
      practice: [[]],
      date: ['']
    })
  }
  ngOnInit() {
    this.sendMessage()
    this.loginData = localStorage.getItem('Login');
    const storedData = JSON.parse(this.loginData)
    this.reportsTo = storedData?.userLogin.reportsTo;
    this.getTableData()
    this.cols = [
      { field: 'clientName', header: 'Client Name' },
      { field: 'industryType', header: 'Industry Type' },
      { field: 'practiceName', header: 'Practice Name' },
      { field: 'date', header: 'Date' },
      { field: 'name', header: 'Submitted By' }
    ];
    this.onPracticeType();
    this.onIndustryType();
  }
  
  autoCompleteSelected(value: any) {
    console.log('AutoComplete Selected:', value);
  }
  getTableData() {
    const reportsTo = JSON.parse(localStorage.getItem('Login') || '[]')?.userLogin?.reportsTo
    this.details.myTeamActivities(reportsToQuery, reportsTo).subscribe((data: any) => {
      this.tableData = data.data.getMyTeamActivities;
      this.filteredTableData = this.tableData;
      this.filteredTableData.forEach((item: any) => {
        this.autocompleteValues.push({ label: item.clientName });
      });
    })
  }
  sendMessage() {
    this.dataService.changeMessage(this.data);
    localStorage.setItem('Sidebar', JSON.stringify("my-team-activities"))
  }
  onIndustryType() {
    this.details.getIndustryDropdownData(industryDropdownQuery).subscribe((data: any) => {
      data.data.getIndustries.forEach((element: any) => {
        this.industrydropdownData.push({ name: element.name, code: element.name })
      });
    })
  }
  onPracticeType() {
    this.details.getPracticesDropdownData(practicesDropdownQuery).subscribe((data: any) => {
      data.data.getPractices.forEach((element: any) => {
        this.practiceDropdownData.push({ name: element.name, code: element.name })
      });
    })
  }
  reset() {
    this.myTeamActivitiesForm.reset();
    this.getTableData();
  }
  search() {
    let searchCriteria = {
      clientName: this.myTeamActivitiesForm.value.clientName,
      industryType: this.myTeamActivitiesForm.value.industryType,
      practice: this.myTeamActivitiesForm.value.practice,
      date: this.datePipe.transform(this.myTeamActivitiesForm.value.date, 'yyyy-MM-dd')
    };
    if (!searchCriteria.clientName) {
      searchCriteria.clientName = null
    }
    else if (this.myTeamActivitiesForm.value.clientName.length == 0) {
      searchCriteria.clientName = null
    }
    if (!searchCriteria.industryType) {
      searchCriteria.industryType = null
    } 
    else if (this.myTeamActivitiesForm.value.industryType.length == 0) {
      searchCriteria.industryType = null
    }
    if (!searchCriteria.practice) {
      searchCriteria.practice = null
    }
    else if (this.myTeamActivitiesForm.value.practice.length == 0) {
      searchCriteria.practice = null
    }
    this.filteredTableData = this.tableData.filter((item: any) => {
      return (!searchCriteria.clientName || searchCriteria.clientName.some((project: any) => project.label.toLowerCase() === item.clientName.toLowerCase())) &&
        (!searchCriteria.industryType || searchCriteria.industryType.some((project: any) => project.toLowerCase() === item.industryType.toLowerCase())) &&
        (!searchCriteria.practice || searchCriteria.practice.some((project: any) => project.toLowerCase() === item.practiceName.toLowerCase())) &&
        (!searchCriteria.date || this.datePipe.transform(item.date, 'yyyy-MM-dd') === searchCriteria.date);
    });
  }

  globalSearch(event: any) {
    if (this.searchData?.trim().length > 0) {
      this.display = true;
    } else {
      this.display = false;
    }
    this.searchData = event.target.value
    this.filteredTableData =this.tableData.filter((obj:any)=>{
      for(let key in obj){
        if(typeof obj[key] === 'string' &&  obj[key].toLowerCase().includes(this.searchData)){
          return obj
        }
      }
    })
    if (event.target.value == "") {
    }
  }
  remove() {
    console.log(this.searchData)
    this.searchData = ''
    this.display = false;
    this.getTableData()
  }

}
