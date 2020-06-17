import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormArray } from '@angular/forms';

import { student } from '../student';
import { UserRegistrationService } from '../user-registration.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MatDialog,MatDialogConfig, MatSnackBar } from '@angular/material';
import { UpdateDialogComponent } from "../update-dialog/update-dialog.component";



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

export class RegistrationComponent implements OnInit {
  URL ="http://localhost:8080";
  displayedColumns: string[] = ['sid', 'fName','lName', 'Address', 'no', 'Action'];
  dataSource:MatTableDataSource<student>;

studentForm= new FormGroup({
  fName: new FormControl('',Validators.required),
  lName: new FormControl('',Validators.required),
  address: new FormControl('',Validators.required),
  po1: new FormControl('',Validators.required),
  po2: new FormControl('',Validators.required),
  po3: new FormControl('',Validators.required)

})

stu = {
  fName:'',
  lName:'',
  address:'',
  no:[]
}

stu1={
  phone:0
}
stu2={
  phone:0
}
stu3={
  phone:0
}


onSubmit(){


  this.stu = {
    fName:'',
    lName:'',
    address:'',
    no:[]
  }
  this.stu1={
    phone:0
  }
  this.stu2={
    phone:0
  }
  this.stu3={
    phone:0
  }

  console.log(this.studentForm.value)
  this.stu.fName=this.studentForm.get('fName').value
  this.stu.lName=this.studentForm.get('lName').value
  this.stu.address=this.studentForm.get('address').value

  this.stu1.phone=this.studentForm.get('po1').value
  this.stu.no.push(this.stu1)
  this.stu2.phone=this.studentForm.get('po2').value
  this.stu.no.push(this.stu2)
  this.stu3.phone=this.studentForm.get('po3').value
  this.stu.no.push(this.stu3)



//  console.log(this.stu)
// this.service.doRegistration(this.stu).subscribe(responce=>{
  this.http.post(this.URL+"/saveStu",this.stu).subscribe(responce=>{
    console.log(responce);
    this.loadingData();
    this.snackBar.open('Successfuly inserted','Ok',{
      duration:5000,
      verticalPosition:'top'
    });
    this.studentForm.reset();

  });

}

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



  constructor(private service:UserRegistrationService,private http:HttpClient,public dialog:MatDialog,
    public snackBar:MatSnackBar){}
  student:any;

  loadingData(){
    this.service.getDetails().subscribe(res =>{
      var jsonData = JSON.stringify(res);
      var jsonArray= JSON.parse(jsonData);
      this.student = res;
      this.dataSource= new MatTableDataSource(jsonArray);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;


    });
  }
  ngOnInit() {
    this.loadingData();

  }


  openUpdateDialog(sid:number){
    const dialogConfig = new MatDialogConfig;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width ="30%";
    dialogConfig.height="85%";
    this.dialog.open(UpdateDialogComponent,dialogConfig);
    
    this.service.searchById(sid).subscribe(res=>{
      console.log(res);
    });

  }

  onDelete(sid:number){
if(confirm('Are you sure want to deleat this recode from your system?')){
  this.service.deleteStudent(sid).subscribe(res=>{
    this.loadingData();
    this.snackBar.open('Successfuly Deleted','Ok',{
      duration:5000,
      verticalPosition:'top'
    });
  })
}
  }




}


