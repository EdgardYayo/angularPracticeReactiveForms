import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.css']
})
export class TestFormComponent implements OnInit {

  projectStatus = ['Stable', 'Critical', 'Finished'];

  form: FormGroup

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'projectName': new FormControl(
        null, 
        [
          Validators.required, 
          // this.forbiddenName.bind(this)
        ],
        this.asyncForbiddenName
      ),
      'email': new FormControl(
        null, 
        [Validators.required, Validators.email]
      ),
      'projectStatus': new FormControl('Stable')
    })
  }

  onSubmit() {
    console.log(this.form);
    this.form.reset();
  }

  forbiddenName(control: FormControl) : { [key: string] :boolean } {
    if(control.value === 'Test') {
      return {
        'forbiddenName': true
      }
    }
    return null;
  }

  asyncForbiddenName(control: FormControl) : Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if(control.value === 'Jumanji') {
          resolve({
            'forbiddenName': true
          })
        } else {
          resolve(null);
        }
      }, 1000)
    })
    return promise;
  }

}
