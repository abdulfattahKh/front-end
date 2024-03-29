import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../Auth.service";
import { EventEmitter } from "events";
import { Router } from "@angular/router";

import * as $ from "jquery";
@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.css"]
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;

  signedIn: boolean;
  message: string;
  ClassStyle: string;

  mediumRegex = new RegExp(
    "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})"
  );
  constructor(private authService: AuthService, private router: Router) {
    this.init();
    //this.test();
  }

  loading: boolean;
  ngOnInit() {
    this.signInForm.patchValue({
      email: "abdulfattah.khudari@gmail.com",
      password: "abdulfattah0952432706"
    });
    this.authService.SignIn.subscribe(response => {
      if (response) {
        this.signedIn = true;
        this.ClassStyle = "success";
        this.message = "signed in correctly";
        this.router.navigate(["/"]);
        this.loading = false;
      } else {
        this.signedIn = false;
        this.ClassStyle = "warning";
        this.message = "either the email or the password is not correct";
        this.loading = false;
      }
    });

    /*this.authService.fillSignIn.subscribe(
      (user: { email: string; password: string }) => {
        console.log(user);
        this.signInForm.patchValue({
          email: user.email,
          password: user.password
        });
        console.log(this.signInForm.value);
      }
    );*/
  }
  onSubmit() {
    this.loading = true;
    this.authService.signIn(this.signInForm.value);
  }

  init() {
    this.signedIn = false;
    this.message = "";
    this.signInForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(this.mediumRegex)
      ])
    });
  }

  test() {}
}
