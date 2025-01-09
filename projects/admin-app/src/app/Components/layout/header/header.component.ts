import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  name: string = ''
  visibleSidebar1: any;
  sidebar: boolean = false
  sidemenu: boolean = true
  sidemenu2: boolean = false
  screenWidth: any;
  screenHeight: any;
  header1: boolean = true
  header2: boolean = false
  mobileLogo:boolean=false
  profileImg:boolean=true
  fxLayoutAlign:any='space-between center'
  constructor(private dataService: DataService) { }
  ngOnInit(): void {
    this.name = 'Sai kumar Induga'; console.log(window.innerWidth);
    this.onResize(event)
    this.dataService.currentMessage3.subscribe(message=>{
      // console.log("side menu selected");
      // this.onResize(event)
      this.clickSideBar()
      // this.profileImg=!this.profileImg
    })
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    if (window.innerWidth > 1000) {console.log("greater than 1000 in header component");
      this.header2 = false
      this.header1 = true
      this.mobileLogo=false
    }
    else {console.log("lesser than 1000 in header componnet ");
      this.header1 = false
      this.header2 = true
      console.log("header2: "+this.header2);
      console.log("mobileLogo: "+this.mobileLogo);
    }
  }
  clickSideBar() {
    if(window.innerWidth>1000){
      console.log("greater then 1000 line 55"); 
      this.sidemenu = !this.sidemenu
      console.log("in header component: " + this.sidemenu);
      this.dataService.sidebarMenu(this.sidemenu);
    }
    else{
      console.log("lesser then 1000 line 61"); 
      this.sidemenu2=!this.sidemenu2
      this.mobileLogo=!this.mobileLogo
      console.log("in header component: " + this.sidemenu2);
      this.dataService.sidebarMenu2(this.sidemenu2)
      this.profileImg=!this.profileImg
      this.fxLayoutAlign = this.profileImg ? 'space-between center' : 'space-evenly center';
    }
  }  
}
