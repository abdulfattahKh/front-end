import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  @Input() type:string;
  @Input() settings;

  constructor() { }

  ngOnInit() {
    if(this.type) {

    }
  }

}
