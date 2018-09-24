import { Component, OnInit, ViewChild} from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { JobsService } from '../../services/jobs/jobs.service';
import { Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
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
  constructor(private jobsService: JobsService, private router: Router, private toastr: ToastrService,
    private spinner: NgxSpinnerService) { }
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
      if (data.lenght > 10) {
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
  runjob(element) {
    this.spinner.show();
    this.jobsService.runJob(element).subscribe(data => {
      this.spinner.hide();
    }, (error: any) => {
      this.spinner.hide();
    }
    );
  }

}
