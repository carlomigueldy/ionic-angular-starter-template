import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { LocalStorageService } from "./local-storage.service";

export type AppTheme = "light" | "dark";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  private _themeSubject = new BehaviorSubject<AppTheme>("dark");

  get currentTheme() {
    return this._themeSubject.value;
  }

  set theme(value: AppTheme) {
    this._themeSubject.next(value);
  }

  get isDark() {
    return this.currentTheme === "dark";
  }

  get isLight() {
    return this.currentTheme === "light";
  }

  constructor(private localStorageService: LocalStorageService) {}

  initialize() {
    const preferredTheme = this.localStorageService.get("preferences.theme");

    if (!preferredTheme) {
      document.body.setAttribute("data-theme", this.currentTheme);
      this.localStorageService.set("preferences.theme", this.currentTheme);
      return;
    }

    this._themeSubject.next(preferredTheme);
  }

  toggleTheme() {
    let systemDark = window.matchMedia("(prefers-color-scheme: dark)");
    systemDark.addListener(this.colorTest);

    console.log("[ThemeService] toggleTheme");

    if (this.isLight) {
      document.body.setAttribute("data-theme", "dark");
      this.localStorageService.set("preferences.theme", "dark");
      this._themeSubject.next("dark");
    } else {
      document.body.setAttribute("data-theme", "light");
      this.localStorageService.set("preferences.theme", "light");
      this._themeSubject.next("light");
    }
  }

  colorTest(systemInitiatedDark) {
    console.log("colorTest", systemInitiatedDark);

    if (systemInitiatedDark.matches) {
      document.body.setAttribute("data-theme", "dark");
      this.localStorageService.set("preferences.theme", "dark");
    } else {
      document.body.setAttribute("data-theme", "light");
      this.localStorageService.set("preferences.theme", "light");
    }
  }
}
