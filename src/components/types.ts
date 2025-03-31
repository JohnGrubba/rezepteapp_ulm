import { Rezept, RezeptStep, Zutat } from "@prisma/client"

export type RezeptJoined = Rezept & {
    zutaten: Zutat[]
    steps: RezeptStep[]
}