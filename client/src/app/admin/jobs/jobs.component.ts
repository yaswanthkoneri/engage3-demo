import { Component, OnInit, ViewChild} from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { JobsService } from '../../services/jobs/jobs.service';
import { Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { DeleteConfirmationComponent } from '../../common/delete-confirmation/delete-confirmation.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { element } from 'protractor';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  jobs: any = [];
  loading: boolean;
  pagination = false;
  run = true;
  constructor(private jobsService: JobsService, private router: Router, private toastr: ToastrService,
    private spinner: NgxSpinnerService, public dialog: MatDialog) { }
  dataSource;
  ELEMENT_DATA = [];
  displayedColumns: string[] = ['id', 'name', 'no_of_error_records', 'no_of_input_records', 'no_of_output_records', 'status', 'action'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.getJobs();
  }
  getJobs() {
    this.jobsService.jobs().pipe().subscribe(data => {
      if (data.length > 5) {
        this.pagination = true;
      }
      this.loading = false;
      this.ELEMENT_DATA = data;
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  createJob() {
    this.router.navigate(['admin/jobs/createjob']);
  }
  runjob(job) {
    const date = new Date().toLocaleString();
    console.log(date);
    const status = {
      'status': 'IN PROGRESS',
      'starttime': `${date}`
    };
    this.spinner.show();
    this.jobsService.statusOfJob(job, status).subscribe(data => {
      this.getJobs();
    });
    this.jobsService.runJob(job).subscribe(data => {
      this.spinner.hide();
      setTimeout (() => {
        this.getJobs();
     }, 4000);
     this.run = false;
  }, (error: any) => {
      this.spinner.hide();
    }
    );
  }
  editjob(job) {
    this.router.navigate(['admin/jobs', job.id]);
  }
  deletejob(job) {
    const dialogRef = this.dialog.open( DeleteConfirmationComponent , {
      width: '300px',
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
        this.jobsService.deleteJob(job).subscribe((data => {
          this.toastr.success('deleted succesfully');
          console.log(data);
          this.getJobs();
        }));
      }
      });
  }

}
