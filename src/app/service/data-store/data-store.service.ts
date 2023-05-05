import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {

  constructor() {
  }


  restaurants: BehaviorSubject<string> = new BehaviorSubject<string>('');
  setRestaurants(data : string){
    // console.log('Set Entered OTP : ' + otp);
    this.restaurants.next(data);
  }

  all_agent_users: BehaviorSubject<string> = new BehaviorSubject<string>('');
  setAllAgentUsers(data : any){
    // console.log('Set Entered OTP : ' + otp);
    this.all_agent_users.next(data);
  }

  chosen_restaurant_id: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  setChosenRestaurant(data : number){
    // console.log('Set Entered OTP : ' + otp);
    this.chosen_restaurant_id.next(data);
  }

  chosen_activity_photos: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  setChosenActivityPhotos(data : any){
    // console.log('Set Entered OTP : ' + otp);
    this.chosen_activity_photos.next(data);
  }

  chosen_activity_availabilities: BehaviorSubject<any> = new BehaviorSubject<any>(0);
  setChosenActivityAvailabilities(data : any){
    // console.log('Set Entered OTP : ' + otp);
    this.chosen_activity_availabilities.next(data);
  }

  chosen_activity_id: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  setChosenActivityId(data : number){
    // console.log('Set Entered OTP : ' + otp);
    this.chosen_activity_id.next(data);
  }

  chosen_activity: BehaviorSubject<any> = new BehaviorSubject<any>("");
  setChosenActivity(data : any){
    // console.log('Set Entered OTP : ' + otp);
    this.chosen_activity.next(data);
  }

  chosen_location_id: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  setChosenLocation(data : number){
    // console.log('Set Entered OTP : ' + otp);
    this.chosen_location_id.next(data);
  }

  categoryItems: BehaviorSubject<any> = new BehaviorSubject<any>('');
  setCategoryItems(data : any){
    // console.log('Set Entered OTP : ' + otp);
    this.categoryItems.next(data);
  }

  enteredOTP: BehaviorSubject<string> = new BehaviorSubject<string>('');
  setEnteredOTP(data : string){
    // console.log('Set Entered OTP : ' + otp);
    this.enteredOTP.next(data);
  }

  userInfo: BehaviorSubject<any> = new BehaviorSubject<any>('');
  setUserInfo(data : any){
    // console.log('Set Entered OTP : ' + otp);
    this.userInfo.next(data);
  }

  prodDashboardInfo: BehaviorSubject<any> = new BehaviorSubject<any>('');
  setProdDashboardInfo(data : any){
    // console.log('Set Entered OTP : ' + otp);
    this.prodDashboardInfo.next(data);
  }

  warehouseDashboardInfo: BehaviorSubject<any> = new BehaviorSubject<any>('');
  setWarehouseDashboardInfo(data : any){
    // console.log('Set Entered OTP : ' + otp);
    this.warehouseDashboardInfo.next(data);
  }

  dashboardInfo: BehaviorSubject<any> = new BehaviorSubject<any>('');
  setDashboardInfo(data : any){
    // console.log('Set Entered OTP : ' + otp);
    this.dashboardInfo.next(data);
  }

  users: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  setUsers(data : any){
    // console.log('Set Entered OTP : ' + otp);
    this.users.next(data);
  }

  agent_users: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  setAgentUsers(data : any){
    // console.log('Set Entered OTP : ' + otp);
    this.agent_users.next(data);
  }

  activities: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  setActivities(data : any){
    // console.log('Set Entered OTP : ' + otp);
    this.activities.next(data);
  }

  agents: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  setAgents(data : any){
    // console.log('Set Entered OTP : ' + otp);
    this.agents.next(data);
  }

  airlines: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  setAirlines(data : any){
    console.log('Set Entered OTP : Kibaru');
    this.airlines.next(data);
  }

  userAgentData: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  setUserAgentData(data : any){
    // console.log('Set Entered OTP : ' + otp);
    this.userAgentData.next(data);
  }

  selected_agent_data: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  setSelectedAgentData(data : any){
    // console.log('Set Entered OTP : ' + otp);
    this.selected_agent_data.next(data);
  }

  selected_user_data: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  setSelectedUserData(data : any){
    // console.log('Set Entered OTP : ' + otp);
    this.selected_user_data.next(data);
  }

  selected_airline_data: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  setSelectedAirlineData(data : any){
    // console.log('Set Entered OTP : ' + otp);
    this.selected_airline_data.next(data);
  }

  entries: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  setEntries(data : any){
    // console.log('Set Entered OTP : ' + otp);
    this.entries.next(data);
  }

  user_entries: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  setUserEntries(data : any){
    // console.log('Set Entered OTP : ' + otp);
    this.user_entries.next(data);
  }

  extracted_voucher_details: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  setExtractedVoucherDetails(data : any){
    // console.log('Set Entered OTP : ' + otp);
    this.extracted_voucher_details.next(data);
  }

  bording_pass_extracted_details: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  setBoardingPassExtractedDetails(data : any){
    // console.log('Set Entered OTP : ' + otp);
    this.bording_pass_extracted_details.next(data);
  }

  chosen_activity_packages: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  setChosenActivityPackages(data : any){
    // console.log('Set Entered OTP : ' + otp);
    this.chosen_activity_packages.next(data);
  }

  chosen_package: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  setChosenPackage(data : any){
    // console.log('Set Entered OTP : ' + otp);
    this.chosen_package.next(data);
  }

  chosen_invalidation_voucher: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  setChosenInvalidationVoucher(data : any){
    // console.log('Set Entered OTP : ' + otp);
    this.chosen_invalidation_voucher.next(data);
  }

  logged_in_user: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  setLoggedInUser(data : any){
    // console.log('Set Entered OTP : ' + otp);
    this.logged_in_user.next(data);
  }

}
