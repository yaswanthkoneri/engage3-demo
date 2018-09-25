import { Component, OnInit, ViewChild } from '@angular/core';
import { Router} from '@angular/router';
import { EtlProcessService } from '../../services/etlprocess/etl-process.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
@Component({
  selector: 'app-etl-process',
  templateUrl: './etl-process.component.html',
  styleUrls: ['./etl-process.component.scss']
})
export class EtlProcessComponent implements OnInit {

  constructor(private router: Router, private etlProcessService: EtlProcessService) { }
  dataSource;
  ELEMENT_DATA = [];
  displayedColumns: string[] = ['id', 'name', 'description'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.getEtls();
  }
  getEtls() {
    this.etlProcessService.etls().pipe().subscribe(data => {
      console.log(data);
      this.ELEMENT_DATA = data;
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  createetlprocess() {
    this.router.navigate(['admin/etlprocess/createEtlprocess']);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
