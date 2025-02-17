"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import { ChevronDown, ChevronUp, Star, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { StarRating } from "./star-rating"
import { checkIsStarred, starRecipe } from "@/lib/actions/starRecipe"
import { useSession } from "next-auth/react"
import Link from "next/link"

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

export default function CompactRecipeView({ recipe }: CompactRecipeViewProps) {
    const session = useSession()
    const [ingredientsOpen, setIngredientsOpen] = useState(false)
    const [stepsOpen, setStepsOpen] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false);
    const [isStarred, setIsStarred] = useState(false);
    const [isLoadingStarred, setIsLoadingStarred] = useState(true);
    const MAX_CHARS = 150;

    useEffect(() => {
        checkIsStarred(recipe.id).then((res) => {
            setIsStarred(res);
            setIsLoadingStarred(false)
            console.log(res)
        })
    }, [])

    async function starRecipeCallabck() {
        console.log(session)
        await starRecipe(recipe.id)
        setIsStarred(!isStarred)
    }

    return (
        (
            <Card className="w-full max-w-md overflow-hidden flex-0">
                <Link href={`/recipe/${recipe.id}`}>
                    {recipe.header_img && (
                        <div className="relative h-48 w-full">
                            <Image
                                src={recipe.header_img || "/placeholder.svg"}
                                alt={recipe.name}
                                fill
                                sizes="100vw"
                                style={{
                                    objectFit: "cover"
                                }} />
                        </div>
                    )}
                </Link>
                <CardHeader>
                    <Link href={`/recipe/${recipe.id}`}>
                        <CardTitle className="text-2xl font-bold">{recipe.name}</CardTitle>
                        <div className="flex items-center justify-between flex-wrap gap-2">
                            <div className="flex items-center space-x-2">
                                <User className="h-4 w-4 text-gray-500" />
                                <span className="text-sm text-gray-500">{recipe.creator}</span>
                            </div>
                            {recipe.rating && <StarRating rating={recipe.rating} />}
                        </div>
                    </Link>
                </CardHeader>
                <CardContent>
                    {isLoadingStarred ? (<></>) : (
                        <button onClick={starRecipeCallabck} className="absolute -translate-y-[17.5em] -translate-x-3 p-2 bg-white rounded-full shadow-md">
                            {isStarred ? <Star className="h-6 w-6 text-yellow-500 fill-current" /> : <Star className="h-6 w-6 text-yellow-500" />}
                        </button>
                    )}

                    {recipe.description && (
                        <div className="mb-4 text-sm text-gray-600">
                            <p>
                                {isExpanded
                                    ? recipe.description
                                    : recipe.description.length > MAX_CHARS
                                        ? `${recipe.description.slice(0, MAX_CHARS)}...`
                                        : recipe.description
                                }
                            </p>
                            {recipe.description.length > MAX_CHARS && (
                                <button
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                >
                                    {isExpanded ? 'Show Less' : 'Show More'}
                                </button>
                            )}
                        </div>
                    )}<Collapsible open={ingredientsOpen} onOpenChange={setIngredientsOpen} className="mb-4">
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
            </Card>)
    );
}

