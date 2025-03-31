"use server"
import { prisma } from "@/lib/prismaclient";

export async function fetchRecipes(search_query: string) {
    const recipes = await prisma.rezept.findMany({
        include: {
            steps: true,
            zutaten: true
        }
    })
    return recipes
}