import { Component, OnInit, NgZone } from '@angular/core';
import { SellerApiService } from '../services/seller-api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-mobile-create',
  templateUrl: './mobile-create.component.html',
  styleUrls: ['./mobile-create.component.scss']
})
export class MobileCreateComponent implements OnInit {

  submitted = false;
  mobileForm: FormGroup;
  
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: SellerApiService
  ) { 
    this.mainForm();
  }

  ngOnInit() { }

  mainForm() {
    this.mobileForm = this.fb.group({
      seller_id: [localStorage.getItem('seller_id'), [Validators.required]],
      brand: ['', [Validators.required]],
      model: ['', [Validators.required]],
      price: ['', [Validators.required]],
      date: ['', [Validators.required]]
    })
  }



  // Getter to access form control
  get myForm(){
    return this.mobileForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.mobileForm.valid) {
      return false;
    } else {
      this.apiService.createMobile(this.mobileForm.value).subscribe(
        (res) => {
          console.log('Mobile successfully created!')
          const seller_id = localStorage.getItem('seller_id')
          this.ngZone.run(() => this.router.navigate(['/mobile-list', seller_id]))
        }, (error) => {
          console.log(error);
        });
    }
  }
}
