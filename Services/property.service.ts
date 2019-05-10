import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class PropertyService {
  baseUrl = 'http://localhost:8080/property/';

  constructor(private _http: Http) { }

  getProperties() {
    return this._http.get(this.baseUrl + 'list')
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  getPropertyById(id) {
    console.log('calling get property');
    const newLocal = this._http.get(this.baseUrl + id)
      .map((response: Response) => response.json());
    console.log('After calling get property JSON Stringify' + JSON.stringify(newLocal));
    return newLocal
      .catch(this._errorHandler);
  }

  saveProperty(property) {
    return this._http.post(this.baseUrl + 'saveproperty', property)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  deleteProperty(id) {
    return this._http.delete(this.baseUrl + 'delete/' + id)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  _errorHandler(error: Response) {
    // debugger;
    console.log(error);
    return Observable.throw(error || 'Internal server error');
  }

}
