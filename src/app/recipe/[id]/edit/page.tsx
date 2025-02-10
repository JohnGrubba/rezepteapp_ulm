import RecipeForm from '@/components/RecipeForm'
import { prisma } from '@/lib/prismaclient'
import { notFound } from 'next/navigation'
import React from 'react'

const page = async ({ params }: { params: { id: string } }) => {
    const { id } = await params
    console.log(id)
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
        <div>
            <RecipeForm recipeID={recipe.id} editMode={true} initialName={recipe.name} initialDescription={recipe.description} initialHeaderImg={recipe.header_img} initialIngredients={recipe.zutaten} initialSteps={recipe.steps} />
        </div>
    )
}

export default page