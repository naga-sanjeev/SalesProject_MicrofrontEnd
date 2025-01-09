import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
  items: any;
  @Input() key: any
  home: any;
  menu2: any
  constructor(private dataService: DataService) { }
  items2 = []
  ngOnInit(): void {
    this.dataService.currentMessage.subscribe(message => {
      console.log(message)
      this.menu2 = message;
    });

    this.items = [
      { label: 'saikumar' },
    ];
    this.items = this.items.map((item: any) => ({ ...item, label: this.menu2 }));
    console.log(this.items)
    this.home = { label: "Home", routerLink: '/' };
  }

}
