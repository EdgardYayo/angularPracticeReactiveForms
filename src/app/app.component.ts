import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];

  ngOnInit(): void {
      this.signupForm = new FormGroup({
        'userData': new FormGroup({
          'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
          'email': new FormControl(
            null, 
            [Validators.required, Validators.email], 
            this.forbiddenEmail
          ),
        }),
        'gender': new FormControl('male'),
        'hobbies': new FormArray([])
      });

      // OBSERVABLE FOR CHANGES IN VALUES
      // this.signupForm.valueChanges.subscribe(
      //   (value) => {
      //     console.log(value);
      //   }
      // )

      // OBSERVABLE FOR CHANGES IN STATUS
      // this.signupForm.statusChanges.subscribe(
      //   (status) => {
      //     console.log(status);
      //   }
      // )

      // To Change All the Form
      this.signupForm.setValue({
        'userData': {
          'username': 'Edgard',
          'email': 'allan@edgard.com'
        },
        'gender': 'male',
        'hobbies': []
      })

      // To change one Value of the form
      this.signupForm.patchValue({
        'gender': 'female'
      })
  }

  onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset();
  }

  // To adding controls
  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  // To return those controls
  getControls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  // Custom Validator for Names
  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {
        'nameIsForbidden' : true
      }
    }
    return null;
  }

  // Custom Asynchronous Validator for Emails
  forbiddenEmail(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
          if(control.value === 'test@test.com') {
            resolve({
              'emailForbidden': true
            });
          } else {
            resolve(null);
          }
      }, 1500)
    })

    return promise;
  }

}
