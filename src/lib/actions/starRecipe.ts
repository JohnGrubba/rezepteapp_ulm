"use server"
import { prisma } from "@/lib/prismaclient";

export async function starRecipe(recipeId: number, userID: string) {
    await prisma.rezeptStar.upsert({
        where: {
            rezeptId: recipeId,
            user: userID
        },
        update: {},
        create: {
            rezeptId: recipeId,
            user: userID
        }
    })
}