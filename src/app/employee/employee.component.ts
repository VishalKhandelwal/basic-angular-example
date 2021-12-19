import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeServiceService } from '../employee-service.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  name:any;
  addEmployee: FormGroup;  
  employees: any;

  constructor(private formBuilder: FormBuilder,private employeeService: EmployeeServiceService) { }

  ngOnInit(): void {   
    this.getEmployees(); 
    this.createEmployeeForm();
  }

  createEmployeeForm(){    
    this.addEmployee = this.formBuilder.group({
      name: [''],
      email: [''],
      password: ['']  
    })
  }

  


  onSubmit(){
    console.log(this.addEmployee.value);
    const data = this.addEmployee.value;
     this.createEmployeeForm();
     this.employeeService.createEmployee(data).subscribe(
       (response:any) =>{
          console.log(response);
          console.log(response['data']);
          console.log(response['status']);
          if(response['status'] == '200'){
            alert("Employee Save Successfully");
            this.getEmployees();
          }
          
     },
     error =>{
       console.log(error);
     })
  }

  //response status check in response body
  getEmployees(){  
    this.employeeService.getEmployeeList().subscribe(
      (response:any) =>{
        console.log(response);
        console.log(response['status']);
        console.log(response.statusText);
        this.employees = response.body;
   })
          
  }

  getEmployeesByName(name:string){     
    console.log(name);
    this.employeeService.getEmployeeByName(name).subscribe(
      (response:any) =>{
        console.log(response);
        this.employees = response;
   })  
      // console.log();
      // this.employees = this.employeeService.getEmployeeList();    
  }
}
