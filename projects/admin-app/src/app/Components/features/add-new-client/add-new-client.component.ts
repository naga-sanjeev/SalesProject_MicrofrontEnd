import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../Services/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DetailsService } from '../../../Services/details.service';
import { addNewClientQuery, industryDropdownQuery, practicesDropdownQuery } from '../../../Services/query';
import { DatePipe } from '@angular/common';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-new-client',
  templateUrl: './add-new-client.component.html',
  styleUrls: ['./add-new-client.component.css']
})
export class AddNewClientComponent implements OnInit {
  data: string = "Add New Client"
  selectedState: any = null;
  clientName: string = "Client Name";
  poc: string = "Poc"
  name: any
  content: any;
  buttonName: string = "Add";
  addClientColor: string = "#0d416b";
  resetbuttonColor: string = "#00aae7"
  resetButtonName: string = "Reset"
  datefield: string = "Start Date"
  sectorPlaceholder: string = "Industry Type"
  industrydropdownData: any = []
  practiceDropdownData: any = []
  practicePlaceholder: string = "Practice"
  selectedIndustryType: any;
  selectedPracticeType: any;
  userName: any;
  reportsTo: any;
  role: any;
  Requirement: string = "Requirement";
  Conversation: string = "Conversation";
  addClient: FormGroup;
  breadcrumb = [{ label: 'Home' }, { label: 'Add New Client' }]
  constructor(private dataService: DataService, private fb: FormBuilder, private details: DetailsService, private datePipe: DatePipe, private messageService: MessageService) {
    this.addClient = this.fb.group({
      clientName: ['', Validators.required],
      sectorType: ['', Validators.required],
      practiceType: ['', Validators.required],
      date: ['', Validators.required],
      poc: ['', Validators.required],
      requirement: ['', Validators.required],
      conversation: ['', Validators.required]
    })
  }
  ngOnInit(): void {
    this.userName = JSON.parse(localStorage.getItem('Login') || '[]')?.userLogin?.userName;
    this.reportsTo = JSON.parse(localStorage.getItem('Login') || '[]')?.userLogin?.reportsTo;
    this.role = JSON.parse(localStorage.getItem('Login') || '[]')?.userLogin?.role;
    this.name = JSON.parse(localStorage.getItem('Login') || '[]')?.userLogin?.name;
    // this.sendMessage();
    this.onIndustryType();
    this.onPracticeType();
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
  // sendMessage() {
  //   this.dataService.changeMessage(this.data);
  //   this.dataService.sideBar('AddNewClient')
  // }
  addClientEvent() {
    if (this.addClient.valid) {
      const requestBody =
      {
        clientName: this.addClient.value.clientName,
        industryType: this.addClient.value.sectorType,
        practiceName: this.addClient.value.practiceType,
        requirement: this.addClient.value.requirement,
        date: this.datePipe.transform(this.addClient.value.date, 'YYYY-MM-dd'),
        conversation: this.addClient.value.conversation,
        pointOfContact: this.addClient.value.poc,
        submittedBy: this.userName,
        role: this.role,
        name: this.name,
        reportsTo: this.reportsTo
      }
      this.details.postAddNewClientData(requestBody, addNewClientQuery).subscribe((res: any) => {
        console.log(res);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Project added successfully' });
        this.addClient.reset();
      });
    } else {
      const controls = this.addClient.controls;
      Object.keys(controls).forEach(key => {
        controls[key].markAsTouched();
        controls[key].markAsDirty();
      })
    }
  }
  reset() {
    this.addClient.reset();
  }
}