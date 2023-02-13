import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  existingCampaignForm: FormGroup;
  
  ngOnInit(){
    this.existingCampaignForm = new FormGroup({
      'campCode': new FormControl(null, [Validators.required])
    })
  }
}
