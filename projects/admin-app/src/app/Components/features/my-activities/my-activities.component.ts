import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../Services/data.service';
import { DetailsService } from '../../../Services/details.service';
import { industryDropdownQuery, managerMyActivitiesQuery, myActivities, practicesDropdownQuery,projectNameQuery } from '../../../Services/query';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-my-activities',
  templateUrl: './my-activities.component.html',
  styleUrls: ['./my-activities.component.css']
})
export class MyActivitiesComponent implements OnInit {
  data: string = "My activities"
  dateField: string = "Date"
  InputFieldName: string = "Client Name"
  selectedState: any;
  selectedState2: any;
  practicePlaceholder: string = "Practice"
  industryPlaceholder: string = "Industry Type"
  loginData: any
  userName: any
  tableData: any[] = []
  searchData: any;
  cols: any = [];
  buttonName: string = "Reset";
  color: string = "Primary"
  resetButton: string = "Reset";
  searchButton: string = "Search";
  resetButtonColor: string = "#0d416b";
  searchButtonColor: string = "#00aae7";
  industrydropdownData: any = []
  practiceDropdownData: any = []
  filteredTableData: any = [];
  myActivitiesForm: FormGroup;
  display: boolean = false;
  userRole: any = JSON.parse(localStorage.getItem('Login') || '[]')?.userLogin?.role;
  breadcrumb = [{ label: 'Home' }, { label: 'My Activities' }]
  autocompleteValues: any = [];
  constructor(private dataService: DataService, private details: DetailsService, private fb: FormBuilder, private datePipe: DatePipe) {
    this.myActivitiesForm = this.fb.group({
      clientName: [[]],
      industryType: [[]],
      practice: [[]],
      date: ['']
    })
  }
  ngOnInit() {
    this.loginData = localStorage.getItem('Login');
    const storedData = JSON.parse(this.loginData)
    this.userName = storedData?.userLogin.role;
    this.sendMessage();
    this.roleBaseTableHeaders();
    this.onPracticeType();
    this.onIndustryType();
  }
  reset() {
    this.myActivitiesForm.reset();
    this.getTableData();
  }
  autoCompleteSelected(value: any) {
    console.log('AutoComplete Selected:', value);
  }

  getAutoCompleteData() {
    this.details.autoCompleteProject(projectNameQuery).subscribe((data: any) => {
      console.log(data.data.getProjects);
      data.data.getProjects.forEach((ele: any) => {
        this.autocompleteValues.push({ pId: ele.projectId, label: ele.projectName })
      })
    })
  }
  search() {
    let searchCriteria = {
      clientName: this.myActivitiesForm.value.clientName,
      industryType: this.myActivitiesForm.value.industryType,
      practice: this.myActivitiesForm.value.practice,
      date: this.datePipe.transform(this.myActivitiesForm.value.date, 'yyyy-MM-dd')
    };
    if (!searchCriteria.clientName) {
      console.log("clientName is not selected");
      searchCriteria.clientName = null
    }
    else if (this.myActivitiesForm.value.clientName.length == 0) {
      console.log("clientName length is zero");
      searchCriteria.clientName = null
    }
    if (!searchCriteria.industryType) {
      console.log('industry not selected');
      searchCriteria.industryType = null
    } 
    else if (this.myActivitiesForm.value.industryType.length == 0) {
      console.log("industryType length is zero");
      searchCriteria.industryType = null
    }
    if (!searchCriteria.practice) {
      console.log("practiceName not selected");
      searchCriteria.practice = null
    }
    else if (this.myActivitiesForm.value.practice.length == 0) {
      console.log("practiceType length is zero");
      searchCriteria.practice = null
    }
    this.filteredTableData = this.tableData.filter((item: any) => {
      return (!searchCriteria.clientName || searchCriteria.clientName.some((project: any) => project.label.toLowerCase() === item.clientName.toLowerCase())) &&
        (!searchCriteria.industryType || searchCriteria.industryType.some((project: any) => project.toLowerCase() === item.industryType.toLowerCase())) &&
        (!searchCriteria.practice || searchCriteria.practice.some((project: any) => project.toLowerCase() === item.practiceName.toLowerCase())) &&
        (!searchCriteria.date || this.datePipe.transform(item.date, 'yyyy-MM-dd') === searchCriteria.date);
    });
  }

  sendMessage() {
    this.dataService.changeMessage(this.data);
    this.dataService.sideBar('MyActivities');
  }
  getTableData() {
    const username = JSON.parse(localStorage.getItem('Login') || '[]')?.userLogin?.userName
    this.details.myActivities(myActivities, username).subscribe((data: any) => {
      this.tableData = data.data.getMyActivitiesOfUser;
      this.filteredTableData = this.tableData;
      this.filteredTableData.forEach((item: any) => {
        this.autocompleteValues.push({ label: item.clientName });
      });
    })
  }
  getManagerTableData() {
    const username = JSON.parse(localStorage.getItem('Login') || '[]')?.userLogin?.userName;
    this.details.managerMyActivites(managerMyActivitiesQuery, username).subscribe((data: any) => {
      this.tableData = data.data.getMyActivitiesOfUser;
      this.filteredTableData = this.tableData;
      this.getAutoCompleteData()
    })
  }
  roleBaseTableHeaders() {
    if (this.userRole == 'Project Manager') {
      this.cols = [
        { field: 'clientName', header: 'Client Name' },
        { field: 'industryType', header: 'Industry Type' },
        { field: 'practiceName', header: 'Practice Name' },
        { field: 'architecture', header: 'Architecture' },
        { field: 'projectInfo', header: 'Project Info' },
        { field: 'Actions', header: 'Actions' },
      ]
      this.getManagerTableData();
    }
    else if (this.userRole == 'Sales Lead') {
      this.cols = [
        { field: 'clientName', header: 'Client Name' },
        { field: 'industryType', header: 'Industry Type' },
        { field: 'practiceName', header: 'Practice Name' },
        { field: 'date', header: 'Date' },
        { field: 'name', header: 'Submitted By' },
        { field: 'notes', header: 'Notes' },
        { field: 'Actions', header: 'Actions' },
      ]
      this.getTableData();
    }
    else {
      this.cols = [
        { field: 'clientName', header: 'Client Name' },
        { field: 'industryType', header: 'Industry Type' },
        { field: 'practiceName', header: 'Practice Name' },
        { field: 'date', header: 'Date' },
        { field: 'notes', header: 'Notes' },
        { field: 'Actions', header: 'Actions' },
      ]
      this.getTableData();
    }
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
