"use client"
import { useState } from "react"
import Image from "next/image"
import { ChevronDown, ChevronUp, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { StarRating } from "./star-rating"

interface Zutat {
    name: string
    type?: string
    amount?: string
}

interface RezeptStep {
    step_id: number
    text: string
}

interface CompactRecipeViewProps {
    recipe: {
        id: number
        name: string
        description?: string
        header_img?: string
        rating?: number
        creator: string
        zutaten: Zutat[]
        steps: RezeptStep[]
    }
}

export function CompactRecipeView({ recipe }: CompactRecipeViewProps) {
    const [ingredientsOpen, setIngredientsOpen] = useState(false)
    const [stepsOpen, setStepsOpen] = useState(false)

    return (
        <Card className="w-full max-w-md overflow-hidden">
            {recipe.header_img && (
                <div className="relative h-48 w-full">
                    <Image src={recipe.header_img || "/placeholder.svg"} alt={recipe.name} layout="fill" objectFit="cover" />
                </div>
            )}
            <CardHeader>
                <CardTitle className="text-2xl font-bold">{recipe.name}</CardTitle>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-500">{recipe.creator}</span>
                    </div>
                    {recipe.rating && <StarRating rating={recipe.rating} />}
                </div>
            </CardHeader>
            <CardContent>
                {recipe.description && <p className="mb-4 text-sm text-gray-600">{recipe.description}</p>}
                <Collapsible open={ingredientsOpen} onOpenChange={setIngredientsOpen} className="mb-4">
                    <CollapsibleTrigger asChild>
                        <Button variant="outline" className="flex w-full items-center justify-between">
                            <span>Ingredients ({recipe.zutaten.length})</span>
                            {ingredientsOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2">
                        <ul className="list-inside list-disc space-y-1 text-sm">
                            {recipe.zutaten.map((zutat) => (
                                <li key={zutat.name}>
                                    {zutat.amount} {zutat.name}
                                    {zutat.type && <span className="text-gray-500"> ({zutat.type})</span>}
                                </li>
                            ))}
                        </ul>
                    </CollapsibleContent>
                </Collapsible>
                <Collapsible open={stepsOpen} onOpenChange={setStepsOpen}>
                    <CollapsibleTrigger asChild>
                        <Button variant="outline" className="flex w-full items-center justify-between">
                            <span>Steps ({recipe.steps.length})</span>
                            {stepsOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2">
                        <ol className="list-inside list-decimal space-y-2 text-sm">
                            {recipe.steps.map((step) => (
                                <li key={step.step_id}>{step.text}</li>
                            ))}
                        </ol>
                    </CollapsibleContent>
                </Collapsible>
            </CardContent>
        </Card>
    )
}

