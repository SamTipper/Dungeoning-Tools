import { Injectable } from '@angular/core';
import { Player } from '../interfaces/player';
import { CampaignLoaderService } from './campaign-loader.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  saveProficiencies: object = {
    Artificer: ['Constitution', 'Intelligence'],
    Bararian:  ['Strength', 'Constitution'],
    Bard:      ['Dexterity', 'Charisma'],
    Cleric:    ['Wisdom', 'Charisma'],
    Druid:     ['Intelligence', 'Wisdom'],
    Fighter:   ['Strength', 'Constitution'],
    Monk:      ['Strength', 'Dexterity'],
    Paladin:   ['Wisdom', 'Charisma'],
    Ranger:    ['Strength', 'Dexterity'],
    Rogue:     ['Dexterity', 'Intelligence'],
    Sorcerer:  ['Constitution', 'Charisma'],
    Warlock:   ['Wisdom', 'Charisma'],
    Wizard:    ['Intelligence', 'Wisdom']
  }

  constructor(
    campaign: CampaignLoaderService
  ) { }

  generatePlayerSkills(player: Player){
    if (player.stats && player.level){
      if (!player.skills){
        player.skills = {
          Acrobatics:        {score: player.stats.dexterity.modifer, proficiency: false, expertise: false},
          "Animal Handling": {score: player.stats.wisdom.modifer, proficiency: false, expertise: false},
          Arcana:            {score: player.stats.intelligence.modifer, proficiency: false, expertise: false},
          Athletics:         {score: player.stats.strength.modifer, proficiency: false, expertise: false},
          Deception:         {score: player.stats.charisma.modifer, proficiency: false, expertise: false},
          History:           {score: player.stats.intelligence.modifer, proficiency: false, expertise: false},
          Insight:           {score: player.stats.wisdom.modifer, proficiency: false, expertise: false},
          Intimidation:      {score: player.stats.charisma.modifer, proficiency: false, expertise: false},
          Investigation:     {score: player.stats.intelligence.modifer, proficiency: false, expertise: false},
          Medicine:          {score: player.stats.wisdom.modifer, proficiency: false, expertise: false},
          Nature:            {score: player.stats.intelligence.modifer, proficiency: false, expertise: false},
          Perception:        {score: player.stats.wisdom.modifer, proficiency: false, expertise: false},
          Performance:       {score: player.stats.charisma.modifer, proficiency: false, expertise: false},
          Persuasion:        {score: player.stats.charisma.modifer, proficiency: false, expertise: false},
          Religion:          {score: player.stats.intelligence.modifer, proficiency: false, expertise: false},
          "Sleight of Hand": {score: player.stats.dexterity.modifer, proficiency: false, expertise: false},
          Stealth:           {score: player.stats.dexterity.modifer, proficiency: false, expertise: false},
          Survival:          {score: player.stats.wisdom.modifer, proficiency: false, expertise: false}
        }
      }
    }
  }
}
