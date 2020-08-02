import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { environment } from "./../../environments/environment";
import { User } from "@app/models/user";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public login(email: string, password: string) {
    console.log(
      `[Authentication Service] login(email: ${email}, password: ${password})`
    );

    return this.http
      .post<any>(`${environment.apiUrl}/api/auth/login`, { email, password })
      .pipe(
        map((response) => {
          console.log("[Authentication Service]", response);

          let user = response.user;

          user["access_token"] = response.access_token;

          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem("currentUser", JSON.stringify(user));
          this.currentUserSubject.next(user);

          return user;
        })
      );
  }

  public logout() {
    console.log(`[Authentication Service] logout()`);

    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
  }
}
