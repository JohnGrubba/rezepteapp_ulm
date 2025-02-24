"use server"
import { prisma } from "@/lib/prismaclient";
import { Prisma } from "@prisma/client";
import { generateAIDescription } from "./ai";

export async function addRecipe(recipe: Prisma.RezeptCreateInput, zutaten: Prisma.ZutatCreateInput[], steps: Prisma.RezeptStepCreateInput[]) {
    if (!recipe.description) {
        recipe.description = await generateAIDescription(zutaten, steps)
    }
    await prisma.rezept.create({
        data: {
            ...recipe,
            steps: {
                create: steps
            },
            zutaten: {
                create: zutaten
            }
        }
    })
    console.log("Recipe added!")
}

export async function editRecipe(id: number, recipe: Prisma.RezeptCreateInput, zutaten: Prisma.ZutatCreateInput[], steps: any[]) {
    if (!recipe.description) {
        recipe.description = await generateAIDescription(zutaten, steps)
    }
    console.log("Updating recipe")
    console.log(id, steps, zutaten)

    await prisma.rezept.update({
        where: {
            id: id
        },
        data: {
            ...recipe,
            steps: {
                deleteMany: {
                    rezeptId: id
                },
                create: steps.map((step) => {
                    return {
                        text: step.text
                    }
                })
            },
            zutaten: {
                deleteMany: {
                    rezeptId: id
                },
                create: zutaten.map((zutat) => {
                    return {
                        name: zutat.name,
                        type: zutat.type,
                        amount: zutat.amount
                    }
                })
            }
        }
    })
    console.log("Recipe modified!")
}