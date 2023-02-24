import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CampaignLoaderService } from 'src/app/services/campaign-loader.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  existingCampaignForm: FormGroup;

  constructor(
    private router: Router,
    private http: HttpService,
    private campaignLoader: CampaignLoaderService
  ) { }
  
  ngOnInit(){
    this.existingCampaignForm = new FormGroup({
      'campCode': new FormControl(null, [Validators.required])
    })
  }

  getCampaignAndLoad(campaignCode: string){
    this.http.getCampaign(campaignCode).subscribe(
      (res) => {
        if (res.status === 200){
          this.campaignLoader.loadCampaign(JSON.parse(res.body), campaignCode);
        }
      }
    );
  }

  onSubmit(){
    if (this.existingCampaignForm.value.campCode){
      // User enters a campaign code
      this.getCampaignAndLoad(this.existingCampaignForm.value.campCode);
    } else {
      // User wants to create a campaign
      this.router.navigate(['create-campaign']);
    }
  }
}
