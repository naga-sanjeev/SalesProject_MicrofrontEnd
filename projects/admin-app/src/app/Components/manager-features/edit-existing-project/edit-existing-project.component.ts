import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DetailsService } from '../../../Services/details.service';
import { DataService } from '../../../Services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { accountDropdownQuery, editExisitingProjectQuery, industryDropdownQuery, managerMyActivitiesQuery, practicesDropdownQuery, statusDropdown } from '../../../Services/query';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-existing-project',
  templateUrl: './edit-existing-project.component.html',
  styleUrls: ['./edit-existing-project.component.css']
})
export class EditExistingProjectComponent implements OnInit {
  editForm: FormGroup;
  selectedState: any = null;
  projectName: string = "Project Name";
  poc: string = "Poc"
  content: any;
  buttonName: string = "Update";
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
  projectId: any;
  resetButton: string = "Reset";
  resetButtonColor: string = "#00aae7";
  breadcrumb = [{ label: 'Home' }, { label: 'My Activities', routerLink: '/dashboard/MyActivities' }, { label: 'Edit Existing Project' }]
  tableData: any
  filteredTableData: any
  submittedBy: any
  role: any
  reportsTo: any
  name: any
  fileName: any;
  imageData: any;
  constructor(private fb: FormBuilder, private datePipe: DatePipe, private details: DetailsService, private dataService: DataService, public router: Router, private messageService: MessageService, private activatedRoute: ActivatedRoute,) {
    this.editForm = this.fb.group({
      clientName: ['', Validators.required],
      projectName: ['', Validators.required],
      industryType: ['', Validators.required],
      accountType: ['', Validators.required],
      practiceName: ['', Validators.required],
      technology: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      status: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.projectId = this.activatedRoute.snapshot?.params['id']
    this.submittedBy = JSON.parse(localStorage.getItem('Login') || '[]')?.userLogin?.userName
    this.role = JSON.parse(localStorage.getItem('Login') || '[]')?.userLogin?.role
    this.reportsTo = JSON.parse(localStorage.getItem('Login') || '[]')?.userLogin?.reportsTo
    this.name = JSON.parse(localStorage.getItem('Login') || '[]')?.userLogin?.name
    Promise.all([
      this.sendMessage(),
      this.onIndustryType(),
      this.onPracticeType(),
      this.onAccountType(),
      this.statusName()
    ]).then(() => {
      this.getManagerTableData();
    });
  }
  getManagerTableData() {
    const username = JSON.parse(localStorage.getItem('Login') || '[]')?.userLogin?.userName;
    this.details.managerMyActivites(managerMyActivitiesQuery, username).subscribe((data: any) => {
      this.tableData = data.data?.getMyActivitiesOfUser;
      this.filteredTableData = this.tableData?.filter(
        (data: any) => data?.projectId == this.activatedRoute.snapshot?.params['id']
      );
      this.patchingValue(this.filteredTableData)
    })
  }
  patchingValue(data: any) {
    this.noFileText = data[0]?.architecture === '' ? 'No file Chosen...' : data[0]?.architecture
    this.editForm.patchValue({
      clientName: data[0]?.clientName,
      projectName: data[0]?.projectName,
      industryType: data[0]?.industryType,
      accountType: data[0]?.accountType,
      practiceName: data[0]?.practiceName,
      status: data[0]?.status,
      startDate: new Date(data[0]?.startDate),
      endDate: new Date(data[0]?.endDate),
      technology: data[0]?.technology,
      description: data[0]?.description
    });
  }

  sendMessage() {
    this.dataService.changeMessage(this.data);
    localStorage.setItem('Sidebar', JSON.stringify("my-team-activities"))
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
    if (this.editForm.valid) {
      const requestBody =
      {
        projectId: parseFloat(this.projectId),
        clientName: this.editForm.value.clientName,
        projectName: this.editForm.value.projectName,
        industryType: this.editForm.value.industryType,
        accountType: this.editForm.value.accountType,
        practiceName: this.editForm.value.practiceName,
        status: this.editForm.value.status,
        technology: this.editForm.value.technology,
        description: this.editForm.value.description,
        startDate: this.datePipe.transform(this.editForm.value.startDate, 'YYYY-MM-dd'),
        endDate: this.datePipe.transform(this.editForm.value.endDate, 'YYYY-MM-dd'),
        reportsTo: this.reportsTo,
        submittedBy: this.submittedBy,
        role: this.role,
        name: this.name,
        architecture: this.fileName
      }
      this.details.editExistingProjectManager(requestBody, editExisitingProjectQuery).subscribe((res: any) => {
        console.log(res);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data updated successfully' });
      });
    }
    else {
      const controls = this.editForm.controls;
      Object.keys(controls).forEach(key => {
        controls[key].markAsTouched();
        controls[key].markAsDirty();
      })
    }
  }
  reset() {
    this.patchingValue(this.filteredTableData);
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    this.details.uploadFile(file).subscribe((res: any) => {
      this.fileName = res.data.s3Url;
    })
    if (file) {
      this.noFileText = file.name;
    } else {
      this.noFileText = 'No file chosen...';
    }
  }

}
