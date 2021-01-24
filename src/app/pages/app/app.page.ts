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

  public currentIndex = 0;

  public pages = [
    {
      title: "Home",
      url: "/app/home",
      icon: "mail",
    },
    {
      title: "Settings",
      url: "/app/settings",
      icon: "cog",
    },
  ];

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
  }

  ngOnInit() {
    console.log("[App Page] ngOnInit", this.currentUser);
    const path = window.location.pathname.split("folder/")[1];
    if (path !== undefined) {
      this.currentIndex = this.pages.findIndex(
        (page) => page.title.toLowerCase() === path.toLowerCase()
      );
    }
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/auth/login"]);
  }
}
