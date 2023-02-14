/**
 * Main template for how a player within a campaign should be structured.
 * The "name" key is required, the other keys aren't.
 */
export interface Player {

    name:          string,
    strength?:     number,
    dexterity?:    number,
    constitution?: number,
    intelligence?: number,
    wisdom?:       number,
    charisma?:     number

}
