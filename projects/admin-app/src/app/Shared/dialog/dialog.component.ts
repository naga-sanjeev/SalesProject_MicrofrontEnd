import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { DetailsService } from '../../Services/details.service';
import { historyQuery } from '../../Services/query';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  myForm!: FormGroup;
  // @Input() rowData: any;
  // @Input() column: any;
  value: boolean = false
  value1: boolean = false
  history: boolean = false
  download: boolean = true
  events1 !: any[];
  historyData: any;
  historyDisplay: any;
  salesTraineeMyActivities: boolean = false;
  constructor(private fb: FormBuilder, public ref: DynamicDialogRef, public config: DynamicDialogConfig, public detailsService: DetailsService, public datePipe: DatePipe) { }

  ngOnInit(): void {
    //     if(this.config.data.rowData=="architecture"){
    // console.log("my world")
    // this.value=false
    //     }
    if (this.config.header === "Project Architecture" && this.config.data?.rowData != "architecture") {
      this.value = true
    }
    else if (this.config.header === "Project Edit History") {
      this.history = true;
      this.historyData = this.config.data?.rowData
      console.log(this.historyData.projectId);
      this.updateTimeLine();
    }
    else if (this.config.header == 'Notes') {
      this.salesTraineeMyActivities = true
    }
    else {
      this.value1 = true
      this.myForm = this.fb.group({
        // Define your form controls here based on your row data
        ProjectName: ['', Validators.required],
        IndustryType: ['', Validators.required],
        PracticeName: ['', Validators.required],
        Status: ['', Validators.required],
        // Add other form controls as needed
      });
      this.myForm.patchValue({
        ProjectName: this.config.data?.rowData.projectName,
        IndustryType: this.config.data?.rowData.industryType,
        PracticeName: this.config.data?.rowData.practiceName,
        Status: this.config.data?.rowData.status,
        // Patch other form controls based on your row data
      });
    }
  }
  onClick() {
    console.log(this.myForm.value, "data")
    this.ref.close()
  } 

  updateTimeLine() {
    const projectId = this.historyData?.projectId;
    this.detailsService.historyTableData(historyQuery, projectId).subscribe(res => {
      this.historyDisplay = res.data.getProjectsHistoryByProjectId;
      console.log(this.historyDisplay);
      if (this.historyDisplay.length > 0) {
        if (this.historyDisplay.length === 1) {
          this.historyDisplay = [
            {
              status: '<strong>Created By</strong><br>' + this.historyDisplay[0]?.submittedBy,
              date: this.parseDate(this.historyDisplay[0]?.createdAt)
            },
            {
              status: 'Not updated yet',
              date: '' 
            }
          ];
        } else {
          const creationItem = this.historyDisplay[0]; 
          const updateItems = this.historyDisplay.slice(1);
          this.historyDisplay = [
            {
              status: '<strong>Created By</strong><br>' + creationItem?.submittedBy,
              date: this.parseDate(creationItem.createdAt)
            },
            ...updateItems.map((item: any) => {
              return {
                status: '<strong>Updated By</strong><br>' + item?.submittedBy,
                date: this.parseDate(item.createdAt)
              };
            })
          ];
        }
      }
    });
  }
  
  parseDate(date: string) {
    const parsedDate = new Date(date);
    return isNaN(parsedDate.getTime()) ? date : this.datePipe.transform(parsedDate, "MMM dd, yyyy 'at' hh:mm:ss a");
  }
  
}
