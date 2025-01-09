import { Component, HostListener, Input, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { DataService } from '../../data.service';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  constructor(private primengConfig: PrimeNGConfig,private dataService: DataService) { }
  menu2:any
  visibleSidebar1:any;
  sidebar:boolean=true
  profileMode = 'popup';
  model = []
  ripple: boolean=false;
  menuItems: any;
  activeLink: any;
  screenWidth: any;  
  screenHeight: any;
  sidenav1:boolean=true
  sidenav2:boolean=false
  mobileView:boolean=false
  mobileLinkSelected=false
  flexLayout:any
  ngOnInit(): void {
    this.menuItems = [
      { label: 'Projects', icon: 'pi pi-book', link: 'projects' },
      { label: 'Add New Client', icon: 'pi pi-user', link: 'AddNewClient' },
      { label: 'My Activities', icon: 'pi pi-file-edit', link: 'MyActivities' },
    ];
    this.onResize(event)
  }
  @HostListener('window:resize', ['$event']) 
  onResize(event:any) {  
    this.screenWidth = window.innerWidth;     
    this.screenHeight = window.innerHeight;  
    if(window.innerWidth>1000)
    {
      this.sidenav2=false
      this.sidenav1=true
      this.mobileView=false
      console.log("sidebar 1:"+this.sidenav1);
    }
    else{
      this.sidenav1=false
      this.sidenav2=true
      this.mobileView=true
      console.log("sidebar 2:"+this.sidenav2);
    }
  }
  menu = [
    { name: 'Projects' },
    { name: 'Add New Client' },
    { name: 'My Activities'}
  ]
  onClickSideNav($event:any){
    this.visibleSidebar1!=this.visibleSidebar1;
    console.log("sidenav calling");
  }
  isActive(link: string): boolean {
    return this.activeLink === link;
  }
  setActive(link: string): void {
    this.activeLink = link;
  }
  linkSelected(){
    if(window.innerWidth<1000){
      console.log("lesser than 1000 link selected");
      this.mobileLinkSelected=!this.mobileLinkSelected
      this.dataService.mobileSideMenu(this.mobileLinkSelected)
    }
  }
}
