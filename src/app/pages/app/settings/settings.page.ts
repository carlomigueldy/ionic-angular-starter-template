import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { AuthenticationService } from "@app/services/core/authentication.service";
import { AppTheme, ThemeService } from "@app/services/core/theme.service";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.page.html",
  styleUrls: ["./settings.page.scss"],
})
export class SettingsPage implements OnInit {
  theme: AppTheme;

  params: Params;

  constructor(
    private route: ActivatedRoute,
    private themeService: ThemeService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.params = this.route.snapshot.params;

    this.theme = this.themeService.currentTheme;
  }

  toggleTheme(event: any) {
    console.log("toggleTheme", event);

    event.target.value === "dark"
      ? this.themeService.toDarkMode()
      : this.themeService.toLightMode();
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/auth/login"]);
  }

  logoutAllDevices() {
    this.authenticationService.logout();
    this.router.navigate(["/auth/login"]);
  }
}
