import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { JobsComponent } from './jobs/jobs.component';
import { HistoryComponent } from './history/history.component';
import { CreateJobComponent } from './jobs/create-job/create-job.component';

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
        {
            path: 'dashboard', component: DashboardComponent,
        },
        {
          path: 'jobs', component: JobsComponent,
        },
        {
          path: 'jobs/createjob', component: CreateJobComponent
        },
        {
          path: 'jobs/:id', component: CreateJobComponent, pathMatch: 'full'
        },
        {
          path: 'history', component: HistoryComponent
        }
    ]}
  // {
  //   path: 'dashboard',
  //   component: DashboardComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
