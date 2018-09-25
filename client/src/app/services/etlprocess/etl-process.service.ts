import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { EndPoint } from '../../apiUrl';

@Injectable({
  providedIn: 'root'
})
export class EtlProcessService {

  constructor(private http: HttpClient) { }
  etls() {
    return this.http.get<any>(EndPoint.HOST_URL + 'etls').pipe(map(data => {
      return data;
       }
     ));
  }

  createEtl(etl) {
    return this.http.post(EndPoint.HOST_URL + 'etls' , etl).pipe(map( data => {
      return data;
    }
    ));
  }
  etlFileUpload(formdata, res) {
    return this.http.post(`${EndPoint.HOST_URL}etls/fileupload?id=${res.id}`, formdata).pipe(map(data => {
      return data;
    }));
  }
}
