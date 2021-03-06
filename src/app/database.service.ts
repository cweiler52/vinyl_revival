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

  private dbLogUrl      = `${APIURL}/api/login`;
  private dbSignUrl     = `${APIURL}/api/signup`;
  private dbProfileUrl  = `${APIURL}/api/profile`;
  private dbProductsUrl = `${APIURL}/api/products`;
  private dbFavsUrl     = `${APIURL}/api/favs`;
  private dbCommentsUrl = `${APIURL}/api/comments`;
  private dbCommentUrl  = `${APIURL}/api/comment`;
  private auth: Auth;

  constructor(
    private http: HttpClient) { }

  // PRODUCTS //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getProductsHome() : Observable<Products[]> {
    return this.http.get<Products[]>(this.dbProductsUrl);
  }
  getProducts() : Observable<Products[]> {
    return this.http.get<Products[]>(this.dbProductsUrl, httpOptions);
  }
  getOneProduct(id: number) : Observable<Products[]> {
    return this.http.get<Products[]>(`${this.dbProductsUrl}/${id}`, httpOptions);
  }
  getProdView(id: number) : Observable<ProductsFC> {
    return this.http.get<ProductsFC>(`${this.dbProductsUrl}/${id}`, httpNoAuthOptions);
  }
  getProdSuggestions(id: number, genre: string) : Observable<any> {
    return this.http.get<Products[]>(`${this.dbProductsUrl}/suggestions/${id}/${genre}`, httpNoAuthOptions);
  }
  deleteVinyl(id: number) : Observable<Products> {
    return this.http.delete<Products>(`${this.dbProductsUrl}/${id}`, httpOptions);
  }
  createVinyl(product: any) : Observable<Products> {
    return this.http.post<any>( `${this.dbProductsUrl}/add`, product, httpOptions )
  }
  editVinyl(product: any, id: number) : Observable<Products> {
    return this.http.put<any>( `${this.dbProductsUrl}/${id}`, product, httpOptions )
  }

  // COMMENTS ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getCommentsHome() : Observable<Comments[]> {
    return this.http.get<Comments[]>(this.dbCommentsUrl);
  } 
  getCommentsAdmin(id: number) : Observable<Comments[]> {
    return this.http.get<Comments[]>(`${this.dbCommentsUrl}/${id}`, httpOptions);
  }
  getProductComments(id: number) : Observable<Comments[]> {
    return this.http.get<Comments[]>(`${this.dbCommentsUrl}/${id}`, httpOptions);
  }
  createComment(uid: number, pid: number, comment: string) : Observable<any> {
    return this.http.post<any>(`${this.dbCommentUrl}/add`, {user_id: uid, product_id: pid, comment: comment}, httpOptions)
  }
  editComment(id: number, comment: string) : Observable<any> {
    return this.http.put<any>(`${this.dbCommentUrl}/${id}`, {comment: comment}, httpOptions)
  }
  deleteComment(id: number) : Observable<any> {
    return this.http.delete<any>(`${this.dbCommentUrl}/${id}`, httpOptions)
  }

  // FAVS //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getFavsHome() : Observable<Favs[]> {
    return this.http.get<Favs[]>(this.dbFavsUrl);
  }
  favVinyl(uid: number, pid: number) {
    return this.http.post<any>( `${this.dbFavsUrl}/handle`, { user_id: uid, product_id: pid }, httpOptions)
  }

  // PROFILE ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getUserProfile(id: number) : Observable<Profile> {
    return this.http.get<any>( `${this.dbProfileUrl}/${id}`, httpOptions);
  }
  editProfile(id: number, profile: any) : Observable<Profile> {
    return this.http.put<any>( `${this.dbProfileUrl}/${id}`, profile, httpOptions )
  }
  deleteProfile(id: number) {
    return this.http.delete<any>( `${this.dbProfileUrl}/${id}`, httpOptions)
  }

  // USER //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loginUser(user: any) {
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
  SignupUser(user: any) {
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