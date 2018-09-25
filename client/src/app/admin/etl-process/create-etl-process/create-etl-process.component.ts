import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { EtlProcessService } from '../../../services/etlprocess/etl-process.service';

@Component({
  selector: 'app-create-etl-process',
  templateUrl: './create-etl-process.component.html',
  styleUrls: ['./create-etl-process.component.scss']
})
export class CreateEtlProcessComponent implements OnInit {
  createEtlProcessForm: FormGroup;
  formData: FormData = new FormData();
  fileName: String ;
  fileDetails: any;
  etlId: any;
  

  constructor(private formBuilder: FormBuilder, private router: Router, private etlProcessService: EtlProcessService) { }

  ngOnInit() {
    this.createEtlProcessForm = this.formBuilder.group({
      name: ['', Validators.required],
      starttime: '',
      description: ''
  });
  }
  navigateToListViewUrl() {
    this.router.navigate(['admin/etlprocess']);
  }
  uploadFile(fileInput: any) {
    if (event) {
      this.fileDetails = <File>fileInput.target.files[0];
      this.fileName = this.fileDetails.name;
   } else {
      delete this.formData;
      this.formData = new FormData();
    }
  }
  createetl() {
    this.formData.append('file', this.fileDetails);
    const etl = {
       'name': this.createEtlProcessForm.get('name').value,
       'description': this.createEtlProcessForm.get('description').value,
    'starttime': `${this.createEtlProcessForm.get('starttime').value.getTime()}`

    };
    console.log(etl);
    this.etlProcessService.createEtl(etl).subscribe((res: any) => {
      console.log(res);
      const createdetl = res;
    this.router.navigate(['admin/etlprocess']);

      this.etlProcessService.etlFileUpload(this.formData, createdetl).subscribe((data: any) => {
        });
    }, (error: any) => {
      console.log(error);
    }

    );
  }


}
