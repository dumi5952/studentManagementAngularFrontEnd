import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserRegistrationService } from '../user-registration.service';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { dialogData,  } from '../registration/registration.component';



@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.scss']
})

export class UpdateDialogComponent implements OnInit {
  student:any;




  constructor(private service:UserRegistrationService, private http:HttpClient,  public dialogRef: MatDialogRef<UpdateDialogComponent>,public snackBar:MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: dialogData) {
      console.log(data.sid);
    }


  ngOnInit() {
    this.service.searchById(this.data.sid).subscribe(res=>{
this.student=res;
this.updateForm.controls['sid'].setValue(this.student.sid);
this.updateForm.controls['fName'].setValue(this.student.fName);
this.updateForm.controls['lName'].setValue(this.student.lName);
this.updateForm.controls['address'].setValue(this.student.address);
this.updateForm.controls['po1'].setValue(this.student.no[0].phone);
this.updateForm.controls['po2'].setValue(this.student.no[1].phone);
this.updateForm.controls['po3'].setValue(this.student.no[2].phone);
    })
  }



  updateForm = new FormGroup({
     sid:new FormControl({value: '', disabled: true}),
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
  onUpdate(){


    console.log(this.updateForm.value)
    this.stu.sid = this.updateForm.get('sid').value
    this.stu.fName=this.updateForm.get('fName').value
    this.stu.lName=this.updateForm.get('lName').value
    this.stu.address=this.updateForm.get('address').value

    this.stu1.phone=this.updateForm.get('po1').value
    this.stu.no.push(this.stu1)
    this.stu2.phone=this.updateForm.get('po2').value
    this.stu.no.push(this.stu2)
    this.stu3.phone=this.updateForm.get('po3').value
    this.stu.no.push(this.stu3)



  //  console.log(this.stu)
  // this.service.doRegistration(this.stu).subscribe(responce=>{
    this.service.updateDetails(this.stu).subscribe(responce=>{
      console.log(responce);
      this.snackBar.open('Successfuly updated','Ok',{
        duration:5000,
        verticalPosition:'top'
      });

      this.dialogRef.close();

    });
}


}
