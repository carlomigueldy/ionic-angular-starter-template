import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LocalStorageService {
  constructor() {}

  get(key: string): any {
    return JSON.parse(localStorage.getItem(key));
  }

  set(key: string, payload: any): void {
    localStorage.setItem(key, JSON.stringify(payload));
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
