import { Component, OnInit, Output, EventEmitter, Input , OnChanges, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Employee } from '../shared/employee.model';
import { EmployeeService } from '../shared/employee.service';

declare var M: any;

@Component({
    selector: 'employee-list',
    templateUrl: './EmployeeList.html',
    styleUrls: ['./EmployeeForm.css']
})

export class EmployeeList  implements OnInit , OnChanges  {

  @Input() employees: Employee[];

  constructor(private _employeeService: EmployeeService) { }

  ngOnInit() {
    this.refreshEmployeeList();
  }

   ngOnChanges(sc: SimpleChanges): void {
    if (!sc) return;
    console.log(sc);
    const empChange = sc["employees"];
    if (!empChange) return;
    if (empChange.currentValue == empChange.previousValue) return;
  } 

  refreshEmployeeList() {
    this._employeeService.getEmployeeList().subscribe((res) => {
      this.employees = res as Employee[];
    });
  } 
  @Output() edit: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();
  
  onEdit(emp: Employee) {
    console.log("onEdit at list - emp - "+JSON.stringify(emp));
    this.edit.next(emp);
  } 

   onDelete(_id: string, form: NgForm) {
    console.log("onDelete at list - id - "+_id);
    if (confirm('Are you sure to delete this record ?') == true) {
      this.delete.next(_id);
    }
  } 
}
