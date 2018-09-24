import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { EndPoint } from '../../apiUrl';
@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(private http: HttpClient) { }
  jobs() {
    return this.http.get<any>(EndPoint.HOST_URL + 'jobs').pipe(map(data => {
      return data;
       }
     ));
  }
  createJob(job) {
    return this.http.post(EndPoint.HOST_URL + 'jobs' , job).pipe(map( data => {
      return data;
    }
    ));
  }
  jobFileUpload(formdata, res) {
    return this.http.post(`${EndPoint.HOST_URL}jobs/fileupload?id=${res.id}`, formdata).pipe(map(data => {
      return data;
    }));
  }
  runJob(job) {
    return this.http.get(EndPoint.HOST_URL + 'run/' + job.id).pipe(map( data => {
      return data;
    }));
  }
}

