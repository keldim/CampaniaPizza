import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private backendURL = "https://campania-pizza-backend.com/";
  // http://localhost:5000/

  constructor() { }

  getBackendURL() {
    return this.backendURL;
  }
}
