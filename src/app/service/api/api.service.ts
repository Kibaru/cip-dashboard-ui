import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // api_url: string = "https://cip.kibarusymon.co.ke/cip/public/index.php/api/";
  // api_url: string = "https://activity.reserveport.com/ab_api/public/index.php/api/";
  // api_url: string = "http://localhost/ppal_ab_api/ActivityBookingAPI/public/index.php/api/";




  // api_url: string = "http://localhost/dashboard/public/index.php/api/";
  // api_url: string = "http://localhost/ab_api/public/index.php/api/";
  // api_url: string = "http://localhost:8000/api/third-party-bookings/redeem";
  // api_url: string = "https://cip.kibarusymon.co.ke/cip/public/index.php/api/";
  api_url: string = "https://ciplounge.co.tz/staging_api/public/index.php/api/";


  constructor(private http: HttpClient) { }



  getCompanies() {
    // const body = {
    //   phone_number
    // };
    // const headerDict = {
    //   'Content-Type': 'application/json',
    //   'Accept': 'application/json',
    //   'Access-Control-Allow-Headers': '*',
    // }
    
    // const requestOptions = {                                                                                                                                                                                 
    //   headers: new HttpHeaders(headerDict), 
    // };
    return this.http.get(this.api_url + 'get_companies_of_user');

  }
  getActivities(company_id :number) {
    // const body = {
    //   phone_number
    // };
    return this.http.get(this.api_url + 'activities/company/' + company_id);

  }

  getAgents() {
    // const body = {
    //   phone_number
    // };
    return this.http.get(this.api_url + 'third-party-bookings/agents');

  }

  getAirlines() {
    // const body = {
    //   phone_number
    // };
    
    return this.http.get(this.api_url + 'third-party-bookings/airlines');

  }

  getEntries(company_id :number) {
    // const body = {
    //   phone_number
    // };
    return this.http.get(this.api_url + 'third-party-bookings/company/' + company_id);

  }

  invalidateVoucher(voucher_id :number) {
    // const body = {
    //   phone_number
    // };
    return this.http.get(this.api_url + 'third-party-bookings/invalidate/' + voucher_id);

  }
  getAgentEntries(agent_id :number) {
    // const body = {
    //   phone_number
    // };
    return this.http.get(this.api_url + 'third-party-bookings/agent/' + agent_id);

  }

  getAgentUserEntries() {
    // const body = {
    //   phone_number
    // };
    return this.http.get(this.api_url + 'third-party-bookings/agent-user-vouchers');

  }

  getActivity(activity_id :number) {
    // const body = {
    //   phone_number
    // };
    return this.http.get(this.api_url + 'activities/' + activity_id);

  }

  getPackage(package_id :number) {
    // const body = {
    //   phone_number
    // };
    return this.http.get(this.api_url + 'packages/' + package_id);

  }

  requestOTP(phone_number: string) {
    const body = {
      phone_number
    };
    return this.http.post(this.api_url + 'request_otp', body);

  }
  login(email: string, password: string) {
    const body = {
      email, password
    };
    return this.http.post(this.api_url + 'authenticate', body);

  }
  setNewUsername(username: string) {
    const body = {
      username,
    };
    return this.http.post(this.api_url + 'save_new_username', body);

  }

  addNewUser(company_id : any , user: any) {
    return this.http.post(this.api_url + 'companies/'+company_id+'/users', user);
  }

  addNewAgent(agent : any) {
  
    return this.http.post(this.api_url + 'third-party-bookings/agents', agent);

  }

  addNewAirline(airline : any) {
  
    return this.http.post(this.api_url + 'third-party-bookings/airlines', airline);

  }

  addNewAgentUser(agent_id :any , user:any) {
    return this.http.post(this.api_url + 'third-party-bookings/agents/'+agent_id+'/users', user);
  }

  getUserAgentData(user_id :any ) {
    return this.http.get(this.api_url + 'third-party-bookings/agent/user/'+user_id);
  }

  updateAgent(agent : any) {
  
    return this.http.put(this.api_url + 'third-party-bookings/agents', agent);

  }

  updateAirline(airline : any) {
  
    return this.http.put(this.api_url + 'third-party-bookings/airlines/'+airline.id, airline);

  }

  deleteAirline(airline : any) {
  
    return this.http.delete(this.api_url + 'third-party-bookings/airlines/'+airline.id, airline);

  }

  saveNewBatch(batch_number: string) {
    const body = {
      item_name: "FACE MASK",
      batch_number
    };
    return this.http.post(this.api_url + 'save_new_batch', body);

  }

  saveNewEntry(entry: any) {
   
    return this.http.post(this.api_url + 'third-party-bookings', entry);

  }

  redeeemVoucher(id: any) {
   
    const entry = {
      id
    };
    return this.http.put(this.api_url + 'third-party-bookings/redeem', entry);

  }

  changeUserPassword(current_password: any , password: any) {
   
    const entry = {
      current_password,
      password
    };
    return this.http.put(this.api_url + 'user/password', entry);

  }

  getVoucherDetails(id: any) {
   
    return this.http.get(this.api_url + 'third-party-bookings/encoded/' + id );

  }
  

  saveNewPhoto(photo: any , activity_id : any) {
    
    const body = {
      photo
    };


    return this.http.post(this.api_url + 'activities/'+activity_id+'/photo', body);
  }

  addNewActivity(activity: any ) {
    
    return this.http.post(this.api_url + 'add_new_activity', activity);
  }

  deletePhoto( photo_id : any) {
    return this.http.delete(this.api_url + 'photos/'+photo_id);
  }
  deleteUser( user_id : any) {
    return this.http.delete(this.api_url + 'users/'+user_id);
  }
  deleteAgentUser( user_id : any) {
    return this.http.delete(this.api_url + 'third-party-bookings/agent/user/'+user_id);
  }
  deleteActivity( activity_id : any) {
    return this.http.delete(this.api_url + 'activities/'+activity_id);
  }
  deleteAgent( agent_id : any) {
    return this.http.delete(this.api_url + 'third-party-bookings/agents/'+agent_id);
  }

  getActivityPhotos(activity_id:any) {
    // const body = {
    //   phone_number, password : otp,
    // };
    return this.http.get(this.api_url + 'activities/'+activity_id+'/photos');

  }

  getUsers(company_id:any) {
    // const body = {
    //   phone_number, password : otp,
    // };
    return this.http.get(this.api_url + 'companies/'+company_id+'/users');

  }

  getAgentUsers(agent_id:any) {
    // const body = {
    //   phone_number, password : otp,
    // };
    return this.http.get(this.api_url + 'third-party-bookings/agents/'+agent_id+'/users');

  }

  getAllPortalUsers() {
    // const body = {
    //   phone_number, password : otp,
    // };
    return this.http.get(this.api_url + 'third-party-bookings/portal-users');

  }

  getAllAgentUsers() {
    // const body = {
    //   phone_number, password : otp,
    // };
    return this.http.get(this.api_url + 'third-party-bookings/agents/users');

  }

  toggleAdminUser(user_id:any) {
    // const body = {
    //   phone_number, password : otp,
    // };
    return this.http.get(this.api_url + 'third-party-bookings/agent/user/'+user_id+'/toggle-admin');

  }

  togglePortalAdminUser(user_id:any) {
    // const body = {
    //   phone_number, password : otp,
    // };
    return this.http.get(this.api_url + 'user/'+user_id+'/toggle-admin');

  }

  setActivityAvailability(availability_id:any , day:string , available : boolean) {
    // const body = {
    //   phone_number, password : otp,
    // };
    const body = {
      day,
      available,
    };
    return this.http.put(this.api_url + 'availabilities/'+availability_id+'/scheduled-days', body);

  }

  updateConfigurations(company_id : any , configurations : any) {
    // const body = {
    //   phone_number, password : otp,
    // };
   
    return this.http.put(this.api_url + 'config/'+company_id, configurations);

  }

  updateVoucherConfigurations(company_id : any , configurations : any) {
    // const body = {
    //   phone_number, password : otp,
    // };
   
    return this.http.put(this.api_url + 'config/'+company_id+'/voucher_configurations', configurations);

  }

  updateWidgetCompanyInfo(image : any , text : any , company_id : any ) {
    const body = {
      widget_company_image : image , 
      widget_company_text : text,
    };
   
    return this.http.put(this.api_url + 'config/'+company_id+'/widget-company-info', body);

  }

  updateNames(names : any , activity_id : any) {
    // const body = {
    //   phone_number, password : otp,
    // };
   
    return this.http.put(this.api_url + 'activities/'+activity_id, names);

  }

  updateSession( activity_id : any , session_id : any , session : any) {
    // const body = {
    //   phone_number, password : otp,
    // };
   
    return this.http.put(this.api_url + 'activities/'+activity_id+'/session/'+session_id, session);

  }

  deleteSession( activity_id : any , session_id : any ) {
    // const body = {
    //   phone_number, password : otp,
    // };
   
    return this.http.delete(this.api_url + 'activities/'+activity_id+'/session/'+session_id);

  }

  saveAsProduction(quantity: number) {

    const body = {
      item_name: "FACE MASK",
      quantity,
    };
    return this.http.post(this.api_url + 'save_new_production', body);

  }


  getAllRestaurants() {
    // const body = {
    //   phone_number, password : otp,
    // };
    return this.http.get(this.api_url + 'restaurants/all');

  }
  getRestaurantLocations(res_id:number) {
    // const body = {
    //   phone_number, password : otp,
    // };
    return this.http.get(this.api_url + 'restaurants/'+res_id+'/locations');

  }

  getRestaurantLocationCategories(res_id:number , loc_id:number) {
    // const body = {
    //   phone_number, password : otp,
    // };
    return this.http.get(this.api_url + 'categories/location/'+loc_id+'/restaurant/'+res_id);

  }

  getCategoryItems(category_id:number ) {
    // const body = {
    //   phone_number, password : otp,
    // };
    return this.http.get(this.api_url + 'items/category/'+category_id);

  }

  getUserInfo() {
    // const body = {
    //   phone_number, password : otp,
    // };
    return this.http.get(this.api_url + 'user');

  }

  getProductionDashboardInfo() {
    // const body = {
    //   phone_number, password : otp,
    // };
    return this.http.get(this.api_url + 'get_prod_info');

  }

  getWarehouseDashboardInfo() {
    // const body = {
    //   phone_number, password : otp,
    // };
    return this.http.get(this.api_url + 'get_warehouse_info');

  }

  getDashboardInfo() {
    // const body = {
    //   phone_number, password : otp,
    // };
    return this.http.get(this.api_url + 'dashboard/info');

  }

  setCurrency(currency_id : any , company_id : any) {
    const body = {
      currency_id ,
    };
    return this.http.put(this.api_url + 'config/'+company_id+'/currency', body);

  }

  getSalesChartInfo() {
    // const body = {
    //   phone_number, password : otp,
    // };
    return this.http.get(this.api_url + 'get_sales_chart_info');

  }
  getProductionChartInfo() {
    // const body = {
    //   phone_number, password : otp,
    // };
    return this.http.get(this.api_url + 'get_production_chart_info');

  }

  getAdminInfo() {
    // const body = {
    //   phone_number, password : otp,
    // };
    return this.http.get(this.api_url + 'get_admin_info');

  }

  markBatchAsReceived(batch_number: string) {
    const body = {
      batch_number,
    };
    return this.http.post(this.api_url + 'mark_as_received', body);

  }

  recordNewSale(batch_number: string, selling_price: number, customer: string) {
    const body = {
      batch_number,
      selling_price,
      customer
    };
    return this.http.post(this.api_url + 'save_new_sale', body);
  }

  toggleMainAccess(id: number) {

    const body = {
      user_id: id,
    };
    return this.http.post(this.api_url + 'toggle_main_access', body);
  }

  toggleProdAccess(id: number) {
    const body = {
      user_id: id,
    };
    return this.http.post(this.api_url + 'toggle_prod_access', body);
  }

  toggleWarehouseAccess(id: number) {
    const body = {
      user_id: id,
    };
    return this.http.post(this.api_url + 'toggle_warehouse_access', body);
  }

  toggleAdminAccess(id: number) {
    const body = {
      user_id: id,
    };
    return this.http.post(this.api_url + 'toggle_admin_access', body);
  }


  addNewSingularSeasonalPricingRange(activity_id:number ,date_range:string , pricing : any){

    const body =  {
      pricing_type : 2,
      seasonal_type : 1,
      date_range ,
      base_price : pricing
  }
    return this.http.post(this.api_url + 'pricings/activity/'+activity_id, body);
  }

  addNewSingularSeasonalPricingDate(activity_id:number ,date:string , pricing : any){

    const body =  {
      pricing_type : 2,
      seasonal_type : 2,
      individual_date : date ,
      base_price : pricing
  }
    return this.http.post(this.api_url + 'pricings/activity/'+activity_id, body);
  }

  addNewStandardSeasonalPricingDate(activity_id:number ,pricing : any){

    return this.http.post(this.api_url + 'activities/'+activity_id+'/seasonal-price/date', pricing);
  }
  addNewStandardSeasonalPricingRange(activity_id:number ,pricing : any){

    return this.http.post(this.api_url + 'activities/'+activity_id+'/seasonal-price/range', pricing);
  }

  addNewSession(activity_id:number, session : any){

    return this.http.post(this.api_url + 'activities/'+activity_id+'/session', session);
  }

  deletePricing(pricing_id:number){
  
    return this.http.delete(this.api_url + 'pricings/'+pricing_id);
  }
  deleteSeasonalActivityPricing(activity_id:number, pricing_id:number){
  
    return this.http.delete(this.api_url + 'activities/'+activity_id+'/seasonal-price/'+ pricing_id);
  }
  deletePackage(package_id:number ,  activity_id:number){
  
    return this.http.delete(this.api_url + 'activities/'+activity_id + '/packages/'+package_id);
  }

  updateActivityCapacity(activity_id:number , activity : any){
    const body =  activity;
    return this.http.put(this.api_url + 'activities/'+activity_id+'/capacity', body);
  }

  updateStandardPricing(pricing_id:number , pricing : any){
    const body =  {
      pricing
    }
    return this.http.put(this.api_url + 'pricings/'+pricing_id+'/singular-standard-pricing', body);
  }
  updateAdultPricing(pricing_id:number , pricing : any){
    const body =  {
      pricing
    }
    return this.http.put(this.api_url + 'pricings/'+pricing_id+'/singular-adult-pricing', body);
  }
  updateChildPricing(pricing_id:number , pricing : any){
    const body =  {
      pricing
    }
    return this.http.put(this.api_url + 'pricings/'+pricing_id+'/singular-child-pricing', body);
  }
  updateInfantPricing(pricing_id:number , pricing : any){
    const body =  {
      pricing
    }
    return this.http.put(this.api_url + 'pricings/'+pricing_id+'/singular-infant-pricing', body);
  }
  
  
  updateSingularSeasonalRangePricing(pricing_id:number , pricing : any){
    const body =  {
      pricing
    }
    return this.http.put(this.api_url + 'pricings/'+pricing_id+'/singular-seasonal-range-pricing', body);
  }

  updateSingularSeasonalDatePricing(pricing_id:number , pricing : any){
    const body =  {
      pricing
    }
    return this.http.put(this.api_url + 'pricings/'+pricing_id+'/singular-seasonal-date-pricing', body);
  }

  addNewEnhancement(activity_id:number ,name:string , base_price : any){

    const body =  {
      name ,
      base_price
  }
    return this.http.post(this.api_url + 'enhancements/activity/'+activity_id, body);
  }

  addNewInclusion(activity_id:number ,name:string , details_url:string){

    const body =  {
      name ,
      details_url
    }
    return this.http.post(this.api_url + 'activities/'+activity_id+'/inclusion', body);
  }

  addNewPackage(activity_id:number ,name:string , price:number){

    const body =  {
          name: name,
          max_attendees: 1,
          min_adults: 1,
          max_adults: 10,
          min_children: 1,
          max_children: 10,
          min_infants: 1,
          max_infants: 10,
          min_capacity: 1,
          max_capacity: 10,
          description: "",
          pricings: [
            {
                pricing_type: 1,
                seasonal_type: 1,
                date_range: "",
                individual_dates: "",
                elapsed_days_range: "",
                number_of_days_booked: "",
                base_price: {
                  "1": price
              }
            }]
    }
    return this.http.post(this.api_url + 'activities/'+activity_id+'/packages', body);
  }

  addNewPackageDatePricing(package_id:number , base_price:number , individual_date:string ){

    const body =  {
      pricing_type : 2,
      seasonal_type : 2,
      individual_date ,
      base_price : {
          "1": base_price
      }
    }
    return this.http.post(this.api_url + 'pricings/package/'+package_id , body);
  }
  addNewPackageRangePricing(package_id:number , base_price:number , fr_date:string , to_date:string ){

    const body =  {
      pricing_type : 2,
      seasonal_type : 1,
      date_range : fr_date+" ~ "+to_date,
      base_price : {
          "1": base_price
      }
    }
    return this.http.post(this.api_url + 'pricings/package/'+package_id , body);
  }

  getActivityEnhancements(activity_id:number){
    return this.http.get(this.api_url + 'enhancements/'+activity_id);

  }

  getActivityPackages(activity_id:number){
    return this.http.get(this.api_url + 'activities/'+activity_id+'/packages');

  }

  getCIPLoungePackages(){
    return this.http.get(this.api_url + 'activities/10203/packages');

  }

  updateActivityEnhancement(enhancement:any){

    return this.http.put(this.api_url + 'enhancements/'+enhancement.id , enhancement);

  }
  updatePackagePricing(pricing_id:any , pricing:any){

    return this.http.put(this.api_url + 'pricings/package/'+pricing_id , pricing);

  }
  updatePackage(pack:any){

    return this.http.put(this.api_url + 'packages/'+pack.id , pack);

  }
  deletePackagePricing(pricing_id:any ){

    return this.http.delete(this.api_url + 'pricings/package/'+pricing_id );

  }

  deleteActivityEnhancement(enhancement:any){

    return this.http.delete(this.api_url + 'enhancements/'+enhancement.id);

  }

  updateActivityInclusion(inclusion:any){

    return this.http.put(this.api_url + 'inclusions/'+inclusion.id , inclusion);

  }
  deleteActivityInclusion(inclusion:any){

    return this.http.delete(this.api_url + 'inclusions/'+inclusion.id);

  }

  deleteAvailability(availability_id : any){
    return this.http.delete(this.api_url + 'availabilities/'+availability_id);
  }
  addNewAvailabilityRange(availability_id : any, range:string){
    const body = {
      availability_type : 2,
      date_range : range
  };
    return this.http.post(this.api_url + 'availabilities/activity/'+availability_id, body);
  }
  addNewAvailabilityDate(availability_id : any, date:string){
    const body = {
      availability_type : 3,
      individual_dates : date
  };
    return this.http.post(this.api_url + 'availabilities/activity/'+availability_id, body);
  }
}
