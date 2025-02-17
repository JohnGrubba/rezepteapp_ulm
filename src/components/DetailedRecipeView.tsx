"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Clock, User, Utensils, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StarRating } from "./star-rating"
import { checkIsStarred, starRecipe } from "@/lib/actions/starRecipe"
import { useSession } from "next-auth/react"

interface Zutat {
    name: string
    type: string | null
    amount: string | null
}

interface RezeptStep {
    step_id: number
    text: string
}

interface DetailedRecipeViewProps {
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

export default function DetailedRecipeView({ recipe }: DetailedRecipeViewProps) {
    const session = useSession()
    const [isStarred, setIsStarred] = useState(false)
    const [isLoadingStarred, setIsLoadingStarred] = useState(true)

    useEffect(() => {
        checkIsStarred(recipe.id).then((res) => {
            setIsStarred(res)
            setIsLoadingStarred(false)
        })
    }, [recipe.id])

    async function starRecipeCallback() {
        await starRecipe(recipe.id)
        setIsStarred(!isStarred)
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
                {recipe.header_img && (
                    <div className="relative h-96 w-full mb-6">
                        <Image
                            src={recipe.header_img || "/placeholder.svg"}
                            alt={recipe.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            style={{ objectFit: "cover" }}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold">{recipe.name}</CardTitle>
                        <div className="flex items-center justify-between flex-wrap gap-2">
                            <div className="flex items-center space-x-2">
                                <User className="h-5 w-5 text-gray-500" />
                                <span className="text-sm text-gray-500">{recipe.creator}</span>
                            </div>
                            {recipe.rating && <StarRating rating={recipe.rating} />}
                        </div>
                    </CardHeader>
                    <CardContent>
                        {!isLoadingStarred && (
                            <Button onClick={starRecipeCallback} variant="outline" className="mb-4">
                                {isStarred ? (
                                    <Star className="h-5 w-5 text-yellow-500 fill-current mr-2" />
                                ) : (
                                    <Star className="h-5 w-5 text-yellow-500 mr-2" />
                                )}
                                {isStarred ? "Unstar Recipe" : "Star Recipe"}
                            </Button>
                        )}
                        {recipe.description && <p className="text-gray-600 mb-4">{recipe.description}</p>}
                        <div className="flex items-center space-x-4 mb-4">
                            <div className="flex items-center">
                                <Clock className="h-5 w-5 text-gray-500 mr-2" />
                                <span>30 min</span>
                            </div>
                            <div className="flex items-center">
                                <Utensils className="h-5 w-5 text-gray-500 mr-2" />
                                <span>4 servings</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div>
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Ingredients</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2">
                            {recipe.zutaten.map((zutat) => (
                                <li key={zutat.name}>
                                    {zutat.amount} {zutat.name}
                                    {zutat.type && <span className="text-gray-500"> ({zutat.type})</span>}
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Instructions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ol className="list-inside list-none space-y-6">
                            {recipe.steps.map((step, idx) => (
                                <li key={step.step_id} className="flex rounded-lg transition-all duration-200 items-center">
                                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-indigo-100 text-indigo-800 rounded-full font-semibold mr-4">
                                        {idx + 1}
                                    </span>
                                    <div className="flex-grow">
                                        <p className="text-gray-700">
                                            {step.text}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

