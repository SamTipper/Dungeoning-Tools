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
  };

  statModifiers: object = { // Any stat that is below or equal a certain key is the character's modifier
    1: -5,
    3: -4,
    5: -3,
    7: -2,
    9: -1,
    11: 0,
    13: 1,
    15: 2,
    17: 3,
    19: 4,
    21: 5,
    23: 6,
    25: 7,
    27: 8,
    29: 9,
    30: 10
  };

  levelProficiency: object = { // Any level that is below or equal a certain key is the character's proficiency
    4: 2,
    8: 3,
    12: 4,
    16: 5,
    20: 6
  };

  constructor(
    campaign: CampaignLoaderService
  ) { }

  setInitialStats(player: Player): Player{
    // Stats
    player.health = 0;
    player.proficiency = this.findClosestProficiency(player.level);

    // Ability Scores
    player.stats = {
      strength:     {score: 0},
      dexterity:    {score: 0},
      constitution: {score: 0},
      intelligence: {score: 0},
      wisdom:       {score: 0},
      charisma:     {score: 0},
    }
    return player;
  }

  findClosestProficiency(level): number{
    let closest = Object.keys(this.levelProficiency).reduce((prev: any, curr: any) => {
      return (Math.abs(curr - level) < Math.abs(prev - level) ? curr : prev);
    });
    return this.levelProficiency[+closest];
  }

  findClosestStatMod(player: Player, stat: string): number{  
    let closest = Object.keys(this.statModifiers).reduce((prev: any, curr: any) => {
      return (Math.abs(curr - player.stats[stat].score) <= Math.abs(prev - player.stats[stat].score) ? curr : prev);
    });
    return this.statModifiers[+closest];
  }

  generatePlayerSkills(player: Player){

    if (!player.initiative){
      player.initiative = player.stats.dexterity.modifier
    }

    if (!player.skills){
      player.skills = {
        acrobatics:        {score: player.stats.dexterity.modifier, proficiency: false, expertise: false},
        "animal handling": {score: player.stats.wisdom.modifier, proficiency: false, expertise: false},
        arcana:            {score: player.stats.intelligence.modifier, proficiency: false, expertise: false},
        athletics:         {score: player.stats.strength.modifier, proficiency: false, expertise: false},
        deception:         {score: player.stats.charisma.modifier, proficiency: false, expertise: false},
        history:           {score: player.stats.intelligence.modifier, proficiency: false, expertise: false},
        insight:           {score: player.stats.wisdom.modifier, proficiency: false, expertise: false},
        intimidation:      {score: player.stats.charisma.modifier, proficiency: false, expertise: false},
        investigation:     {score: player.stats.intelligence.modifier, proficiency: false, expertise: false},
        medicine:          {score: player.stats.wisdom.modifier, proficiency: false, expertise: false},
        nature:            {score: player.stats.intelligence.modifier, proficiency: false, expertise: false},
        perception:        {score: player.stats.wisdom.modifier, proficiency: false, expertise: false},
        performance:       {score: player.stats.charisma.modifier, proficiency: false, expertise: false},
        persuasion:        {score: player.stats.charisma.modifier, proficiency: false, expertise: false},
        religion:          {score: player.stats.intelligence.modifier, proficiency: false, expertise: false},
        "sleight of hand": {score: player.stats.dexterity.modifier, proficiency: false, expertise: false},
        stealth:           {score: player.stats.dexterity.modifier, proficiency: false, expertise: false},
        survival:          {score: player.stats.wisdom.modifier, proficiency: false, expertise: false}
      };
    }
  }

}
