"use server"
import { auth } from "@/auth";
import { prisma } from "@/lib/prismaclient";

export async function starRecipe(recipeId: number) {
    const sess = await auth()
    const userID = sess?.user?.id
    console.log("Star recipe", recipeId, userID)
    if (!userID) throw new Error("Not authenticated")
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