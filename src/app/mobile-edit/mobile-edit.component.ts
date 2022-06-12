import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Mobile } from '../models/Mobile';
import { ActivatedRoute, Router } from '@angular/router';
import { SellerApiService } from '../services/seller-api.service';

@Component({
  selector: 'app-mobile-edit',
  templateUrl: './mobile-edit.component.html',
  styleUrls: ['./mobile-edit.component.scss']
})
export class MobileEditComponent implements OnInit {
  submitted = false;
  editForm: FormGroup;
  mobileData: Mobile[];
  

  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: SellerApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.updateMobile();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getEmployee(id);
    this.editForm = this.fb.group({
      brand: ['', [Validators.required]],
      model: ['', [Validators.required]],
      price: ['', [Validators.required]],
      date: ['', [Validators.required]]
    })
  }

  // Getter to access form control
  get myForm() {
    return this.editForm.controls;
  }

  getEmployee(id) {
    this.apiService.getMobile(id).subscribe(data => {
      this.editForm.setValue({
        brand: data['brand'],
        model: data['model'],
        price: data['price'],
        date: data['date'],
      });
    });
  }

  updateMobile() {
    this.editForm = this.fb.group({
      brand: ['', [Validators.required]],
      model: ['', [Validators.required]],
      price: ['', [Validators.required]],
      date: ['', [Validators.required]]
    })
  }

  onSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.apiService.updateMobile(id, this.editForm.value)
          .subscribe(res => {
            const seller_id = localStorage.getItem('seller_id');
            this.router.navigate(['/mobile-list', seller_id]);
            console.log('Content updated successfully!')
          }, (error) => {
            console.log(error)
          })
      }
    }
  }
}
