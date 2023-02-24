import { Injectable } from '@angular/core';
import { Player } from '../interfaces/player';

@Injectable({
  providedIn: 'root'
})
export class CampaignLoaderService {
  campaignData: object;
  campaignName: string;
  players: Player[] = [];

  constructor() { }

  /**
   * 
   * @param campaignData All data received from the server after the user has entered their campaign code
   */
  loadCampaign(campaignData: object, campaignCode: string){
    this.campaignData = campaignData[campaignCode];
    this.campaignName = campaignData[campaignCode]['name'];
    
    this.campaignData['players'].forEach((player: string) => {
      this.players.push(
        <Player>{
          // General stats
          name:         player['name'],
          class:        player['class'],
          health:       player['health'],
          level:        player['level'],
          proficiency:  player['proficiency'],

          // Ability Scores
          stats: {
            strength:     {score: 0},
            dexterity:    {score: 0},
            constitution: {score: 0},
            intelligence: {score: 0},
            wisdom:       {score: 0},
            charisma:     {score: 0},
          }
        }
      );
    });
    console.log(this.players);
  }

  /**
   * 
   * @returns All loaded campaign data.
   */
  getCampaignData(){
    return {
      campaignName: this.campaignName,
      players: this.players
    };
  }

}
