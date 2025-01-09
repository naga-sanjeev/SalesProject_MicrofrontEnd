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
import { AuthGuardGuard } from './Components/guards/auth-guard.guard';
import { ExistingProjectInfoComponent } from './Components/features/existing-project-info/existing-project-info.component';
import { AddExistingProjectComponent } from './Components/manager-features/add-existing-project/add-existing-project.component';
import { MyTeamActivitiesComponent } from './Components/sales-lead-features/my-team-activities/my-team-activities.component';
import { EditExistingProjectComponent } from './Components/manager-features/edit-existing-project/edit-existing-project.component';

const mfeAppUrl = "http://localhost:9300/remoteEntry.js"

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dropdown', component: DropdownComponent },
  { path: 'breadcrumb', component: BreadcrumbComponent },
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
      {
        path: '',
        pathMatch: 'full', component: ProjectsComponent
      },
      { path: 'projects', component: ProjectsComponent },
      { path: 'AddNewClient', component: AddNewClientComponent },
      { path: 'MyActivities', component: MyActivitiesComponent },
      { path: 'project-info/:id', component: ExistingProjectInfoComponent },
      { path: 'add-existing-project', component: AddExistingProjectComponent },
      { path: 'my-team-activities', component: MyTeamActivitiesComponent },
      { path: 'edit-existing-project/:id', component: EditExistingProjectComponent }
    ],
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'features', loadChildren: () => {
      return loadRemoteModule({
        remoteEntry: mfeAppUrl,
        remoteName: "usersApp",
        exposedModule: "./FeaturesModule"
      }).then(m => m.FeaturesModule).catch(err => console.log(err, "myworld"))
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
