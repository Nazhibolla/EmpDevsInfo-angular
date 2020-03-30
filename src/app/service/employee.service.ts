import { Injectable } from "@angular/core";

import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Employee } from "../models/Employee";
import { Observable } from "rxjs";
import { Department } from "../models/Department";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable({
  providedIn: "root"
})
export class EmployeeService {
  mainUrl: string = "http://localhost:8081/empdevs";

  constructor(private http: HttpClient) {}

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    fullName: new FormControl("", Validators.required),
    email: new FormControl("", Validators.email),
    mobile: new FormControl("", [Validators.required, Validators.minLength(8)]),
    gender: new FormControl("1"),
    department: new FormControl(0)
  });

  initializeFormGroup() {
    this.form.setValue({
      id: null,
      fullName: "",
      email: "",
      mobile: "",
      gender: "1",
      department: 0
    });
  }

  setEmployee(emp: Employee) {
    this.form.setValue({
      id: emp.id[0],
      fullName: emp.fullName[0],
      email: emp.email[0],
      mobile: emp.mobile[0],
      gender: emp.gender[0] + "",
      department: emp.department[0] + ""
    });
  }

  getEmpList(): Observable<any[]> {
    return this.http.get<any>(this.mainUrl + "/getEmpList");
  }

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.mainUrl + "/getDeps");
  }

  insertEmployee(employee): Observable<any> {
    return this.http.post(this.mainUrl + "/addEmployee", employee);
  }

  getEmpDevices(emp: any): Observable<any> {
    return this.http.post(this.mainUrl + "/getEmpDevices", emp);
  }

  deleteEmployee(emp): Observable<any> {
    return this.http.post(this.mainUrl + "/deleteEmployee", emp);
  }
}
