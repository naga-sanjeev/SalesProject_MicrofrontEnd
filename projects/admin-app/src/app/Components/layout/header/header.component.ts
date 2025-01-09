import { Component, EventEmitter, HostListener, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DataService } from '../../../Services/data.service';
import { MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnChanges {

  items!: MenuItem[];
  name: string = ''
  visibleSidebar1: any;
  sidebar: boolean = false
  sidemenu: boolean = true
  screenWidth: any;
  screenHeight: any;
  header1: boolean = true
  header2: boolean = false
  loginData: any
  sidemenu2: boolean = false
  mobileLogo: boolean = false
  profileImg: boolean = true
  fxLayoutAlign: any = 'space-between center'
  constructor(private dataService: DataService, private primengConfig: PrimeNGConfig, private messageService: MessageService, private router: Router) { }
  ngOnInit(): void {
    this.dataService.toastMessagesuccess.subscribe((message: any) => {
      if (message) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login Success' });
      }
    });
    this.loginData = localStorage.getItem('Login');
    const storedData = JSON.parse(this.loginData)
    this.name = storedData?.userLogin.name;

    this.onResize(event)
    this.dataService.currentMessage3.subscribe((message: any) => {
      this.clickSideBar()
    })
    this.items = [
      { label: 'Profile', icon: 'pi pi-user', },
      { label: 'Reset Password', icon: 'pi pi-refresh', },
      { label: 'Logout', icon: 'pi pi-arrow-circle-left', command: () => this.logout() }
    ];
    this.dataService.currentMessage2.subscribe((message: any) => {
      this.name = message.userLogin.name;
    });
  }
  ngOnChanges(): void {
    this.dataService.toastMessagesuccess.subscribe((message: any) => {
      if (message) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login Success' });
      }
    });
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    if (window.innerWidth > 1000) {
      this.header2 = false
      this.header1 = true
      this.mobileLogo = false
    }
    else {
      this.header1 = false
      this.header2 = true
      this.dataService.currentMobileResponsive.subscribe((message: any) => {
        this.fxLayoutAlign = this.profileImg ? 'space-between center' : 'space-evenly center';
      })
    }
  }
  clickSideBar() {
    if (window.innerWidth > 1000) {
      this.sidemenu = !this.sidemenu
      this.dataService.sidebarMenu(this.sidemenu);
    }
    else {
      this.sidemenu2 = !this.sidemenu2
      this.mobileLogo = !this.mobileLogo
      this.dataService.sidebarMenu2(this.sidemenu2)
      this.profileImg = !this.profileImg
      this.fxLayoutAlign = this.profileImg ? 'space-between center' : 'space-evenly center';
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
