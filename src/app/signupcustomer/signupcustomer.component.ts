import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { Customer } from '../models/customer';


@Component({
  selector: 'app-signupcustomer',
  templateUrl: './signupcustomer.component.html',
  styleUrls: ['./signupcustomer.component.scss']
})
export class SignupcustomerComponent implements OnInit {
  customerModel = new Customer("", "", "", "", "", "");
  customerAreadyExits = false;
  
  constructor(private _auth: AuthenticationService, private router: Router) { }


  ngOnInit() {
  }

  registerNewCustomer(){
    this._auth.registerCustomer(this.customerModel).subscribe(
      res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('customer_id', res.customer_id)
        const customer_id= localStorage.getItem('customer_id')
        this.router.navigate(['/store', customer_id]);
      },
      err => {
        if(err){
          this.customerAreadyExits = true;
        }
      }
    );
  }
}
