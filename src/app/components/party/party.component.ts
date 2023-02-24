import { Component, OnInit } from '@angular/core';
import { CampaignLoaderService } from 'src/app/services/campaign-loader.service';
import { Player } from 'src/app/interfaces/player';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.css']
})
export class PartyComponent implements OnInit{
  players: Player[];
  changes: object = {
    level:         false,
    abilityScore:  false,
    skills:        false,
    disableButton: true
  };

  constructor(
    private campaign: CampaignLoaderService,
    private playerService: PlayerService
  ) { }

  ngOnInit(){
    this.players = this.campaign.players;
  }

  onPlayerChange(change: string){
    this.changes[change] = true;
    this.changes['disableButton'] = false;
  }

}
