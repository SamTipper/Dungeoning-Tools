/**
 * Main template for how a player within a campaign should be structured.
 * The "name" key is required, the other keys aren't.
 */
export interface Player {

    name:          string,
    class?:        string,
    level?:        number,
    stats?: {
        strength:     {score: number, modifer: number, save: number, proficiency: boolean, expertise: boolean},
        dexterity:    {score: number, modifer: number, save: number, proficiency: boolean, expertise: boolean},
        constitution: {score: number, modifer: number, save: number, proficiency: boolean, expertise: boolean},
        intelligence: {score: number, modifer: number, save: number, proficiency: boolean, expertise: boolean},
        wisdom:       {score: number, modifer: number, save: number, proficiency: boolean, expertise: boolean},
        charisma:     {score: number, modifer: number, save: number, proficiency: boolean, expertise: boolean},
    },
    skills?: {
        Acrobatics:        {score: number, proficiency: boolean, expertise: boolean},
        "Animal Handling": {score: number, proficiency: boolean, expertise: boolean},
        Arcana:            {score: number, proficiency: boolean, expertise: boolean},
        Athletics:         {score: number, proficiency: boolean, expertise: boolean},
        Deception:         {score: number, proficiency: boolean, expertise: boolean},
        History:           {score: number, proficiency: boolean, expertise: boolean},
        Insight:           {score: number, proficiency: boolean, expertise: boolean},
        Intimidation:      {score: number, proficiency: boolean, expertise: boolean},
        Investigation:     {score: number, proficiency: boolean, expertise: boolean},
        Medicine:          {score: number, proficiency: boolean, expertise: boolean},
        Nature:            {score: number, proficiency: boolean, expertise: boolean},
        Perception:        {score: number, proficiency: boolean, expertise: boolean},
        Performance:       {score: number, proficiency: boolean, expertise: boolean},
        Persuasion:        {score: number, proficiency: boolean, expertise: boolean},
        Religion:          {score: number, proficiency: boolean, expertise: boolean},
        "Sleight of Hand": {score: number, proficiency: boolean, expertise: boolean},
        Stealth:           {score: number, proficiency: boolean, expertise: boolean},
        Survival:          {score: number, proficiency: boolean, expertise: boolean}
    }

}
