import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { AuthenticationService } from "@app/services/core/authentication.service";
import { ThemeService } from "@app/services/core/theme.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  params: Params;

  constructor(
    private route: ActivatedRoute,
    private themeService: ThemeService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.params = this.route.snapshot.params;
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/auth/login"]);
  }
}
