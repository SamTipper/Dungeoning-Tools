import { Component, OnInit } from '@angular/core';
import { CampaignLoaderService } from 'src/app/services/campaign-loader.service';
import { Player } from 'src/app/interfaces/player';

@Component({
  selector: 'app-initiative-tracker',
  templateUrl: './initiative-tracker.component.html',
  styleUrls: ['./initiative-tracker.component.css']
})
export class InitiativeTrackerComponent implements OnInit{
  players: Player[];

  constructor(
    private campaign: CampaignLoaderService 
  ) { }

  ngOnInit(){
    this.players = this.campaign.players;
  }
}
