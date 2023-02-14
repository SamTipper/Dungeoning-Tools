import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  existingCampaignForm: FormGroup;

  constructor(
    private router: Router
  ) { }
  
  ngOnInit(){
    this.existingCampaignForm = new FormGroup({
      'campCode': new FormControl(null, [Validators.required])
    })
  }

  onSubmit(){
    if (this.existingCampaignForm.value.campCode){
      // User enters a campaign code
    } else {
      // User wants to create a campaign
      this.router.navigate(['create-campaign']);
    }
  }
}
