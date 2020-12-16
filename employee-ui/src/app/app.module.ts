import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { EmployeeRoot } from './employee/EmployeeRoot';
import { EmployeeForm } from './employee/EmployeeForm';
import { EmployeeList } from './employee/EmployeeList';


@NgModule({
  declarations: [
    AppComponent,
    EmployeeRoot,
    EmployeeForm,
    EmployeeList
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
