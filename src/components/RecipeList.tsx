"use server"
import { prisma } from '@/lib/prismaclient'
import React from 'react'
import CompactRecipeView from '@/components/CompactRecipe'
import { auth } from '@/auth'
import { Prisma } from '@prisma/client'

type RecipesJoinedAll = Prisma.RezeptGetPayload<{
    include: {
        steps: true
        zutaten: true
    }
}>

const RecipeList = async ({ type }: { type: "starred" | "yoursUploaded" | "all" }) => {
    const sess = await auth()
    let recipes: RecipesJoinedAll[] = []
    switch (type) {
        case "all": {
            recipes = await prisma.rezept.findMany({
                include: {
                    steps: true,
                    zutaten: true
                }
            })
            break;
        }
        case "starred": {
            recipes = await prisma.rezept.findMany({
                where: {
                    RezeptStar: {
                        some: {
                            user: sess?.user?.id
                        }
                    }
                },
                include: {
                    steps: true,
                    zutaten: true
                }
            })
            break;
        }
        case "yoursUploaded": {
            recipes = await prisma.rezept.findMany({
                where: {
                    creator: sess?.user?.id
                },
                include: {
                    steps: true,
                    zutaten: true
                }
            })
            break;
        }
    }

    return (
        <div className='flex gap-3 flex-wrap w-full justify-center'>
            {recipes.map((recipe) => (
                <CompactRecipeView recipe={recipe} key={recipe.id} />
            ))}
        </div>
    )
}

export default RecipeList