"use server"
import { auth } from "@/auth";
import { prisma } from "@/lib/prismaclient";

export async function checkIsStarred(recipeId: number) {
    const sess = await auth()
    const userID = sess?.user?.email
    if (!userID) throw new Error("Not authenticated")
    return await prisma.rezeptStar.findFirst({
        where: {
            rezeptId: recipeId,
            user: userID
        }
    }) ? true : false
}

export async function starRecipe(recipeId: number) {
    const sess = await auth()
    const userID = sess?.user?.email
    console.log("Star recipe", recipeId, userID)
    if (!userID) throw new Error("Not authenticated")

    const isStarred = await checkIsStarred(recipeId)
    console.log("Is starred", isStarred)
    if (!isStarred) {
        await prisma.rezeptStar.create({
            data: {
                rezeptId: recipeId,
                user: userID
            }
        })
    } else {
        await prisma.rezeptStar.deleteMany({
            where: {
                rezeptId: recipeId,
                user: userID
            }
        })
    }
}