import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APIURL } from '../environments/environment.prod';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//import { Plant } from '../models/plant.model'; ---> ADD PRODUCT IMPORT

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
  })
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private dbLogUrl = `${APIURL}/api/login`;
  private dbSignUrl = `${APIURL}/api/signup`;
  private dbProductsUrl = `${APIURL}/api/products`;
  
  constructor(private http: HttpClient) { }

  // getPlants() : Observable<Plant[]> {
  //   return this.http.get<Plant[]>(this.dbProductsUrl);
  // }
  
  // deletePlant(id: any) : Observable<Plant> {
  //   const deleteProductsUrl = `${this.dbProductsUrl}/${id}`;
  //   // console.log(deleteProductsUrl);
  //   return this.http.delete<Plant>(deleteProductsUrl, httpOptions);
  // }

  loginUser(user) {
    return this.http.post<any>(this.dbLogUrl, user)
      .pipe(map(user => {
         if (user && user.sessionToken) {
             localStorage.setItem('token', user.sessionToken);
         }
         return user;
      }));
  }
  
  SignupUser(user) {
    return this.http.post<any>(this.dbSignUrl, user)
      .pipe(map(user => { console.log(user)
         if (user && user.sessionToken) {
             localStorage.setItem('token', user.sessionToken);
         }
         return user;
      }));
  }

  logoutUser() {
      localStorage.removeItem('token');
  }
}