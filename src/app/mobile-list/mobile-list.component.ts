import { Component, OnInit } from '@angular/core';
import { SellerApiService } from '../services/seller-api.service';
import { Seller } from '../models/seller';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mobile-list',
  templateUrl: './mobile-list.component.html',
  styleUrls: ['./mobile-list.component.scss']
})
export class MobileListComponent implements OnInit {

  Mobile:any = [];

  constructor(private apiService: SellerApiService, private actRoute: ActivatedRoute) { 
    this.readMobile();
  }

  ngOnInit() {}

  readMobile(){
    let seller_id = this.actRoute.snapshot.paramMap.get('seller_id');
    this.apiService.getMobiles(seller_id).subscribe((data) => {
     this.Mobile = data;
    })    
  }

  removeMobile(mobile, index) {
    if(window.confirm('Are you sure?')) {
        this.apiService.deleteMobile(mobile._id).subscribe((data) => {
          this.Mobile.splice(index, 1);
        }
      )    
    }
  }

}
