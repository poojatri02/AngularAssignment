import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormGroup,FormControl,Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component implements OnInit {

  myform;
  alertval=false;
  constructor(private httpobj:HttpClient, private routerobj:Router) { }

  ngOnInit() {

    this.myform=new FormGroup({
      limit:new FormControl("",Validators.required)
    });
  }

  loginfn(){
    if(this.myform.invalid){
        this.alertval=true;
    }
    else{
      this.alertval=false;
      this.httpobj.patch("http://localhost:3000/user/1",this.myform.value).subscribe(
        (response)=>{
         this.routerobj.navigate(["/page2"]);
        }
      );
    }

  }

}
