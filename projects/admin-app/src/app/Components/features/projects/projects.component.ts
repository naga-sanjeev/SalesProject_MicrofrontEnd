import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../Services/data.service';
import { DetailsService } from '../../../Services/details.service';
import { accountDropdownQuery, industryDropdownQuery, practicesDropdownQuery, projectNameQuery, userRoleQuery } from '../../../Services/query';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  data: string = "Projects"
  selectedState: any
  name: any
  test: string = "Select Project Name"
  InputFieldName: string = "Select Project Name"
  color: string = "#2368A0"
  buttonName: string = "Reset"
  searchData: any;
  visible: boolean = false;
  resetButton: string = "Reset";
  searchButton: string = "Search";
  resetButtonColor: string = "#0d416b";
  searchButtonColor: string = "#00aae7";
  industrydropdownData: any = []
  practiceDropdownData: any = []
  AccountsDropdownData: any = []
  industryPlaceholder: string = "Industry Type"
  practicePlaceholder: string = "Practice"
  accountPlaceholder: string = "Account Type"
  loginData: any
  userName: any
  form: any
  tableData: any[] = [];
  display: boolean = false;
  cols = [
    { field: 'projectName', header: 'Project Name' },
    { field: 'industryType', header: 'Industry Type' },
    { field: 'practiceName', header: 'Practice Name' },
    { field: 'status', header: 'Status' },
    { field: 'architecture', header: 'Architecture' },
    { field: 'projectInfo', header: 'Project Info' }
  ];
  autocompleteValues: any = [];
  projectForm: FormGroup;
  results: any;
  filteredValues: any
  userRole: any = JSON.parse(localStorage.getItem('Login') || '[]')?.userLogin?.role
  filteredTableData: any = [];
  breadcrumb = [{ label: 'Home' }, { label: 'Projects' }]
  constructor(private dataService: DataService, private details: DetailsService, private fb: FormBuilder) {
    this.projectForm = this.fb.group({
      projectName: [[]],
      industryType: [[]],
      practiceType: [[]],
      accountType: [[]]
    })
  }
  ngOnInit() {
    this.loginData = localStorage.getItem('Login');
    const storedData = JSON.parse(this.loginData)
    this.userName = storedData?.userLogin.name;
    this.getTableData();
    this.sendMessage();
    this.onIndustryType();
    this.onPracticeType();
    this.onAccountType();
    this.getAutoCompleteData();
  }
  reset() {
    this.projectForm.reset();
    this.getTableData();
  }
  search() {
    let searchCriteria = {
      projectName: this.projectForm.value.projectName,
      industryType: this.projectForm.value.industryType,
      practiceType: this.projectForm.value.practiceType,
      accountType: this.projectForm.value.accountType
    };
    if (!searchCriteria.projectName) {
      searchCriteria.projectName = null
    }
    else if (this.projectForm.value.projectName.length == 0) {
      searchCriteria.projectName = null
    }
    if (!searchCriteria.industryType) {
      searchCriteria.industryType = null
    }
    else if (this.projectForm.value.industryType.length == 0) {
      searchCriteria.industryType = null
    }
    if (!searchCriteria.practiceType) {
      searchCriteria.practiceType = null
    }
    else if (this.projectForm.value.practiceType.length == 0) {
      searchCriteria.practiceType = null
    }
    if (!searchCriteria.accountType) {
      searchCriteria.accountType = null
    }
    else if (this.projectForm.value.accountType.length == 0) {
      searchCriteria.accountType = null
    }
    this.filteredTableData = this.tableData.filter((item: any) => {
      return (!searchCriteria.projectName || searchCriteria.projectName.some((project: any) => project.label === item.projectName)) &&
        (!searchCriteria.industryType || searchCriteria.industryType.some((project: any) => project.toLowerCase() === item.industryType.toLowerCase())) &&
        (!searchCriteria.practiceType || searchCriteria.practiceType.some((project: any) => project.toLowerCase() === item.practiceName.toLowerCase())) &&
        (!searchCriteria.accountType || searchCriteria.accountType.some((project: any) => project.toLowerCase() === item.accountType.toLowerCase()));
    });
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
  onAccountType() {
    this.details.getAccountDropdownData(accountDropdownQuery).subscribe((data: any) => {
      data.data.getAccounts.forEach((element: any) => {
        this.AccountsDropdownData.push({ name: element.accountType, code: element.accountType })
      });
    })
  }
  getTableData() {
    this.details.projectsTableData(userRoleQuery).subscribe((data: any) => {
      this.tableData = data.data.getProjectsTableData;
      this.filteredTableData = this.tableData;
    })
  }
  sendMessage() {
    this.dataService.changeMessage(this.data);
    this.dataService.sideBar('projects');
  }
  displayCounter(key: any) {
    this.selectedState = key;
  }
  autoCompleteSelected(value: any) {
    console.log('AutoComplete Selected:', value);
  }

  getAutoCompleteData() {
    this.details.autoCompleteProject(projectNameQuery).subscribe((data: any) => {
      data.data.getProjects.forEach((ele: any) => {
        this.autocompleteValues.push({ pId: ele.projectId, label: ele.projectName })
      })
    })
  }
  dropdownSelected(value: any) {
    console.log('Dropdown Selected:', value);
  }

  globalSearch(event: any) {
    if (this.searchData?.trim().length > 0) {
      this.display = true;
    } else {
      this.display = false;
    }
    this.searchData = event.target.value
    this.filteredTableData = this.tableData.filter((obj: any) => {
      for (let key in obj) {
        if (typeof obj[key] === 'string' && obj[key].toLowerCase().includes(this.searchData)) {
          return obj
        }
      }
    })
    if (event.target.value == "") {
    }
  }
  remove() {
    this.searchData = ''
    this.display = false;
    this.getTableData()
  }
}
