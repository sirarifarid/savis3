import { Component, OnInit } from '@angular/core';
import{FormBuilder, FormGroup, Validators} from '@angular/forms';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm =this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]

    })
  }
  onSubmit(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value)
    }else{

      this.validateAllFormFields(this.loginForm);
      alert("Your form is invalid")
    }
  }
  private validateAllFormFields(formGroup:FormGroup){
    Object.keys(formGroup.controls).forEach(field=>{
      const control = formGroup.get(field);
      if(control instanceof FormControl) {
        control?.markAsDirty({onlySelf:true})
      }else if(control instanceof FormGroup){
        this.validateAllFormFields(control)
      }
    })
  }

}
