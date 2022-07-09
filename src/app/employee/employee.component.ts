import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../model/employee';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employee!: Employee;
  formGroup!: FormGroup;

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      const empId = this.route.snapshot.paramMap.get("id");
      this.loadEmployee(empId);
    });

    this.formGroup = this.formBuilder.group({
      employee: this.formBuilder.group({
        empId: ['', Validators.required],
        name: ['', Validators.required]
      })
    });
  }

  loadEmployee(param: string | null) : void {
    if(!param || param=='new') {
      this.employee = {};
    } else {
      const empId = +param;
      this.employeeService.loadEmployee(empId).subscribe(emp=>{
        this.employee = emp;
      });
    }
  }

  saveEmployee() : void {
    console.log(this.formGroup);
  }

}