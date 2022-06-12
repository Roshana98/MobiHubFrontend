import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logincustomer',
  templateUrl: './logincustomer.component.html',
  styleUrls: ['./logincustomer.component.scss']
})
export class LogincustomerComponent implements OnInit {
  logInCustomerData = { email: "", password: "" };
  emailNotValid = false;
  passwordNotValid = false;
  error_message1 = "Email is required!";
  error_message2 = "Password is required!";

  constructor(private _auth: AuthenticationService, private router: Router) { }


  ngOnInit() {
  }

  logInNewUser() {
    this._auth.loginUser(this.logInCustomerData).subscribe(
      res => {
        localStorage.setItem('token', res.token);
        if(res.customer_id){
          localStorage.setItem('customer_id', res.customer_id);
          const customer_id= localStorage.getItem('customer_id')
          this.router.navigate(['/store', customer_id]);
        }
        else if(res.seller_id){
          localStorage.setItem('seller_id', res.seller_id);
          const seller_id = localStorage.getItem('seller_id');
          this.router.navigate(['/mobile-list', seller_id]);
        }
      
      },
      err => {
        if(err.error.message =="User does not exits!"){
          this.error_message1 = "Your email is invalid!"
          this.emailNotValid = true;
        }
        if(err.error.message == "Invalid password"){
          this.error_message2 = "Your password is incorrect. Is your CAPS lock on?";
          this.passwordNotValid = true;
        }
      }
    );
  } 

}
