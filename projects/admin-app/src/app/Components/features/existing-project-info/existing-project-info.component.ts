
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DetailsService } from '../../../Services/details.service';
import { accountDropdownQuery, industryDropdownQuery, myActivities, practicesDropdownQuery, salesTraineeEditExisitingProjectQuery } from '../../../Services/query';
import { DatePipe } from '@angular/common';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-existing-project-info',
  templateUrl: './existing-project-info.component.html',
  styleUrls: ['./existing-project-info.component.css']
})
export class ExistingProjectInfoComponent implements OnInit {

  fileToUpload: any;
  imageUrl: any;
  name: string = '';
  code: any
  code1: any
  selectedIndustryType: string = ''
  selectedPracticeName: any
  editButton: string = "Edit";
  cancleButton: string = "Cancel";
  InputProjectName: string = "Enter Project Name";
  editForm: any;
  projectData: any;
  Description: string = "Description";
  infoForm: any;
  formControls: any
  editButtonColor: string = "#0d416b"
  industryPlaceholder: string = "Indusrty Type"
  practicePlaceholder: string = "Practice"
  technologyPlaceholder: string = "Technology"
  statusPlaceholder: string = "Status"
  clientPlaceholder: string = "Client Name"
  pocPlaceholder: string = "POC"
  requirementPlaceholder: string = "Requirement"
  conversationPlaceholder: string = 'conversation'
  startDate: string = "Date"
  result: any;
  matchedOption: any;
  data: any
  industrydropdownData: any = []
  practiceDropdownData: any = []
  AccountsDropdownData: any = []
  dropdownOptions: any = []
  indValue: any
  selectedState: any = null
  resetButton: string = "Reset";
  resetButtonColor: string = "#00aae7";
  projectId: any
  breadcrumb = [{ label: 'Home' }, { label: 'My Activities', routerLink: '/dashboard/MyActivities' }, { label: 'Existing Project Info' }]
  constructor(public datepipe: DatePipe, public active: ActivatedRoute, private fb: FormBuilder, private details: DetailsService, private messageService: MessageService) {
    this.infoForm = this.fb.group({
      clientName: ['', Validators.required],
      industryType: ['', Validators.required],
      practiceName: ['', Validators.required],
      pointOfContact: ['', Validators.required],
      requirement: ['', Validators.required],
      date: ['', Validators.required],
      conversation: ['', Validators.required],
    });
    this.formControls = [
      this.infoForm.get('clientName') as FormControl,
      this.infoForm.get('date') as FormControl,
      this.infoForm.get('industryType') as FormControl,
      this.infoForm.get('practiceName') as FormControl,
      this.infoForm.get('pointOfContact') as FormControl,
      this.infoForm.get('requirement') as FormControl,
      this.infoForm.get('conversation') as FormControl,
    ];
  }
  ngOnInit(): void {
    this.projectId = this.active.snapshot?.params['id']
    Promise.all([
      this.onIndustryType(),
      this.onPracticeType(),
      this.onAccountType()
    ]).then(() => {
      this.getTableData();
    });
  }
  getTableData() {
    const username = JSON.parse(localStorage.getItem('Login') || '[]')?.userLogin?.userName
    this.details.myActivities(myActivities, username).subscribe((res: any) => {
      this.data = res.data?.getMyActivitiesOfUser;
      this.projectData = this.data?.filter(
        (data: any) => data.projectId == this.active.snapshot?.params['id']
      ); 
      this.code1 = this.projectData[0]?.practiceName,
        this.selectedIndustryType = this.projectData[0]?.industryType
      this.patchingValue(this.projectData)
    })
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
  handleFileInput(file: any) {
    this.fileToUpload = file.item(0);
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }
  reset() {
    this.patchingValue(this.projectData)
  }
  patchingValue(data: any) {
    this.selectedIndustryType = data[0]?.industryType
    this.infoForm.patchValue({
      clientName: data[0]?.clientName,
      industryType: data[0]?.industryType,
      practiceName: data[0]?.practiceName,
      date: new Date(data[0]?.date),
      pointOfContact: data[0]?.pointOfContact,
      conversation: data[0]?.conversation,
      requirement: data[0]?.requirement
    });
  }
  edit() {
    const submittedBy = JSON.parse(localStorage.getItem('Login') || '[]')?.userLogin?.userName
    const role = JSON.parse(localStorage.getItem('Login') || '[]')?.userLogin?.role
    const reportsTo = JSON.parse(localStorage.getItem('Login') || '[]')?.userLogin?.reportsTo
    const name = JSON.parse(localStorage.getItem('Login') || '[]')?.userLogin?.name
    const requestBody = {
      projectId: parseFloat(this.projectId),
      clientName: this.infoForm.value.clientName,
      industryType: this.infoForm.value.industryType,
      practiceName: this.infoForm.value.practiceName,
      date: this.datepipe.transform(this.infoForm.value.date, 'YYYY-MM-dd'),
      pointOfContact: this.infoForm.value.pointOfContact,
      conversation: this.infoForm.value.conversation,
      requirement: this.infoForm.value.requirement,
      reportsTo: reportsTo,
      submittedBy: submittedBy,
      role: role,
      name: name
    }
    this.details.editSalesTrainee(requestBody, salesTraineeEditExisitingProjectQuery).subscribe((res: any) => {
      console.log(res);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data updated successfully' });
    })
  }

}
