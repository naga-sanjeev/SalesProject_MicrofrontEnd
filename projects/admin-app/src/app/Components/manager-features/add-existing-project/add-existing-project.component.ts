import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../../Services/data.service';
import { DetailsService } from '../../../Services/details.service';
import { accountDropdownQuery, addExistingQuery, industryDropdownQuery, practicesDropdownQuery, statusDropdown } from '../../../Services/query';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-existing-project',
  templateUrl: './add-existing-project.component.html',
  styleUrls: ['./add-existing-project.component.css']
})
export class AddExistingProjectComponent implements OnInit {
  addProjectForm!: FormGroup;
  selectedState: any = null;
  projectName: string = "Project Name";
  poc: string = "Poc"
  content: any;
  buttonName: string = "Add";
  date!: Date;
  addClientColor: string = "#0d416b";
  industryPlaceholder: string = "Industry Type"
  practicePlaceholder: string = "Practice"
  accountPlaceholder: string = "Account Type";
  technologyPlaceholder: string = "Technology";
  statusPlaceholder: string = "Status";
  fileToUpload: any;
  imageUrl: any;
  description: string = "Description";
  startDate: string = "Start Date";
  endDate: string = "End Date";
  data: string = "Add Existing Project";
  clientName: string = "Client Name"
  technology: string = "Technology"
  noFileText: string = 'No file chosen...';
  industrydropdownData: any = []
  practiceDropdownData: any = []
  accountsDropdownData: any = []
  statusDropdown: any = []
  tableData: any[] = []
  breadcrumb = [{ label: 'Home' }, { label: 'Add Existing Project' }]
  projectID: any;
  constructor(private fb: FormBuilder, private details: DetailsService, private dataService: DataService, public datePipe: DatePipe, public router: Router, private messageService: MessageService) { }
  submittedBy: any
  role: any
  reportsTo: any
  name: any
  fileName: any;
  ngOnInit(): void {
    this.submittedBy = JSON.parse(localStorage.getItem('Login') || '[]')?.userLogin?.userName
    this.role = JSON.parse(localStorage.getItem('Login') || '[]')?.userLogin?.role
    this.reportsTo = JSON.parse(localStorage.getItem('Login') || '[]')?.userLogin?.reportsTo
    this.name = JSON.parse(localStorage.getItem('Login') || '[]')?.userLogin?.name
    this.sendMessage()
    this.addProjectForm = this.fb.group({
      clientName: ['', Validators.required],
      projectName: ['', Validators.required],
      industryType: ['', Validators.required],
      accountType: ['', Validators.required],
      practiceName: ['', Validators.required],
      technology: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      status: ['', Validators.required],
      description: ['', Validators.required],
      imageUpload: ['']
    })
    this.onIndustryType();
    this.onPracticeType();
    this.onAccountType();
    this.statusName();
  }

  sendMessage() {
    this.dataService.changeMessage(this.data);
    localStorage.setItem('Sidebar', JSON.stringify("my-team-activities"))
  }

  handleFileInput(file: any) {
    this.fileToUpload = file.target.files[0];
    this.details.uploadFile(this.fileToUpload).subscribe((res: any) => {
      this.fileName = res.data.s3Url;
    })
  }

  clearImage() {
    this.addProjectForm.controls['imageUpload'].reset()
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.noFileText = file.name;
    } else {
      this.noFileText = 'No file chosen...';
    }
  }
  onAccountType() {
    this.details.getAccountDropdownData(accountDropdownQuery).subscribe((res: any) => {
      res.data.getAccounts.forEach((element: any) => {
        this.accountsDropdownData.push({ name: element.accountType, code: element.accountType })
      });
    })
  }
  onPracticeType() {
    this.details.getPracticesDropdownData(practicesDropdownQuery).subscribe((res: any) => {
      res.data.getPractices.forEach((element: any) => {
        this.practiceDropdownData.push({ name: element.name, code: element.name })
      });
    })
  }
  onIndustryType() {
    this.details.getIndustryDropdownData(industryDropdownQuery).subscribe((res: any) => {
      res.data.getIndustries.forEach((element: any) => {
        this.industrydropdownData.push({ name: element.name, code: element.name })
      });
    })
  }
  statusName() {
    this.details.getStatusDropdownData(statusDropdown).subscribe((res: any) => {
      res.data.getStatus.forEach((element: any) => {
        this.statusDropdown.push({ name: element.status, code: element.status })
      });
    })
  }

  addExistingProject() {
    if (this.addProjectForm.valid) {
      const requestBody =
      {
        clientName: this.addProjectForm.value.clientName,
        projectName: this.addProjectForm.value.projectName,
        industryType: this.addProjectForm.value.industryType,
        accountType: this.addProjectForm.value.accountType,
        practiceName: this.addProjectForm.value.practiceName,
        status: this.addProjectForm.value.status,
        technology: this.addProjectForm.value.technology,
        description: this.addProjectForm.value.description,
        startDate: this.datePipe.transform(this.addProjectForm.value.startDate, 'YYYY-MM-d'),
        endDate: this.datePipe.transform(this.addProjectForm.value.endDate, 'YYYY-MM-d'),
        reportsTo: this.reportsTo,
        submittedBy: this.submittedBy,
        role: this.role,
        name: this.name,
        architecture: this.fileName
      }
      this.details.postExistingProjectData(requestBody, addExistingQuery).subscribe((res: any) => {
        console.log(res);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Project added successfully' });
      });
    }
    else {
      const controls = this.addProjectForm.controls;
      Object.keys(controls).forEach(key => {
        controls[key].markAsTouched();
        controls[key].markAsDirty();
      })
    }
  }

}
