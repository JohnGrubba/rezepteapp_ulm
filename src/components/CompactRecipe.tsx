import Image from "next/image"
import { User } from "lucide-react"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import CompaceList from "./CompaceList"
import StarWrapper from "./star_rating/StarWrapper"
import { RezeptJoined } from "./types"

export default function CompactRecipeView({ recipe }: { recipe: RezeptJoined }) {
    return (
        (
            <Card className="w-full max-w-md min-w-72 overflow-hidden flex-1">
                {recipe.header_img && (
                    <div className="relative h-48 w-full">
                        <StarWrapper compact={true} recipe_id={recipe.id} className="z-50 absolute top-2 left-2" />
                        <Link href={`/recipe/${recipe.id}`}>
                            <Image
                                src={recipe.header_img || "/placeholder.svg"}
                                alt={recipe.name}
                                fill
                                sizes="100%"
                                priority
                                style={{
                                    objectFit: "cover",
                                    zIndex: 0
                                }} />
                        </Link>
                    </div>
                )}
                <CardHeader>
                    <Link href={`/recipe/${recipe.id}`}>
                        <CardTitle className="text-2xl font-bold">{recipe.name}</CardTitle>
                        <div className="flex items-center justify-between flex-wrap gap-2">
                            <div className="flex items-center space-x-2">
                                <User className="h-4 w-4 text-gray-500" />
                                <span className="text-sm text-gray-500">{recipe.creator}</span>
                            </div>
                        </div>
                    </Link>
                </CardHeader>
                <CompaceList recipe={recipe} />
            </Card>)
    );
}

