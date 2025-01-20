"use server"
import { prisma } from "@/lib/prismaclient";
import { Prisma } from "@prisma/client";

export async function addRecipe(recipe: Prisma.RezeptCreateInput, zutaten: Prisma.ZutatCreateInput[], steps: Prisma.RezeptStepCreateInput[]) {
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