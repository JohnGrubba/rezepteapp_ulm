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