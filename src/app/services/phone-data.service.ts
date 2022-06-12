import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PhoneDataService {  
  constructor(private http: HttpClient) { }


  getAllPhones(){
    return this.http.get<any>(`http://localhost:3000/api/phones`);
  }

  getPhoneNames(){
    return this.http.get<any>(`http://localhost:3000/api/phones/phone_names`);
  }

  getTopRatedPhones(){
    return this.http.get<any>(`http://localhost:3000/api/phones/top_rated`);
  }

  getPhoneDetails(phone_name){
    return this.http.get<any>(`http://localhost:3000/api/phones/phone_features/${phone_name}`);
  }

  getPredictedPhones(){
    return this.http.get<any>(`http://localhost:3000/api/phones/predicted_phones`);
  }
  getPredictedPhone(phone_name){
    return this.http.get<any>(`http://localhost:3000/api/phones/predicted_phones/${phone_name}`);
  }
  getRecommendedPhones(customer_id){
    return this.http.get<any>(`http://localhost:3000/api/phones/recommendated_phones/${customer_id}`);
  }
  getCustomerSearchesItems(customer_id){
    return this.http.get<any>(`http://localhost:3000/api/users/userSearches/${customer_id}`);
  }
}
