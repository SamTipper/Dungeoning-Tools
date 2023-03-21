import { EventEmitter, Injectable, Output } from '@angular/core';
import { Player } from '../interfaces/player';
import { PlayerService } from './player.service';

@Injectable({
  providedIn: 'root'
})
export class CampaignLoaderService {
  campaignData: object;
  campaignName: string;
  campaignCode: string;
  dmCode: string;
  dmLoggedIn: boolean = false;
  players: Player[];

  @Output() campaignNameListener: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private playerService: PlayerService,
  ) { }

  /**
   * 
   * @param campaignData All data received from the server after the user has entered their campaign code
   */
  loadCampaign(campaignData: object, campaignCode: string){
    this.campaignData = campaignData[campaignCode];
    this.campaignName = campaignData[campaignCode]['name'];
    this.dmCode       = campaignData[campaignCode]['dmCode'];
    this.campaignCode = campaignCode;
    this.players = [];
    
    // Player loading
    this.campaignData['players'].forEach((player: string) => {
      let stats:  object = {};
      let skills: object = {};
      let conditions: object = {};

      // Ability Scores
      for (let stat of Object.keys(player['stats'])){
        stats[stat] = {
          score:       player['stats'][stat]['score']           ? player['stats'][stat]['score']       : 10,
          modifier:    player['stats'][stat]['modifier']        ? player['stats'][stat]['modifier']    : undefined,
          save:        player['stats'][stat]['save']            ? player['stats'][stat]['save']        : undefined,
          proficiency: player['stats'][stat]['proficiency']     ? player['stats'][stat]['proficiency'] : undefined
        }
      }

      // Skills
      if (player['skills']){
        for (let skill of Object.keys(player['skills'])){
          skills[skill] = {
            score:       !isNaN(player['skills'][skill]['score'])       ? player['skills'][skill]['score']       : undefined,
            proficiency: !isNaN(player['skills'][skill]['proficiency']) ? player['skills'][skill]['proficiency'] : undefined,
            expertise:   !isNaN(player['skills'][skill]['expertise'])   ? player['skills'][skill]['expertise']   : undefined
          }
        }
      }

      // Conditions
      if (player['conditions']){
        for (let condition of Object.keys(player['conditions'])){
          if (condition !== "exhaustion"){
            conditions[condition] = player['conditions'][condition] ? player['conditions'][condition] : false;
          } else {
            conditions[condition] = player['conditions'][condition] ? player['conditions'][condition] : 0;
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
          dead:         player['dead']        ? player['dead']        : undefined,

          stats: stats,

          skills: Object.keys(skills).length > 0 ? skills : undefined,

          conditions: Object.keys(conditions).length > 0 ? conditions : undefined
        }
      );
    });

    this.players.forEach((player: Player) => {
      this.playerService.generateAbilityScoreModifiers(player);
      this.playerService.generatePlayerSaves(player);
      this.playerService.generateGeneralStats(player);
      if (!player.skills){
        this.playerService.generatePlayerSkills(player);
      }
      if(!player.conditions){
        this.playerService.generatePlayerConditions(player);
      }
    });

    this.campaignNameListener.emit(this.campaignName);

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
