interface Zutat {
    name: string
    type: string | null
    amount: string | null
}

interface RezeptStep {
    step_id: number
    text: string
}

interface CompactRecipeViewProps {
    recipe: {
        id: number
        name: string
        description: string | null
        header_img: string | null
        rating?: number | null
        creator: string
        zutaten: Zutat[]
        steps: RezeptStep[]
    }
}
