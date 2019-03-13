import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { APIURL } from '../environments/environment.prod';
import { Products } from './models/products.model';

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

  getProducts() : Observable<Products[]> {
    return this.http.get<Products[]>(this.dbProductsUrl, httpOptions);
  }
  
  // deletePlant(id: any) : Observable<Plant> {
  //   const deleteProductsUrl = `${this.dbProductsUrl}/${id}`;
  //   // console.log(deleteProductsUrl);
  //   return this.http.delete<Plant>(deleteProductsUrl, httpOptions);
  // }

  createVinyl(product) : Observable<Products> {
    return this.http.post<any>( `${this.dbProductsUrl}/add`, product, httpOptions )
  }

  editVinyl(product, id: any) : Observable<Products> {
    return this.http.put<any>( `${this.dbProductsUrl}/${id}`, product, httpOptions )
  }

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