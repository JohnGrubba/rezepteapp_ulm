import RecipeList from '@/components/RecipeList'
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
        <RecipeList type="all" />
    )
}

export default page