import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { FormControl, FormGroup, Validator,FormArray } from "@angular/forms";
@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {

  constructor(private http:HttpClient) { }
  URL ="http://localhost:8080";


  public doRegistration(stu:any){
    return this.http.post(this.URL+"/saveStu",stu);
  }
  public getDetails(){
    return this.http.get(this.URL+"/getAll");
  }

  public deleteStudent(sid:number) {
     return this.http.delete(this.URL+"/deleteStudent/"+sid);
  }

  public searchById(sid:number){
    return this.http.get(this.URL+"/findStudent/"+sid);
  }

  public updateDetails(stu:any){
    return this.http.put(this.URL+"/updateStudent",stu);
  }

  
}
