import { Component, OnInit, ViewChild } from "@angular/core";
import { EmployeeService } from "src/app/service/employee.service";
import { MatTableDataSource } from "@angular/material";
import { EmpList } from "../../models/EmpList";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { MatDialog } from "@angular/material/dialog";
import { EmployeeComponent } from "../employee/employee.component";

@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.css"]
})
export class EmployeeListComponent implements OnInit {
  dialogResult: any = "";

  constructor(private service: EmployeeService, public dialog: MatDialog) {}

  displayedColumns: string[] = ["name", "count", "totalCost", "actions"];
  empList: MatTableDataSource<EmpList[]>;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  refreshList() {
    this.service.getEmpList().subscribe(list => {
      this.empList = new MatTableDataSource(list);
      this.empList.paginator = this.paginator;
      this.empList.sort = this.sort;
    });
  }

  ngOnInit() {
    this.refreshList();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EmployeeComponent, {
      width: "900px",
      data: null
    });

    dialogRef.afterClosed().subscribe(res => {
      this.refreshList();
    });
  }

  openEmpDialog(row) {
    var reqData = {
      id: row.id[0]
    };
    this.service.getEmpDevices(reqData).subscribe(res => {
      const dialogRef = this.dialog.open(EmployeeComponent, {
        width: "900px",
        data: res
      });

      dialogRef.afterClosed().subscribe(res => {
        this.refreshList();
      });
    });
  }

  deleteEmployee(row) {
    if (window.confirm("Are you sure to delete employee" + row.name[0] + "?")) {
      var reqData = {
        id: row.id[0]
      };
      this.service.deleteEmployee(reqData).subscribe(res => {
        window.alert(res.response);
        this.refreshList();
      });
    }
  }
}
