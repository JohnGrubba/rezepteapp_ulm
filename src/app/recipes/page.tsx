import { CompactRecipeView } from '@/components/CompactRecipe'
import { prisma } from '@/lib/prismaclient'
import React from 'react'

const page = async () => {
    const recipes = await prisma.rezept.findMany({
        include: {
            steps: true,
            zutaten: true
        }
    })
    return (
        <div>
            {recipes.map((recipe) => (
                <CompactRecipeView recipe={recipe} key={recipe.id} />
            ))}
        </div>
    )
}

export default page