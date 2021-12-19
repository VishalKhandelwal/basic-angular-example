import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  private baseUrl = 'http://localhost:8080/api';  

  constructor(private http:HttpClient) { }

  createEmployee(data:any){
    return this.http.post(`${this.baseUrl}/employees`, data);  
  }

  getEmployeeList(){
    return this.http.get(`${this.baseUrl}/employees`,{observe: 'response'});
  }

  getEmployeeByName(name:any){
    return this.http.get(`${this.baseUrl}/employees/`+name);
  }
}
