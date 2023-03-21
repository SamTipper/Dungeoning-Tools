export interface Monster {
    name: string
    initiative?: number
    monster: boolean
    dead?: boolean

    conditions?: {
        blinded:       boolean,
        charmed:       boolean,
        deafened:      boolean,
        frightened:    boolean,
        grappled:      boolean,
        incapacitated: boolean,
        invisible:     boolean,
        paralyzed:     boolean,
        petrified:     boolean,
        poisoned:      boolean,
        prone:         boolean,
        restrained:    boolean,
        stunned:       boolean,
        unconscious:   boolean,
        exhaustion:    number
    }

}
