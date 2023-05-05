import { Component, OnInit } from '@angular/core';
import Stepper from 'bs-stepper';


@Component({
  selector: 'app-activity-type-selector',
  templateUrl: './activity-type-selector.component.html',
  styleUrls: ['./activity-type-selector.component.css']
})
export class ActivityTypeSelectorComponent implements OnInit {

  pax_dependant : any = true;
  age_dependant : any = true;
  packages_and_sessions : any = "none";


  constructor() { }

  ngOnInit(): void {
    this.stepper = new Stepper(document.querySelector('#activity-type-selector') as Element, {
      linear: true,
      animation: true
    });
  }

  private stepper!: Stepper;

  choosePaxDependant(event:any){
    console.log(this.pax_dependant);
  }
  chooseAgeDependant(event:any){
    console.log(this.age_dependant);
  }
  choosePackageAndSessionsDependant(event:any){
    console.log(this.packages_and_sessions);
  }

  next() {
    this.stepper.next();
  }
  previous() {
    this.stepper.previous();
  }

  pax_next() {
    
    if(!this.pax_dependant){
      this.stepper.to(3);
    }else{
      this.stepper.next();
    }
    
  }

  onSubmit() {
    return false;
  }

}
