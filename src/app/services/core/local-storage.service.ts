import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LocalStorageService {
  constructor() {}

  get(key: string): any {
    const data = localStorage.getItem(key);

    if (typeof data !== "string") return JSON.parse(localStorage.getItem(key));

    return data;
  }

  set(key: string, payload: any): void {
    localStorage.setItem(key, payload);
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
