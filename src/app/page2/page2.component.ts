import { Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {FormGroup,FormControl,Validators} from "@angular/forms";


@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css']
})
export class Page2Component implements OnInit{
  limit;
  myform;
  buttonvalue="SAVE";
  constructor(private httpobj:HttpClient,private routerobj:Router) {

   }
  ngOnInit() {
    if(localStorage.getItem("btnval")=="saved"){
      this.buttonvalue="SAVED";
    }

    
    this.myform=new FormGroup({
      
      url1:new FormControl("",{validators:[Validators.required,Validators.pattern("^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$")]}),
      url2:new FormControl("",{validators:[Validators.required,Validators.pattern("^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$")]}),
      url3:new FormControl("",{validators:[Validators.required,Validators.pattern("^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$")]}),
      url4:new FormControl("",{validators:[Validators.required,Validators.pattern("^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$")]}),
      url5:new FormControl("",{validators:[Validators.required,Validators.pattern("^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$")]}),
      url6:new FormControl("",{validators:[Validators.required,Validators.pattern("^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$")]}),
      url7:new FormControl("",{validators:[Validators.required,Validators.pattern("^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$")]}),
      url8:new FormControl("",{validators:[Validators.required,Validators.pattern("^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$")]}),
      url9:new FormControl("",{validators:[Validators.required,Validators.pattern("^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$")]}),
      url10:new FormControl("",{validators:[Validators.required,Validators.pattern("^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$")]}),
     
    });
    
    this.getuser();
    this.myform.valueChanges.subscribe(
      ()=>{this.buttonvalue="SAVE"; localStorage.setItem("btnval","save");}
    );
  }
  

  array:any[];
 getuser(){
    this.httpobj.get("http://localhost:3000/user").subscribe(
      (response)=>{
        this.array= response as any[];
        this.limit=this.array[0].limit;
      }
    );
 }

savedata(){
  let z=0; 
  for(let fc in this.myform.controls){
    if(this.myform.get(fc).value==""){this.myform.removeControl(fc);z++}
  }
  if(this.limit==5 && z<10){
  this.buttonvalue="SAVING";
  this.httpobj.post("http://localhost:3000/Basic-IPaddresses",this.myform.value).subscribe(
    ()=>{this.buttonvalue="SAVED"; localStorage.setItem("btnval","saved");}
  );
  }

  else if(this.limit==10  && z<10){
    this.buttonvalue="SAVING";
    this.httpobj.post("http://localhost:3000/Premium-IPaddresses",this.myform.value).subscribe(
      ()=>{this.buttonvalue="SAVED";localStorage.setItem("btnval","saved");}
    );
    }
  else  alert("Please give an input");

}



 addBox(){   
  let boxes=document.getElementsByClassName("box") as HTMLCollectionOf<HTMLElement>;
  for(let i=0;i<this.limit;i++){
    if(boxes[i].style.display=="none"){
      boxes[i].style.display="block";
      let curbox=boxes[i].children[1] as HTMLElement;
      curbox.style.visibility="visible";
      for(let j=0;j<i;j++){let xbox=boxes[j].children[1] as HTMLElement; xbox.style.visibility="hidden";}
      break;
    }
  }

 }

 removebox(num){
   let boxes=document.getElementsByClassName("box") as HTMLCollectionOf<HTMLElement>;
   let check=0;
   for(let j=0;j<this.limit;j++){
     if(boxes[j].style.display=="block")check++; 
   }
   if(check>1)boxes[num].style.display="none";
   boxes[num].children[0].textContent="";
   for(let i=(this.limit-1);i>=0;i--){
      if(boxes[i].style.display=="block"){
        let curbox=boxes[i].children[1] as HTMLElement;
        curbox.style.visibility="visible";
        break;
      }
   }
 }
  
logoutfn(){
 localStorage.setItem("btnval","save");
 this.routerobj.navigate(["/page1"]);
}

}


  
