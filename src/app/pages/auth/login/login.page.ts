import { AuthenticationService } from "./../../../services/core/authentication.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import { LoadingController } from "@ionic/angular";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  params: Params;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = "";
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    public loadingController: LoadingController
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(["/app/home"]);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ["admin@admin.com", Validators.required],
      password: ["password", Validators.required],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl =
      this.route.snapshot.queryParams["returnUrl"] || "/app/home";

    this.params = this.route.snapshot.params;
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  async onSubmit() {
    const loading = await this.loadingController.create({
      message: "Please wait...",
      // duration: 2000,
    });

    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    await loading.present();

    this.authenticationService
      .login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        (data) => {},
        (error) => {
          this.error = error;
          this.loading = false;
        },
        () => {
          this.router.navigate([this.returnUrl]);
        }
      );

    await loading.dismiss();
  }
}
