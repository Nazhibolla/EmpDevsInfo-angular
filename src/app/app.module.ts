import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { MaterialModule } from "./material/material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { EmployeesComponent } from "./employees/employees.component";
import { EmployeeComponent } from "./employees/employee/employee.component";

import { EmployeeService } from "./service/employee.service";
import { EmployeeListComponent } from "./employees/employee-list/employee-list.component";

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    EmployeeComponent,
    EmployeeListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  entryComponents: [EmployeeComponent],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule {}
