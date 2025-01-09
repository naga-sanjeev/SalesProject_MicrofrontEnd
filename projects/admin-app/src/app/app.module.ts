import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { DashboardComponent } from './Components/layout/dashboard/dashboard.component';
import { TableComponent } from './Shared/table/table.component';
import { ButtonComponent } from './Shared/button/button.component';
import { InputComponent } from './Shared/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from './Components/layout/header/header.component';
import { FooterComponent } from './Components/layout/footer/footer.component';
import { SidenavComponent } from './Components/layout/sidenav/sidenav.component';

import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenubarModule } from 'primeng/menubar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SidebarModule } from 'primeng/sidebar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProjectsComponent } from './Components/features/projects/projects.component';
import { AddNewClientComponent } from './Components/features/add-new-client/add-new-client.component';
import { MyActivitiesComponent } from './Components/features/my-activities/my-activities.component';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownComponent } from './Shared/dropdown/dropdown.component';
import { BreadcrumbComponent } from './Components/layout/breadcrumb/breadcrumb.component';
import {DialogModule} from 'primeng/dialog';
import { DialogComponent } from './Shared/dialog/dialog.component';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import {CalendarModule} from 'primeng/calendar';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    TableComponent,
    ButtonComponent,
    InputComponent,
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
    ProjectsComponent,
    AddNewClientComponent,
    MyActivitiesComponent,
    DropdownComponent,
    BreadcrumbComponent,
    DialogComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    SidebarModule,
    MenuModule,
    PanelMenuModule,
    MenubarModule,
    OverlayPanelModule,
    BrowserModule,
    BrowserAnimationsModule,
    TableModule,
    DropdownModule,
    InputTextareaModule,
    InputSwitchModule,
    InputMaskModule,
    InputNumberModule,
    BreadcrumbModule,
    DialogModule,
    DynamicDialogModule,
    FlexLayoutModule,
    CalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
