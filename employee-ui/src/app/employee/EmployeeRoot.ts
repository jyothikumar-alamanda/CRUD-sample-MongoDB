import { Component, OnInit } from '@angular/core';

import { Employee } from '../shared/employee.model';
import { EmployeeService } from '../shared/employee.service';

declare var M: any;

@Component({
  selector: 'app-employee',
  templateUrl: './EmployeeRoot.html',
  styleUrls: ['./EmployeeForm.css']
})

export class EmployeeRoot implements OnInit {
  
  selectedEmployee: Employee;
  employees: Employee[];

  constructor(private _employeeService: EmployeeService) { 
    
  }
  
  ngOnInit() {
  }

  refreshEmployeeList() {
    this._employeeService.getEmployeeList().subscribe((res) => {
      this.employees = res as Employee[];
    });
  } 

  _onSubmit(employees: Employee[]) {
    console.log("_onSubmit at Root - "+JSON.stringify(employees));
    this.employees = employees;
  }

  onEdit(emp: Employee) {
    console.log("onEdit at Root", emp);
    this.selectedEmployee = emp;
    this.refreshEmployeeList();
  } 

  onDelete(_id: string) {
    console.log("onDelete at Root");
    console.log("onDelete at form - id - "+_id);
    this._employeeService.deleteEmployee(_id).subscribe((res) => {
        this.refreshEmployeeList();
        //this.resetForm();
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
    });
  }
  
}
