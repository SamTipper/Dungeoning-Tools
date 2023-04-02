import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Player } from 'src/app/interfaces/player';
import { CampaignLoaderService } from 'src/app/services/campaign-loader.service';
import { HttpService } from 'src/app/services/http.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{
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
  players: Player [];
  subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private http: HttpService,
    private campaignLoader: CampaignLoaderService,
    private toastr: ToastrService,
    private playerService: PlayerService
  ) { }
  
  ngOnInit(){
    if (this.campaignLoader.campaignName){
      this.campaignLoaded = true;
      this.dmCode = this.campaignLoader.dmCode;
      this.dmLoggedIn = this.campaignLoader.dmLoggedIn;
      this.players = this.campaignLoader.players;
    } else {
      this.existingCampaignForm = new FormGroup({
        'campCode': new FormControl(null, [Validators.required])
      });
    }
  }

  ngOnDestroy(){
    for (const subscription of this.subscriptions){
      subscription.unsubscribe();
    }
  }

  getCampaignAndLoad(campaignCode: string){
    this.toastr.info("Loading campaign, please wait...");
    this.subscriptions.push(this.http.getCampaign(campaignCode).subscribe(
      (res) => {
        if (res.status === 200){
          this.campaignLoader.loadCampaign(JSON.parse(res.body), campaignCode);
          this.dmCode = this.campaignLoader.dmCode;
          this.dmLoggedIn = this.campaignLoader.dmLoggedIn;
          this.players = this.campaignLoader.players;
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
    ));
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
    if (this.dmPasswords.password.length > 15 && this.dmPasswords.confirmPassword.length > 15){
      return true;
    }
    if (this.dmPasswords.password.length < 6 && this.dmPasswords.confirmPassword.length < 6){
      return true;
    }
    return false;
  }

  setDMPassword(){
    let encryptedPassword = this.dmPasswords.password;
    for (let i = 0; i < 15; i++){
      encryptedPassword = btoa(encryptedPassword);
    }

    this.subscriptions.push(
      this.http.updateCampaign(this.campaignLoader.campaignCode, this.campaignLoader.campaignName, JSON.stringify(this.campaignLoader.players), encryptedPassword)
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
      )
    );
  }

  validateDM(){
    let decryptedPassword = this.campaignLoader.dmCode;
    for (let i = 0; i < 15; i++){
      decryptedPassword = atob(decryptedPassword);
    }

    if (this.dmPasswords.password === decryptedPassword){
      this.dmPasswords.assignDM = false;
      this.campaignLoader.dmLoggedIn = true;
      this.dmLoggedIn = true;
      this.toastr.success("You have successfully logged in, welcome back!");
    }
  }

  findInsights(player: Player){
    let insights = {}

    for (const [condition, value] of Object.entries(player.conditions)){
      if (value){
        if (!insights['conditions']){
          insights['conditions'] = [];
        }

        insights['conditions'].push(this.playerService.title(condition));
      }
    }

    if (player.dead){
      insights['dead'] = "This character is dead.";
    }

    return insights;
  }

}
