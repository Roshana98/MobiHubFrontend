import { Component, OnInit } from '@angular/core';
import { Seller } from '../models/seller';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signupseller',
  templateUrl: './signupseller.component.html',
  styleUrls: ['./signupseller.component.scss']
})
export class SignupsellerComponent implements OnInit {
  sellerModel = new Seller("","", "", "", "", "");
  sellerAreadyExits: boolean;

  constructor(private _auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  registerNewSeller(){
    
    this._auth.registerSeller(this.sellerModel).subscribe(
      res => {
        this.sellerAreadyExits = false;
        localStorage.setItem('token', res.token);
        localStorage.setItem('seller_id', res.seller_id)
        const seller_id = localStorage.getItem('seller_id');
        this.router.navigate(['/mobile-list', seller_id]);
      },
      err => {
        if(err){
          this.sellerAreadyExits = true;
        }
      }
    );
  }


}
