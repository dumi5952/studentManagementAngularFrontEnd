import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserRegistrationService } from '../user-registration.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.scss']
})
export class UpdateDialogComponent implements OnInit {

  constructor(private service:UserRegistrationService, private http:HttpClient) { }

  ngOnInit() {
  }
  updateForm = new FormGroup({
     sid:new FormControl(''),
     fName: new FormControl('',Validators.required),
     lName: new FormControl('',Validators.required),
     address: new FormControl('',Validators.required),
     po1: new FormControl('',Validators.required),
     po2: new FormControl('',Validators.required),
     po3: new FormControl('',Validators.required)
    // this.update.onSearchByID(sid)
  })

  stu = {
    sid:0,
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

}
