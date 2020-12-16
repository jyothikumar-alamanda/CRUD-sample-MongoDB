import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges} from '@angular/core';
import { NgForm } from '@angular/forms';

import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';

declare var M: any;

@Component({
  selector: 'employee-form',
  templateUrl: './EmployeeForm.html',
  styleUrls: ['./EmployeeForm.css']
})

export class EmployeeForm  implements OnInit, OnChanges {

  @Input() selectedEmployee: Employee;

  constructor(private _employeeService: EmployeeService) { }
  

  ngOnInit() {
    this.resetForm();
  }

   ngOnChanges(sc: SimpleChanges): void {
    if (!sc) return;
    console.log(sc);
    const empChange = sc["selectedEmployee"];

    if (!empChange) return;
    if (empChange.currentValue == empChange.previousValue) return;
  } 
  
  @Output() submit: EventEmitter<any> = new EventEmitter();

  resetForm(form?:NgForm) { 
    if(form) 
        form.reset(); 
    this.selectedEmployee = {
        _id: "",
        name: "",
        position: "",
        office: "",
        salary: null
    }
  }
  
  onSubmit(form: NgForm) {
    if (form.value._id == "" || form.value._id == null) {
      this._employeeService.postEmployee(form.value).subscribe((res) => {
        this.resetForm(form);
        this._employeeService.getEmployeeList().subscribe((res) => {
            this.submit.next(res as Employee[]);
        });
        M.toast({ html: "Saved successfully.", classes: "rounded" });
      });
    }
    else {
      this._employeeService.putEmployee(form.value).subscribe((res) => {
        this.resetForm(form);
        this._employeeService.getEmployeeList().subscribe((res) => {
            this.submit.next(res as Employee[]);
        });
        M.toast({ html: "Updated successfully.", classes: "rounded" });
      });
    }
  }
}
