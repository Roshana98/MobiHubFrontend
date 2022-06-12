import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PhoneDetails } from "../models/phone_details";
import { PhoneDataService } from "../services/phone-data.service";
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { UserSearches } from "../models/userSearches";
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: "app-store",
  templateUrl: "./store.component.html",
  styleUrls: ["./store.component.scss"],
})
export class StoreComponent implements OnInit {
  customer_id = localStorage.getItem("customer_id");
  userSearches = new UserSearches(this.customer_id, "");
  public lower_range_phones: PhoneDetails[];
  public semi_medium_range_phones: PhoneDetails[];
  public medium_range_phones: PhoneDetails[];
  public semi_high_range_phones: PhoneDetails[];
  public high_range_phones: PhoneDetails[];
  public recommended_phones : PhoneDetails[];
  public hasSearched : Boolean;
  phoneNameSearch: string[];
  searchedPhone: String;
  searchItems : String[];

  public isVisible1 = true;
  public isVisible2 = false;
  public isVisible3 = false;
  public isVisible4 = false;
  public isVisible5 = false;

  constructor(private router: Router, private phone_details: PhoneDataService,private authenticationService: AuthenticationService) {}

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;


  ngOnInit() {
    this.phone_details.getPhoneNames().subscribe(
      (res) => {
        this.phoneNameSearch = res;
      },
      (err) => console.log(err)
    );

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value))
    );
    this.phone_details.getAllPhones().subscribe(
      (res) => {
        this.lower_range_phones = res.lower_range;
        this.semi_medium_range_phones = res.semi_medium_range;
        this.medium_range_phones = res.medium_range;
        this.semi_high_range_phones = res.semi_high_range;
        this.high_range_phones = res.high_range;
      },
      (err) => {
        if(err instanceof HttpErrorResponse){
          if(err.status == 401){
            this.router.navigate['/signIn']
          }
        }
      }
    );
    const customer_id= localStorage.getItem('customer_id')
   
    this.phone_details.getRecommendedPhones(customer_id).subscribe(
      (res) => {
          this.recommended_phones = res.recommendedPhonesArray;
          console.log(this.recommended_phones);
          console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );

    this.phone_details.getCustomerSearchesItems(customer_id).subscribe(
      (res) =>{
        this.searchItems = res.searchedItems;
        console.log(this.searchItems)
        if(this.searchItems.length <= 0){
          this.hasSearched = false;
          console.log("no searches");
        }
        else{
          this.hasSearched = true;
          console.log(this.searchItems);
        }
      },
      (err) => {
        console.log(err);
      }
    )


  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    if (value === "") {
      return [];
    }
    return this.phoneNameSearch.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  displayFunction(subject) {
    return subject ? subject : undefined;
  }
  addSearchResult() {
    console.log(this.userSearches);
    this.searchedPhone = this.userSearches.search_result;
    if (this.phoneNameSearch.includes(this.searchedPhone.toString())) {
      this.router.navigate(["/home", this.searchedPhone]);
      this.authenticationService.updateSearchList(this.userSearches)
        .subscribe(
          (res) => {
            console.log(res);
          },
          (err) => console.log(err)
        );
    } else {
      this.router.navigate(["/about"]);
    }
  }
  

  selectedLevel;
  data: Array<Object> = [
    { id: 0, name: "0 - 25,000 " },
    { id: 1, name: "25,000 - 50,000" },
    { id: 2, name: "50,000 - 75,000" },
    { id: 3, name: "75,000 - 100,000" },
    { id: 4, name: "Above    100,000" },
  ];

  selected() {
    if (this.selectedLevel.id == 0) {
      this.isVisible1 = true;
      this.isVisible2 = false;
      this.isVisible3 = false;
      this.isVisible4 = false;
      this.isVisible5 = false;
    } else if (this.selectedLevel.id == 1) {
      this.isVisible2 = true;
      this.isVisible1 = false;
      this.isVisible3 = false;
      this.isVisible4 = false;
      this.isVisible5 = false;
    } else if (this.selectedLevel.id == 2) {
      this.isVisible3 = true;
      this.isVisible1 = false;
      this.isVisible2 = false;
      this.isVisible4 = false;
      this.isVisible5 = false;
    } else if (this.selectedLevel.id == 3) {
      this.isVisible4 = true;
      this.isVisible1 = false;
      this.isVisible3 = false;
      this.isVisible2 = false;
      this.isVisible5 = false;
    } else if (this.selectedLevel.id == 4) {
      this.isVisible5 = true;
      this.isVisible1 = false;
      this.isVisible3 = false;
      this.isVisible4 = false;
      this.isVisible2 = false;
    }
  }

  onSelect(phone){
    this.router.navigate(['/home', phone.phone_name]);
  }

}
