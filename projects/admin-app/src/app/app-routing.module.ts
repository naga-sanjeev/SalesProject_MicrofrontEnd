import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { DashboardComponent } from './Components/layout/dashboard/dashboard.component';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { AddNewClientComponent } from './Components/features/add-new-client/add-new-client.component';
import { ProjectsComponent } from './Components/features/projects/projects.component';
import { MyActivitiesComponent } from './Components/features/my-activities/my-activities.component';
import { DropdownComponent } from './Shared/dropdown/dropdown.component';
import { BreadcrumbComponent } from './Components/layout/breadcrumb/breadcrumb.component';

const mfeAppUrl = "http://localhost:9300/remoteEntry.js"

const routes: Routes = [
  {path:'', redirectTo:'/login', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'dropdown', component:DropdownComponent},
  {path:'breadcrumb', component:BreadcrumbComponent},
  {
    path:'dashboard', component:DashboardComponent,
    children: [
        {path: 'projects', component: ProjectsComponent},
        {path: 'AddNewClient', component: AddNewClientComponent},
        {path: 'MyActivities', component: MyActivitiesComponent},
    ]
},
  {path:'features', loadChildren: ()=>{
    return loadRemoteModule({
      remoteEntry : mfeAppUrl,
      remoteName : "usersApp",
      exposedModule:"./FeaturesModule"
    }).then(m=>m.FeaturesModule).catch(err=>console.log(err,"myworld"))
  }},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
