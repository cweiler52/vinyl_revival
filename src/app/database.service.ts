import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Products } from '../app/models/product.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  private dbProductsUrl = 'http://localhost:3005/api/products';
  private dbLogUrl = 'http://localhost:3005/api/login';
  private dbSignUrl = 'http://localhost:3005/api/signup';
  
  constructor(private http: HttpClient) { }

  // getPlants() : Observable<Plant[]> {
  //   return this.http.get<Plant[]>(this.dbProductsUrl);
  // }
  
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