import { Component, HostListener, OnInit } from '@angular/core';
import { DataService } from '../../../Services/data.service';
import { menuItemsQuery } from '../../../Services/query';
import { DetailsService } from '../../../Services/details.service';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  loginData!: any;
  data: any = []
  link: any;
  icon: any;
  active: any;
  menu2: any
  visibleSidebar1: any;
  sidebar: boolean = true
  profileMode = 'popup';
  model = []
  ripple: boolean = false;
  menuItems: any = [];
  activeLink: any;
  screenWidth: any;
  screenHeight: any;
  sidenav1: boolean = true
  sidenav2: boolean = false
  newLabels: any
  menuItemsData: any = []
  mobileLinkSelected = false
  mobileView: boolean = false
  role: any
  constructor(private details: DetailsService, private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.sideLinkResponse.subscribe((message: any) => {
      this.active = message
      this.setActive(this.active)
    })
    this.loginData = localStorage.getItem('Login');
    const storedData = JSON.parse(this.loginData)
    this.role = storedData?.userLogin.role;
    this.menuData(this.role)
    this.newLabels?.forEach((item: any) => {
    })
    this.onResize(event)
  }

  setActive(link: any): void {
    this.activeLink = link;
  }

  menuData(e: any) {
    let valueWithUpperCaseM = e?.replace('m', 'M');
    let finalRole = valueWithUpperCaseM?.replace('sl', 's L')
    this.details.getmenuData(menuItemsQuery).subscribe((res: any) => {
      this.data = res.data.getMenu
      this.data.filter((ele: any) => {
        if (ele.role == finalRole) {
          let sideItemsData = ele.screens.replace(/[\[\]']/g, '').trim().split(', ');
          sideItemsData.forEach((v: any) => {
            switch (v) {
              case "Projects":
                this.link = 'projects'
                this.icon = 'pi pi-book'
                break;
              case "Add New Client":
                this.link = 'AddNewClient'
                this.icon = 'pi pi-user'
                break;
              case "Add Existing Project":
                this.link = 'add-existing-project'
                this.icon = 'pi pi-user'
                break;
              case "My Team Activities":
                this.link = 'my-team-activities'
                this.icon = 'pi pi-user'
                break;
              case "My Activities":
                this.link = 'MyActivities'
                this.icon = 'pi pi-file-edit'
                break;
              default:
            }
            this.menuItemsData.push({ label: v, icon: this.icon, link: this.link })
          })
        }
      })
    })
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    if (window.innerWidth > 1000) {
      this.sidenav2 = false
      this.sidenav1 = true
    }
    else {
      this.sidenav1 = false
      this.sidenav2 = true
    }
  }
  onClickSideNav($event: any) {
    this.visibleSidebar1 != this.visibleSidebar1;
  }
  isActive(link: string): boolean {
    return this.activeLink === link;
  }

  linkSelected() {
    if (window.innerWidth < 1000) {
      this.mobileLinkSelected = !this.mobileLinkSelected
      this.dataService.mobileSideMenu(this.mobileLinkSelected)
    }
  }

}
