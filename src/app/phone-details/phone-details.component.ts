import { Component, OnInit } from '@angular/core';
import { PhoneDataService } from '../services/phone-data.service';
import { ActivatedRoute } from '@angular/router';
import { PhoneDetails } from '../models/phone_details';

@Component({
  selector: 'app-phone-details',
  templateUrl: './phone-details.component.html',
  styleUrls: ['./phone-details.component.scss']
})
export class PhoneDetailsComponent implements OnInit {
  selected_phone: PhoneDetails;
  public predictionAvailable: Boolean = false;
  public predictedPrice: any;
  public currentPrice:Number;
  public phoneName: String;
  public brand: String;
  public phone_image: String;
  public battery: String;
  public diagonal: String;
  public main_camera :String;
  public average_rating:String;
  public available_status:String;
  public battery_rating :String;
  public camera_rating:String;
  public connectivity_rating: String;
  public performance_rating: String;
  public design_rating: String;
  public user_rating:String;
  public cpu: String;
  public density:String;
  public front_camera:String;
  public os:String;
  public os_version:String;
  public processor_model:String;
  public ram:String;
  public resolution:String;
  public screen_type:String;
  public size:String;
  public storage:String;
  public usable_surface:String;
  public weight:String;
  public aspect_ratio:String;
  public averagePrice: any;
  


  data: any[][];
  

  constructor(private phoneDataService : PhoneDataService, private route: ActivatedRoute) { }

  ngOnInit() {
    let phone_name = this.route.snapshot.paramMap.get('phone_name');
    this.phoneDataService.getPhoneDetails(phone_name)
      .subscribe(
        res => {
          this.selected_phone = res;
          this.phoneName = res.phone_name;
          this.brand = res.brand;
          this.phone_image=  res.phone_image;
          this.averagePrice = res.phone_price * 193;
          this.battery = res.battery;
          this.diagonal = res.diagonal;
          this.main_camera= res.main_camera;
          this.average_rating = res.average_rating;
          this.available_status= res.available_status;
          this.battery_rating = res.battery_rating;
          this.camera_rating = res.camera_rating;
          this.front_camera=res.front_camera;
          this.connectivity_rating = res.connectivity_rating;
          this.performance_rating = res.performance_rating;
          this.design_rating = res.design_rating;
          this.user_rating = res.user_rating;
          this.cpu=res.cpu;
          this.os=res.os;
          this.os_version =res.os_version;
          this.processor_model=res.processor_model;
          this.ram = res.ram;
          this.resolution=res.resolution;
          this.screen_type=res.screen_type;
          this.size =res.size;
          this.storage = res.storage;
          this.usable_surface=res.usable_surface;
          this.weight= res.weight;
          this.aspect_ratio=res.aspect_ratio;
          this.density=res.density;

        },
        err => console.log(err)
      )

      

      this.phoneDataService.getPredictedPhone(phone_name)
        .subscribe(
           res =>{
            this.predictionAvailable = true;
            this.predictedPrice = "LKR. " + res.predicted_price;
            let all_data = [];
            for (let i = 0; i < res.prices.length; i++) {
               let price_item = []
               price_item.push(res.prices[i].Date);
               price_item.push(res.prices[i].Price);
               all_data.push(price_item);
             }
             this.data = all_data;
             console.log(all_data);
             this.currentPrice = Math.round(res.prices[res.prices.length - 1].Price);
           },
           err => {
            if(err.error.message == "prediction not available"){
              this.predictionAvailable = false;
              this.predictedPrice = "Not available";
              this.currentPrice = this.averagePrice;
           }
          }
        )
  }

  type='AreaChart';
  columnNames = ["Date", "Price"];
  options = {   
     hAxis: {
        title: 'Date',
        titleTextStyle:{
         fontSize:20,
         fontName:'Merriweather, serif',
         bold:true, 
         italic: false,
       },
        textStyle:{
           color:'#01579b',
           fontSize:10,
           fontName:'Arial',
           bold:false,
           italic:true,
           slantedText:true, 
           slantedTextAngle:90
        }
     },
     vAxis:{
        title: 'Price', 
        titleTextStyle:{
         fontSize:20,
         fontName:'Merriweather, serif',
         bold:true, 
         italic: false,
       },
        textStyle:{
         color:'#01579b',
         fontSize:10,
         fontName:'Arial',
         bold:false,
         italic:true,
         slantedText:true, 
         slantedTextAngle:90
        }
     },  
  };
  width = 800;
  height = 400;


}
