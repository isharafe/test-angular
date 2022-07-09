import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { Employee } from '../model/employee';
import { HttpMethods, HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employeeUriPrefix = "employees";

  constructor(
    private httpService: HttpService,
    ) { }

    loadEmployee(empId: number) : Observable<Employee> {
      const url = `${this.employeeUriPrefix}/${empId}`;
      return this.httpService.callServer(url, HttpMethods.GET);
    }

    loadEmployees() : Observable<Employee[]> {
      const url = `${this.employeeUriPrefix}`;
      return new Observable((observable: Observer<Employee[]>)=>{
        observable.next([{eid: 1, name: "abcd"}]);
      });
      // return this.httpService.callServer(url, HttpMethods.GET);
    }
}