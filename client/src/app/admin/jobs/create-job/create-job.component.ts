import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { JobsService } from '../../../services/jobs/jobs.service';
@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.scss']
})
export class CreateJobComponent implements OnInit {
  createJobForm: FormGroup;
  formData: FormData = new FormData();
  fileName: String ;
  fileDetails: any;
  jobId: any;
  constructor( private formBuilder: FormBuilder, private router: Router, private jobsService: JobsService, private route: ActivatedRoute) { 
    this.route.params.subscribe( params => {
      if (params) {
        this.jobId = params.id;
      }
    });
  }

  ngOnInit() {
    this.createJobForm = this.formBuilder.group({
      name: ['', Validators.required],
      arguments: '',
  });
  this.selectedJob(this.jobId);
  }
  selectedJob(id) {
    this.jobsService.getSelected(id).subscribe((res: any) => {
      this.createJobForm.patchValue({
        name: res.name,
      });
    });
  }
  navigateToListViewUrl() {
    this.router.navigate(['admin/jobs']);
  }
  uploadFile(fileInput: any) {
    if (event) {
      this.fileDetails = <File>fileInput.target.files[0];
      // this.formData.append('file', fileDetails);
      this.fileName = this.fileDetails.name;
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
    this.formData.append('file', this.fileDetails);
    this.jobsService.createJob(job).subscribe((res: any) => {
      console.log(res);
      const createdjob = res;
    this.router.navigate(['admin/jobs']);

      this.jobsService.jobFileUpload(this.formData, createdjob).subscribe((data: any) => {
        });
    }, (error: any) => {
      console.log(error);
    }

    );
  }
  updatejob() {
    const job = {
      'id': this.jobId,
      'name': this.createJobForm.get('name').value
    };
    this.jobsService.createJob(job).subscribe((res: any) => {
      console.log(res);
      const createdjob = res;
    this.router.navigate(['admin/jobs']);

      this.jobsService.jobFileUpload(this.formData, createdjob).subscribe((data: any) => {
        });
    }, (error: any) => {
      console.log(error);
    });
}
}
