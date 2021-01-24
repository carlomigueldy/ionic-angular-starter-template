import { Injectable, isDevMode } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { DeviceDetectorService } from "ngx-device-detector";

import { User } from "@app/models/user";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  private _currentUserSubject: BehaviorSubject<User>;
  currentUser: Observable<User>;

  constructor(
    private localStorageService: LocalStorageService,
    private deviceDetectorService: DeviceDetectorService,
    private http: HttpClient
  ) {
    this._currentUserSubject = new BehaviorSubject<User>(
      this.localStorageService.get("currentUser")
    );

    this.currentUser = this._currentUserSubject.asObservable();
  }

  get currentUserValue(): User {
    return this._currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http
      .post<any>(`/api/auth/login`, {
        email,
        password,
        device_name: this.deviceDetectorService.getDeviceInfo().device,
      })
      .pipe(
        map((response) => {
          if (isDevMode()) console.log("[Authentication Service]", response);

          let user = response.user;

          user["access_token"] = response.access_token;

          this.localStorageService.set("currentUser", user);
          this._currentUserSubject.next(user);

          return user;
        })
      );
  }

  logout() {
    this.localStorageService.remove("currentUser");
    this._currentUserSubject.next(null);
  }
}
