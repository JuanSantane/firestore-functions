import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, OnDestroy {

  signinForm: FormGroup = new FormGroup({
    'userData': new FormGroup({
      'email': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required])
    })
  });
  logged = false;
  submited = false;
  messageToUser = '';
  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {

  }
  ngOnDestroy(): void {

  }

  onSubmit() {
    const userData =  this.signinForm.getRawValue().userData;
    const user = {
      email: userData.email,
      password: userData.password
    };
  }

}
