import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { APIURL } from '../environments/environment.prod';
import { Products } from './models/products.model';
import { Favs } from './models/favs.model';
import { Comments } from './models/comments.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': sessionStorage.getItem('token')
  })
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private dbLogUrl = `${APIURL}/api/login`;
  private dbSignUrl = `${APIURL}/api/signup`;
  private dbProductsUrl = `${APIURL}/api/products`;
  private dbFavsUrl = `${APIURL}/api/favs`;
  private dbCommentsUrl = `${APIURL}/api/comments`;
  private auth = {};

  constructor(private http: HttpClient) { }

  getProducts() : Observable<Products[]> {
    return this.http.get<Products[]>(this.dbProductsUrl, httpOptions);
  }
  
  getOneProduct(id) : Observable<Products[]> {
    return this.http.get<Products[]>(`${this.dbProductsUrl}/${id}`, httpOptions);
  }

  getProductsHome() : Observable<Products[]> {
    return this.http.get<Products[]>(this.dbProductsUrl);
  }

  getFavsHome() : Observable<Favs[]> {
    return this.http.get<Favs[]>(this.dbFavsUrl);
  }

  getCommentsHome() : Observable<Comments[]> {
    return this.http.get<Comments[]>(this.dbCommentsUrl);
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
            sessionStorage.setItem('token', user.sessionToken);
            sessionStorage.setItem('uid', user.user.id);
            sessionStorage.setItem('name', user.user.name);
            sessionStorage.setItem('img', user.user.image);
            if(user.user.roleid) { sessionStorage.setItem('role', 'admin') }else{ sessionStorage.setItem('role', 'user') };
         }
         return user;
      }));
  }
  
  SignupUser(user) {
    return this.http.post<any>(this.dbSignUrl, user)
      .pipe(map(user => { console.log(user)
        if (user && user.sessionToken) {
          sessionStorage.setItem('token', user.sessionToken);
        }
        return user;
      }));
  }

  logoutUser() {
    sessionStorage.removeItem('img');
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('uid');
    
  }

  getCookies() {
    this.auth = {
      is_loggedin: sessionStorage.getItem('token') ? true : false,
      is_admin: sessionStorage.getItem('role') === 'admin' ? true : false,
      user_name: sessionStorage.getItem('name'),
      user_img: sessionStorage.getItem('img'),
      user_id: sessionStorage.getItem('uid')
    }

    return this.auth;
  }
}