import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private __customerRegisterUrl = "http://localhost:3000/api/users/customer_register";
  private __sellerRegisterUrl = "http://localhost:3000/api/users/seller_register";
  private _loginUrl = "http://localhost:3000/api/users/login";
  private _customerSearchUrl = "http://localhost:3000/api/users/userSearches";

  constructor(private http: HttpClient, private router: Router) { }

  registerCustomer(customer){
    return this.http.post<any>(this.__customerRegisterUrl, customer);
  }

  registerSeller(seller){
    return this.http.post<any>(this.__sellerRegisterUrl, seller);
  }

  loginUser(user){
    return this.http.post<any>(this._loginUrl, user);
  }

  updateSearchList(userSearches){
    return this.http.put<any>(this._customerSearchUrl, userSearches);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  getSellerId(){
    const seller_id = localStorage.getItem('seller_id');
    this.router.navigate(['/mobile-list', seller_id])
  }

  getCustomerId(){
    const customer_id = localStorage.getItem('customer_id');
    this.router.navigate(['/store', customer_id])
  }

  isSellerLoggedIn(){
    const seller_id = localStorage.getItem('seller_id');
    if(seller_id){
      return true;
    }
    return false;
  }

  isCustomerLoggedIn(){
    const customer_id = localStorage.getItem('customer_id');
    if(customer_id){
      return true;
    }
    return false;
  }


  isLoggedIn(){
    const token = localStorage.getItem('token');
    if(token){
      return true;
    }
    return false;
  }

  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('customer_id')
    localStorage.removeItem('seller_id');
    this.router.navigate['/home'];
  }
}
