import { Component, OnInit } from '@angular/core';
import { CampaignLoaderService } from 'src/app/services/campaign-loader.service';
import { Player } from 'src/app/interfaces/player';
import { PlayerService } from 'src/app/services/player.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.css']
})
export class PartyComponent implements OnInit{
  players: Player[];
  changes: object = {
    abilityScore:  false,
    disableButton: true
  };

  constructor(
    private campaign: CampaignLoaderService,
    private playerService: PlayerService,
    private http: HttpService
  ) { }

  ngOnInit(){
    this.players = this.campaign.players;
  }

  onPlayerChange(change: string){
    this.changes[change] = true;
    this.changes['disableButton'] = false;
  }

  onSaveChanges(){
    this.changes['disableButton'] = true;
    this.players.forEach((player: Player) => {
      if (this.changes['abilityScore']){
        this.playerService.generateAbilityScoreModifiers(player);
        this.playerService.generatePlayerSkills(player);
        this.playerService.generatePlayerSaves(player);
      }
    });

    this.changes['abilityScore'] = false;
    this.changes['skills'] = false;

    this.campaign.players = this.players;
    this.http.updateCampaign(this.campaign.campaignCode, this.campaign.campaignName, JSON.stringify(this.campaign.players)).subscribe(
      (res) => {
      }
    )
  }

  applyProfOrExp(player: Player, skill: string, proficiency: boolean, expertise: boolean){
    this.playerService.applyProfOrExp(player, skill, proficiency, expertise);
    console.log(player.skills[skill].score, player.skills[skill].proficiency, player.skills[skill].expertise);
    this.changes['disableButton'] = false;
  }


}
