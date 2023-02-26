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
  dmCode: string;
  dmPasswords: {password: string, confirmPassword: string, assignDM: boolean} = {
    password: "",
    confirmPassword: "",
    assignDM: false
  };
  dmLoggedIn: boolean;

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
          this.dmCode = this.campaignLoader.dmCode;
          this.dmLoggedIn = this.campaignLoader.dmLoggedIn;
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

  toggleDmModal(){
    this.dmPasswords.assignDM = this.dmPasswords.assignDM ? false : true;
  }

  validateDMPasswords(): boolean{
    if (this.dmPasswords.password !== this.dmPasswords.confirmPassword){
      return true;
    }
    if (this.dmPasswords.password.length < 6 && this.dmPasswords.confirmPassword.length < 6){
      return true;
    }
    return false;
  }

  setDMPassword(){
    this.http.updateCampaign(this.campaignLoader.campaignCode, this.campaignLoader.campaignName, JSON.stringify(this.campaignLoader.players), btoa(this.dmPasswords.password))
      .subscribe(
      (res) => {
        this.campaignLoader.dmCode = btoa(this.dmPasswords.password);
        this.dmCode = btoa(this.dmPasswords.password);
        this.campaignLoader.dmLoggedIn = false;
        this.dmLoggedIn = false;
        
        if (res.status === 200){
          this.dmPasswords = {
            password: "",
            confirmPassword: "",
            assignDM: false
          };
          this.toastr.success("You have successfully set up DM access!");
        }
      },
      (error) => {
        console.log(error);
        this.toastr.error("There was a problem communicating to the server, please try again later...");
      }
    );
  }

  validateDM(){
    if (this.dmPasswords.password === atob(this.campaignLoader.dmCode)){
      this.dmPasswords.assignDM = false;
      this.campaignLoader.dmLoggedIn = true;
      this.dmLoggedIn = true;
    }
  }
}
