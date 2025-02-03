import { notFound } from "next/navigation"
import { prisma } from "@/lib/prismaclient"
import DetailedRecipeView from "@/components/DetailedRecipeView"

export default async function RecipeDetailPage({ params }: { params: { id: string } }) {
    const { id } = await params
    const recipe = await prisma.rezept.findUnique({
        where: { id: parseInt(id) },
        include: {
            zutaten: true,
            steps: true,
        },
    })

    if (!recipe) {
        notFound()
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <DetailedRecipeView recipe={recipe} />
        </div>
    )
}
