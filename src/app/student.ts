import { FormArray } from "@angular/forms";
export interface student{

  sid:number;
  fName:String;
  lName:String;
  Address:String;
  no:[
    {
      phone:number
    }
  ];


}

