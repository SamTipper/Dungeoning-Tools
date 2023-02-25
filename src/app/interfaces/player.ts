/**
 * Main template for how a player within a campaign should be structured.
 * The "name" key is required, the other keys aren't.
 */
export interface Player {

    name:          string,
    class?:        string,
    level?:        number,
    race?:         string,
    health?:       number,
    initiative?:   number,
    speed?:        number,
    ac?:           number,
    proficiency?:  number,
    hitDie?:       number,

    stats?: {
        strength:     {score: number, modifier?: number, save?: number, proficiency?: boolean},
        dexterity:    {score: number, modifier?: number, save?: number, proficiency?: boolean},
        constitution: {score: number, modifier?: number, save?: number, proficiency?: boolean},
        intelligence: {score: number, modifier?: number, save?: number, proficiency?: boolean},
        wisdom:       {score: number, modifier?: number, save?: number, proficiency?: boolean},
        charisma:     {score: number, modifier?: number, save?: number, proficiency?: boolean}
    },
    skills?: {
        acrobatics:        {score: number, proficiency: boolean, expertise: boolean},
        "animal handling": {score: number, proficiency: boolean, expertise: boolean},
        arcana:            {score: number, proficiency: boolean, expertise: boolean},
        athletics:         {score: number, proficiency: boolean, expertise: boolean},
        deception:         {score: number, proficiency: boolean, expertise: boolean},
        history:           {score: number, proficiency: boolean, expertise: boolean},
        insight:           {score: number, proficiency: boolean, expertise: boolean},
        intimidation:      {score: number, proficiency: boolean, expertise: boolean},
        investigation:     {score: number, proficiency: boolean, expertise: boolean},
        medicine:          {score: number, proficiency: boolean, expertise: boolean},
        nature:            {score: number, proficiency: boolean, expertise: boolean},
        perception:        {score: number, proficiency: boolean, expertise: boolean},
        performance:       {score: number, proficiency: boolean, expertise: boolean},
        persuasion:        {score: number, proficiency: boolean, expertise: boolean},
        religion:          {score: number, proficiency: boolean, expertise: boolean},
        "sleight of hand": {score: number, proficiency: boolean, expertise: boolean},
        stealth:           {score: number, proficiency: boolean, expertise: boolean},
        survival:          {score: number, proficiency: boolean, expertise: boolean}
    }

}
