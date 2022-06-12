import { Component, OnInit } from "@angular/core";
import { PhoneDataService } from "../services/phone-data.service";
import { PhoneDetails } from "../models/phone_details";
import { Router } from "@angular/router";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { UserSearches } from "../models/userSearches";
import { AuthenticationService } from '../services/authentication.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  customer_id = localStorage.getItem("customer_id");
  userSearches = new UserSearches(this.customer_id, "");
  public top_rated_phones: PhoneDetails[];
  public predicted_phones: PhoneDetails[];
  phoneNameSearch: string[];
  searchedPhone: String;

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;

  constructor(
    private router: Router,
    private phone_details: PhoneDataService,
    private authenticationService: AuthenticationService,
    private spinner: NgxSpinnerService,
    
  ) {}

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

    this.phone_details.getTopRatedPhones().subscribe(
      (res) => {
        this.top_rated_phones = res;
      },
      (err) => console.log(err)
    );

    this.phone_details.getPredictedPhones().subscribe(
      (res) => {
        this.predicted_phones = res.predicted_phones;
        console.log(res)
        // if(this.predicted_phones = []){
        //   console.log('Hello')
        // }
      },
      (err) => console.log(err)
    );
    this.showSpinner();
  }

  onSelect(phone) {
    this.router.navigate(["/home", phone.phone_name]);
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
    } else {
      this.router.navigate(["/about"]);
    }
  }

  showSpinner() {
    this.spinner.show();
    setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
    }, 6000);
  }
}
