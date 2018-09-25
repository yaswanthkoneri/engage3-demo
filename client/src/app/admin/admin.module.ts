import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { NavbarComponent } from '../common/navbar/navbar.component';
import { MaterialModule } from '../material/material.module';
import { JobsComponent } from './jobs/jobs.component';
import { HistoryComponent } from './history/history.component';
import { CreateJobComponent } from './jobs/create-job/create-job.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { DeleteConfirmationComponent } from '../common/delete-confirmation/delete-confirmation.component';
import { EtlProcessComponent } from './etl-process/etl-process.component';
import { CreateEtlProcessComponent } from './etl-process/create-etl-process/create-etl-process.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(
      { preventDuplicates: true}
    ),
    NgxSpinnerModule
  ],
  declarations: [
    AdminComponent,
    DashboardComponent,
    NavbarComponent,
    JobsComponent,
    HistoryComponent,
    CreateJobComponent,
    DeleteConfirmationComponent,
    EtlProcessComponent,
    CreateEtlProcessComponent],
    entryComponents: [DeleteConfirmationComponent],
  providers: [],
  bootstrap: [AdminComponent],
  exports: [AdminComponent]
})
export class AdminModule { }
