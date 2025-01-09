import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  myForm!: FormGroup;
  // @Input() rowData: any;
  // @Input() column: any;
   value:boolean=false
   value1:boolean=false
  constructor(private fb: FormBuilder,public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit(): void {

    if (this.config.header=="Dialog for architecture"){
      this.value=true
     console.log("hello this happend")
    }
    else{
      this.value1=true
    this.myForm = this.fb.group({
      // Define your form controls here based on your row data
      ProjectName : ['', Validators.required],
      IndustryType : ['', Validators.required],
      PracticeName : ['', Validators.required],
      Status : ['', Validators.required],
      // Add other form controls as needed
    });
    this.myForm.patchValue({
      ProjectName: this.config.data.rowData.ProjectName,
      IndustryType: this.config.data.rowData.IndustryType,
      PracticeName: this.config.data.rowData.PracticeName,
      Status: this.config.data.rowData.Status,
      // Patch other form controls based on your row data
    });
  }
    console.log('refref',this.config)
  }
  onClick(){
  console.log(this.myForm.value,"data")
  this.ref.close()
  }
}
