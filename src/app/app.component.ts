import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { customValidator } from './validators/noSpace.validator';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, CommonModule,],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  title = 'template-driven-form';
  formStatus: string = '';
  formdata: any = {};

  reactiveForm: FormGroup;

  ngOnInit(){
    this.reactiveForm = new FormGroup({
      firstname: new FormControl(null, [Validators.required, customValidator.noSpaceAllowed]),
      lastname: new FormControl(null, [Validators.required, customValidator.noSpaceAllowed]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      username: new FormControl(null, Validators.required, customValidator.checkUserName),
      dob: new FormControl(null),
      gender: new FormControl('male'),
      address: new FormGroup({
        street: new FormControl(null, Validators.required),
        country: new FormControl('India', Validators.required),
        city: new FormControl(null),
        region: new FormControl(null),
        postal: new FormControl(null, Validators.required)
      }),
      skills: new FormArray([
        new FormControl(null, Validators.required)
      ]),
      experience: new FormArray([
        
      ]),

    })
    // this.reactiveForm.valueChanges.subscribe((value) => {
    //   console.log(value);
    // })

    this.reactiveForm.statusChanges.subscribe((status) => {
      // console.log(status)
      this.formStatus = status;
    });

  }

  onFormSubmitted(){
    console.log(this.reactiveForm.value);
    this.formdata = this.reactiveForm.value;
    this.reactiveForm.reset({
      firstname: null,
      lastname: null,
      email: null,
      username: null,
      dob: null,
      gender: 'male',
      address:{
        street: null,
        country: 'India',
        city: null,
        region: null,
        postal: null
      },
      skills: [
        null
      ],
      experience: [
        
      ]
    });
  }

  addSkill(){
    (<FormArray>this.reactiveForm.get('skills'))
      .push(new FormControl(null, Validators.required));
  }

  deleteSkill(index: number){
    const controls = <FormArray>this.reactiveForm.get('skills');
    controls.removeAt(index);
  }

  addExp(){
    const frmgroup = new FormGroup({
      company: new FormControl(null),
      position: new FormControl(null),
      totalExp: new FormControl(null),
      start: new FormControl(null),
      end: new FormControl(null),
    });

    (<FormArray>this.reactiveForm.get('experience')).push(frmgroup);
  }

  deleteExp(index: number){
    const frmArray = <FormArray>this.reactiveForm.get('experience');
    frmArray.removeAt(index);
  }

  generateUsername(){
    let username = '';
    const fName: string= this.reactiveForm.get('firstname').value;
    const lName: string= this.reactiveForm.get('lastname').value;
    const dob: string= this.reactiveForm.get('dob').value;

    if(fName.length >= 3){
      username += fName.slice(0, 3);
    }
    else {
      username += fName;
    }

    if(lName.length >= 3){
      username += lName.slice(0, 3);
    }
    else {
      username += lName;
    }

    let datetime = new Date(dob);
    username += datetime.getDate();

    username = username.toLowerCase();


    this.reactiveForm.patchValue({
      username: username,
      address: {
        city: 'New Delhi'
      }
    })
}
} 
