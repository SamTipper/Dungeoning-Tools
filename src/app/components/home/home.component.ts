import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CampaignLoaderService } from 'src/app/services/campaign-loader.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  existingCampaignForm: FormGroup;
  disableForm: boolean = false;
  campaignLoaded: boolean = false;

  constructor(
    private router: Router,
    private http: HttpService,
    private campaignLoader: CampaignLoaderService,
    private toastr: ToastrService,
  ) { }
  
  ngOnInit(){
    if (this.campaignLoader.campaignName){
      this.campaignLoaded = true;
    } else {
      this.existingCampaignForm = new FormGroup({
        'campCode': new FormControl(null, [Validators.required])
      });
    }
  }

  getCampaignAndLoad(campaignCode: string){
    this.toastr.info("Loading campaign, please wait...");
    this.http.getCampaign(campaignCode).subscribe(
      (res) => {
        if (res.status === 200){
          this.campaignLoader.loadCampaign(JSON.parse(res.body), campaignCode);
          this.toastr.success(`${this.campaignLoader.campaignName} successfully loaded!`);
          this.disableForm = false;
          this.campaignLoaded = true;
        }
      },
      (error) => {
        console.log(error);
        this.toastr.error("Campaign failed to load, please try again later.");
        this.disableForm = false;
      } 
    );
  }

  onSubmit(){
    this.disableForm = true;
    if (this.existingCampaignForm.value.campCode){
      // User enters a campaign code
      if (this.existingCampaignForm.value.campCode !== this.campaignLoader.campaignCode){
        this.getCampaignAndLoad(this.existingCampaignForm.value.campCode);
      } else {
        this.toastr.error("The campaign you are trying to load is already loaded");
        this.disableForm = false;
      }
      this.existingCampaignForm.reset();
    } else {
      // User wants to create a campaign
      this.router.navigate(['create-campaign']);
    }
  }
}
