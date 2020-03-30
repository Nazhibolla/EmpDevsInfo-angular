import { Component, OnInit, Inject, OnDestroy } from "@angular/core";
import { EmployeeService } from "../../service/employee.service";
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { Department } from "src/app/models/Department";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Device } from "src/app/models/Device";
@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.css"]
})
export class EmployeeComponent implements OnInit, OnDestroy {
  bottomForm: FormGroup;
  departments: Department[];

  constructor(
    private service: EmployeeService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.service.getDepartments().subscribe(deps => {
      this.departments = deps;
    });

    this.bottomForm = this.fb.group({
      devices: this.fb.array([])
    });

    if (this.data) {
      var employee = this.data.employee[0];
      var devices = this.data.devices[0];
      this.service.setEmployee(employee);
      this.setDevices(devices);
    }
  }

  ngOnDestroy() {
    this.service.initializeFormGroup();
  }

  setDevices(devices: Device[]) {
    for (var i = 0; i < devices.length; i++) {
      const device = this.fb.group(devices[i]);
      this.deviceForms.push(device);
    }
  }

  get deviceForms() {
    return this.bottomForm.get("devices") as FormArray;
  }

  addDevice() {
    const device = this.fb.group({
      id: [],
      category: "",
      device_name: "",
      cost: []
    });

    this.deviceForms.push(device);
  }

  closeDlg() {
    this.dialogRef.close();
    // this.service.initializeFormGroup();
  }

  deleteDevice(i) {
    if (window.confirm("Do you really want to delete this device?")) {
      var dev = this.deviceForms.at(i);
      console.log(dev.value.id);
      this.deviceForms.removeAt(i);
    }
  }

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onSubmit() {
    if (this.service.form.valid) {
      var emp = this.service.form.value;
      var devs = this.deviceForms.value;
      var data = {
        employee: emp,
        devices: devs
      };
    }
    if (
      window.confirm(
        emp.id > 0
          ? "Do you really want to change the information of the employee " +
              emp.fullName +
              "?"
          : "Do you want to add an employee with name " + emp.fullName + "?"
      )
    ) {
      this.service.insertEmployee(data).subscribe(res => {
        this.closeDlg();
        window.alert(res.response);
      });
    }
  }
}
