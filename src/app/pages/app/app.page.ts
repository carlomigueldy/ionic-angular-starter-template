import { User } from "./../../models/user";
import { Router } from "@angular/router";
import { AuthenticationService } from "@app/services/core/authentication.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-app",
  templateUrl: "./app.page.html",
  styleUrls: ["./app.page.scss"],
})
export class AppPage implements OnInit {
  currentUser: User;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
  }

  ngOnInit() {
    console.log('[App Page] ngOnInit', this.currentUser)
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/auth/login"]);
  }
}
