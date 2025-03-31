import Image from "next/image"
import { Clock, Edit, User, Utensils } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StarRating } from "./star-rating"
import StarWrapper from "@/components/star_rating/StarWrapper"
import { Button } from "./ui/button"
import Link from "next/link"
import { RezeptJoined } from "./types"

export default function DetailedRecipeView({ recipe }: { recipe: RezeptJoined }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
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
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-3xl font-bold">{recipe.name}</CardTitle>
                            <Link href={`/recipe/${recipe.id}/edit`} passHref className="border-slate-300 border-2 p-2 rounded-lg">

                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit recipe</span>
                            </Link>
                        </div>
                        {/* ...rest of existing header content... */}
                    </CardHeader>
                    <CardContent>
                        <StarWrapper compact={false} recipe_id={recipe.id} />
                        {recipe.description && <p className="text-gray-600 mb-4">{recipe.description}</p>}
                        <div className="flex items-center space-x-4 mb-4">
                            <div className="flex items-center">
                                <Clock className="h-5 w-5 text-gray-500 mr-2" />
                                <span>{recipe.preparation_time_min} min</span>
                            </div>
                            <div className="flex items-center">
                                <Utensils className="h-5 w-5 text-gray-500 mr-2" />
                                <span>{recipe.serving_amount} servings</span>
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

