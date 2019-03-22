import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { APIURL } from '../environments/environment.prod';
import { Products } from './models/products.model';
import { Favs } from './models/favs.model';
import { Comments } from './models/comments.model';
import { ProductsFC } from './models/products_favs_comments.model';
import { Profile } from './models/profile.model';
import { Auth } from './models/auth.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': sessionStorage.getItem('token')
  })
}
const httpNoAuthOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private dbLogUrl = `${APIURL}/api/login`;
  private dbSignUrl = `${APIURL}/api/signup`;
  private dbUserUrl = `${APIURL}/api/user`;
  private dbProductsUrl = `${APIURL}/api/products`;
  private dbFavsUrl = `${APIURL}/api/favs`;
  private dbCommentsUrl = `${APIURL}/api/comments`;
  private dbCommentUrl = `${APIURL}/api/comment`;
  private auth: Auth;

  constructor(
    private http: HttpClient) { }

  getProducts() : Observable<Products[]> {
    return this.http.get<Products[]>(this.dbProductsUrl, httpOptions);
  }
  
  getOneProduct(id) : Observable<Products[]> {
    return this.http.get<Products[]>(`${this.dbProductsUrl}/${id}`, httpOptions);
  }

  getProductsHome() : Observable<Products[]> {
    return this.http.get<Products[]>(this.dbProductsUrl);
  }

  getProdView(id: number) : Observable<ProductsFC> {
    return this.http.get<ProductsFC>(`${this.dbProductsUrl}/${id}`, httpNoAuthOptions);
  }
  getProdSuggestions(id: number, genre: string) : Observable<any> {
    return this.http.get<Products[]>(`${this.dbProductsUrl}/suggestions/${id}/${genre}`, httpNoAuthOptions);
  }
  
  getFavsHome() : Observable<Favs[]> {
    return this.http.get<Favs[]>(this.dbFavsUrl);
  }

  getCommentsHome() : Observable<Comments[]> {
    return this.http.get<Comments[]>(this.dbCommentsUrl);
  } 

  getCommentsAdmin(id: number) : Observable<Comments[]> {
    return this.http.get<Comments[]>(`${this.dbCommentsUrl}/${id}`, httpOptions);
  } 

  createComment(uid: number, pid: number, comment: string) : Observable<any> {
    return this.http.post<any>(`${this.dbCommentUrl}/add`, {user_id: uid, product_id: pid, comment:comment}, httpOptions)
  }

  editComment(id: any, comment: string) : Observable<any> {
    return this.http.put<any>(`${this.dbCommentUrl}/${id}`, {comment: comment}, httpOptions)
  }

  deleteComment(id: any) : Observable<any> {
    return this.http.delete<any>(`${this.dbCommentUrl}/${id}`, httpOptions)
  }

  deleteVinyl(id: any) : Observable<Products> {
    const deleteProductsUrl = `${this.dbProductsUrl}/${id}`;
    // console.log(deleteProductsUrl);
    return this.http.delete<Products>(deleteProductsUrl, httpOptions);
  }

  createVinyl(product) : Observable<Products> {
    return this.http.post<any>( `${this.dbProductsUrl}/add`, product, httpOptions )
  }

  editVinyl(product, id: any) : Observable<Products> {
    return this.http.put<any>( `${this.dbProductsUrl}/${id}`, product, httpOptions )
  }

  favVinyl(uid, pid) {
    return this.http.post<any>( `${this.dbFavsUrl}/save`, { user_id: uid, product_id: pid }, httpOptions)
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
          sessionStorage.setItem('uid', user.user.id);
          sessionStorage.setItem('name', user.user.name);
          sessionStorage.setItem('img', user.user.image);
          if(user.user.roleid) { sessionStorage.setItem('role', 'admin') }else{ sessionStorage.setItem('role', 'user') };
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

  getUserProfile(id) : Observable<Profile> {
    return this.http.get<any>( `${this.dbUserUrl}/${id}`, httpOptions);
  }

  getCookies() {
    return this.auth = {
      is_admin: sessionStorage.getItem('role') === 'admin' ? true : false,
      is_loggedin: sessionStorage.getItem('token') ? true : false,
      user_id: sessionStorage.getItem('uid'),
      user_img: sessionStorage.getItem('img'),
      user_name: sessionStorage.getItem('name')
    }
  }
}