import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {DialogService} from 'primeng/dynamicdialog';
import { DialogComponent } from '../dialog/dialog.component';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  providers: [DialogService],
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() table_Columns: any
  @Input() table_Data: any
  display: boolean = false;
  key: boolean = false;
  cols: any
  products: any
  value: any
  editForm: any;
  data: any
  showDialog: boolean = false;
  loginForm: any;
  myForm: any;
  content:boolean=false
  constructor(private dialogService: DialogService) { }

  ngOnInit(): void {
    this.cols = this.table_Columns
    this.products = this.table_Data

   
    
  }
  // ngOnChanges() : void {
  //   this.showArchitecture()
  // }
  showArchitecture() {
    this.showDialog = true;
    console.log(this.showDialog,"this.showDialog")
  }
  onClick(rowData: any) {
    console.log(rowData)
  } 
  // openDialog(columns:any){
  //   if(columns=="Notes" ||  columns=="Architecture"){
  //     this.display = true;
  //   }
  //  console.log(columns,this.display)
  // }


  openDialog(rowData: any, column: any,index:any): void {
       this.data=rowData.IndustryType;
    console.log(index,"jhvfeyu")
    const ref = this.dialogService.open(DialogComponent, {

      data: {
        rowData},
      header: `Dialog for ${rowData[column.field]}`,
      width: '50%'
    });
  }


openDialog1(rowData: any, column: any,){

console.log(column,"jhvfeyu")
  const ref = this.dialogService.open(DialogComponent, {
    data: {
      rowData},
    header: `Dialog for architecture`,
    width: '50%'
  });
  

}

}
