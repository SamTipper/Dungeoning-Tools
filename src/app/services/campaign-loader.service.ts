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
      let stats:  object = {stats: {}};
      let skills: object = {skills: {}};

      // Ability Scores
      for (let stat of Object.keys(player['stats'])){
        stats['stats'][stat] = {
          score:       stat['score']           ? stat['score'] : undefined,
          modifier:    stat['modifier']        ? stat['modifier'] : undefined,
          save:        stat['save']            ? stat['save'] : undefined,
          proficiency: stat['sproficiencyave'] ? stat['proficiency'] : undefined,
        }
      }

      // Skills
      if (player['skills']){
        for (let skill of Object.keys(player['skills'])){
          skills['skills'][skill] = {
            score:       skill['score']       ? skill['score'] : undefined,
            proficiency: skill['proficiency'] ? skill['proficiency'] : undefined,
            expertise:   skill['expertise']   ? skill['expertise'] : undefined
          }
        }
      }

      this.players.push(
        <Player>{
          // General stats
          name:         player['name']        ? player['name']        : undefined,
          class:        player['class']       ? player['class']       : undefined,
          level:        player['level']       ? player['level']       : undefined,
          race:         player['race']        ? player['race']        : undefined,
          health:       player['health']      ? player['health']      : undefined,
          initiative:   player['initiative']  ? player['initiative']  : undefined,
          speed:        player['speed']       ? player['speed']       : undefined,
          ac:           player['ac']          ? player['ac']          : undefined,
          proficiency:  player['proficiency'] ? player['proficiency'] : undefined,

          stats: stats,

          skills: Object.keys(skills).length > 0 ? skills : undefined
        }
      );

    });
    console.log(this.campaignData['players']);
    
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
