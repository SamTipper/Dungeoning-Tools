import { Injectable } from '@angular/core';
import { Player } from '../interfaces/player';
import { CampaignLoaderService } from './campaign-loader.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  saveProficiencies: object = {
    Artificer: ['constitution', 'intelligence'],
    Bararian:  ['strength', 'constitution'],
    Bard:      ['dexterity', 'charisma'],
    Cleric:    ['wisdom', 'charisma'],
    Druid:     ['intelligence', 'wisdom'],
    Fighter:   ['strength', 'constitution'],
    Monk:      ['strength', 'dexterity'],
    Paladin:   ['wisdom', 'charisma'],
    Ranger:    ['strength', 'dexterity'],
    Rogue:     ['dexterity', 'intelligence'],
    Sorcerer:  ['constitution', 'charisma'],
    Warlock:   ['wisdom', 'charisma'],
    Wizard:    ['intelligence', 'wisdom']
  };

  hitDie: object = {
    Artificer: 8,
    Bararian:  12,
    Bard:      8,
    Cleric:    8,
    Druid:     8,
    Fighter:   10,
    Monk:      8,
    Paladin:   10,
    Ranger:    10,
    Rogue:     8,
    Sorcerer:  6,
    Warlock:   8,
    Wizard:    6
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
  ) { }

  setInitialStats(player: Player): Player{
    // Stats
    player.health = 0;
    player.proficiency = this.findClosestProficiency(player.level);

    // Ability Scores
    player.stats = {
      strength:     {score: 10},
      dexterity:    {score: 10},
      constitution: {score: 10},
      intelligence: {score: 10},
      wisdom:       {score: 10},
      charisma:     {score: 10},
    }
    return player;
  }

  /**
   * 
   * @param words A string that returns with its first letter of each word capitilised
   * @returns A new string with its first letter of each word capitilised
   */
  title(words: string){
    const splitName: string[] = words.split(" ");
    let newWord: string = "";
    splitName.forEach(word => {
      newWord += `${word.charAt(0).toUpperCase() + word.substring(1)} `;
    });
    return newWord.trimEnd();
  }

  /**
   * 
   * @param player The player who needs their ability scores generating.
   * @description Generates the ability scores of a player. The player must have all main ability scores populated for the function to work
   */
  generateAbilityScoreModifiers(player: Player){
    player.stats.strength.modifier = player.stats.strength.score > 0 ?
     this.findClosestStatMod(player, "strength"): 0;
    
    player.stats.dexterity.modifier = player.stats.dexterity.score > 0 ?
     this.findClosestStatMod(player, "dexterity"): 0;

    player.stats.constitution.modifier = player.stats.constitution.score > 0 ?
     this.findClosestStatMod(player, "constitution"): 0;

    player.stats.intelligence.modifier = player.stats.intelligence.score > 0 ?
     this.findClosestStatMod(player, "intelligence"): 0;
    
    player.stats.wisdom.modifier = player.stats.wisdom.score > 0 ?
     this.findClosestStatMod(player, "wisdom"): 0;

    player.stats.charisma.modifier = player.stats.charisma.score > 0 ?
     this.findClosestStatMod(player, "charisma"): 0;
  }

  /** 
   * @description Generates stats initiative, speed, hit die, and sets a temporary value for AC, health and race.
   */
  generateGeneralStats(player: Player){
    player.initiative = player.initiative ? player.initiative : player.stats.dexterity.modifier;
    player.speed = player.speed ? player.speed : 0;
    player.ac = player.ac ? player.ac : 0;
    player.health = player.health ? player.health : 0;
    player.race = player.race ? player.race : "Race not set";
    player.hitDie = player.hitDie ? player.hitDie : this.hitDie[player.class];
  }

  findClosestProficiency(level: number): number{
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

  generatePlayerStats(player: Player){
    player.stats = {
      strength:     {score: 10, modifier: 0, save: 0, proficiency: this.saveProficiencies[player.class].includes('strength')     ? true : false},
      dexterity:    {score: 10, modifier: 0, save: 0, proficiency: this.saveProficiencies[player.class].includes('dexterity')    ? true : false},
      constitution: {score: 10, modifier: 0, save: 0, proficiency: this.saveProficiencies[player.class].includes('constitution') ? true : false},
      intelligence: {score: 10, modifier: 0, save: 0, proficiency: this.saveProficiencies[player.class].includes('intelligence') ? true : false},
      wisdom:       {score: 10, modifier: 0, save: 0, proficiency: this.saveProficiencies[player.class].includes('wisdom')       ? true : false},
      charisma:     {score: 10, modifier: 0, save: 0, proficiency: this.saveProficiencies[player.class].includes('charisma')     ? true : false}
    }
  }

  generatePlayerSkills(player: Player){
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

  generatePlayerConditions(player: Player){
    player.conditions = {
      blinded: false,
      charmed: false,
      deafened: false,
      frightened: false,
      grappled: false,
      incapacitated: false,
      invisible: false,
      paralyzed: false,
      petrified: false,
      poisoned: false,
      prone: false,
      restrained: false,
      stunned: false,
      unconscious: false,
      exhaustion: 0
    }
  }

  generatePlayerSaves(player: Player){
    for (let save of Object.keys(player.stats)){
      if (this.saveProficiencies[player.class].includes(save)){
        player.stats[save].proficiency = true;
        player.stats[save].save = player.stats[save].modifier + player.proficiency;
      } else {
        player.stats[save].proficiency = false;
        player.stats[save].save = player.stats[save].modifier;
      }
    }
  }
  
  applyProfOrExp(player: Player, skill: string, proficiency?: boolean, expertise?: boolean){
    if (proficiency){
      if (player.skills[skill].proficiency){
        player.skills[skill].score = player.skills[skill].score + player.proficiency;
      } else {
        player.skills[skill].score = player.skills[skill].score - player.proficiency;
      } 
    } else if (expertise){
      if (player.skills[skill].expertise){
        player.skills[skill].score = player.skills[skill].score + player.proficiency;
      } else {
        player.skills[skill].score = player.skills[skill].score - player.proficiency;
      } 
    }
  }

  filterExhaustion(player: Player): object{
    const allowed: string[] = [
      "blinded",
      "charmed",
      "deafened",
      "frightened",
      "grappled",
      "incapacitated",
      "invisible",
      "paralyzed",
      "petrified",
      "poisoned",
      "prone",
      "restrained",
      "stunned",
      "unconscious"
    ];

    const filtered = Object.keys(player.conditions)
    .filter(key => allowed.includes(key))
    .reduce((obj, key) => {
      obj[key] = player.conditions[key];
      return obj;
    }, {});

    return filtered;
  }
}
