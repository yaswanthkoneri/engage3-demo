import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { JobsService } from '../../../services/jobs/jobs.service';
import { EtlProcessService } from '../../../services/etlprocess/etl-process.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.scss']
})
export class CreateJobComponent implements OnInit {
  createJobForm: FormGroup;
  formData: FormData = new FormData();
  fileName: String ;
  etllist = [];
  jobId: number;
  constructor( private formBuilder: FormBuilder, private router: Router, private jobsService: JobsService, private route: ActivatedRoute,
    private etlProcessService: EtlProcessService, private toastr: ToastrService) {
    this.route.params.subscribe( params => {
      if (params) {
        this.jobId = params.id;
      }
    });
  }

  ngOnInit() {
    this.createJobForm = this.formBuilder.group({
      name: ['', Validators.required],
      etl_name: '',
  });
  if (this.jobId) {
  this.selectedJob(this.jobId);

  }
  this.getEtllist();
  }
  getEtllist() {
    this.etlProcessService.etls().pipe().subscribe(data => {
      console.log(data);
      this.etllist = data;
    });
  }
  selectedJob(id) {
    this.jobsService.getSelected(id).subscribe((res: any) => {
      this.createJobForm.patchValue({
        name: res.name,
        etl_name: res.etl_name
      });
    });
  }
  navigateToListViewUrl() {
    this.router.navigate(['admin/jobs']);
  }
  uploadFile(fileInput: any) {
    if (event) {
      const fileDetails = <File>fileInput.target.files[0];
      this.formData.append('file', fileDetails);
      this.fileName = fileDetails.name;
     // for (let i = 0; i < fileDetails.length; i++) {
      //   this.formData.append('files', fileDetails[i]);
      //   this.fileName = fileDetails[i].name;
      // }
    } else {
      delete this.formData;
      this.formData = new FormData();
    }
  }
  createjob() {
    const job = this.createJobForm.value;
    console.log(job);
    if (this.fileName) {
    this.jobsService.createJob(job).subscribe((res: any) => {
      console.log(res);
      const createdjob = res;
    this.router.navigate(['admin/jobs']);
    this.jobsService.jobFileUpload(this.formData, createdjob).subscribe((data: any) => {
        });
      }, (error: any) => {
      console.log(error);
    });
  } else {
    this.toastr.warning('Please upload source file to create job');
  }
  }
  updatejob() {
    const job = {
      'id': +this.jobId,
      'name': this.createJobForm.get('name').value,
      'etl_name': this.createJobForm.get('etl_name').value
    };
    if (this.fileName) {
    this.jobsService.updateJob(job).subscribe((res: any) => {
      console.log(res);
      const createdjob = res;
    this.router.navigate(['admin/jobs']);
    this.jobsService.jobFileUploadupdate(this.formData, createdjob).subscribe((data: any) => {
      });
    }, (error: any) => {
      console.log(error);
    });
  } else {
    this.toastr.warning('Please upload source file to update job');
  }
}
}
