import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-activity-availability',
  templateUrl: './activity-availability.component.html',
  styleUrls: ['./activity-availability.component.css']
})
export class ActivityAvailabilityComponent implements OnInit {

  @Input()
  activity!: any;
  allowed = [
    'Windstorm',
    'Bombasto',
    'Magneta',
    'Tornado'
  ];
 
  disallowed = ['Mr. O', 'Tomato'];
  constructor() { }

  ngOnInit(): void {
  }

}
