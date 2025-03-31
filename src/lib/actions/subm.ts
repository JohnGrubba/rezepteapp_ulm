"use server"
import { prisma } from "@/lib/prismaclient";
import { Prisma } from "@prisma/client";
import { generateAIDescription } from "./ai";
import { auth } from "@/auth";

async function checkRights(recipe_id?: number): Promise<boolean> {
    const usr = await auth()
    if (!usr?.user) {
        return false
    }
    if (!recipe_id) {
        return true;
    }
    const recp = await prisma.rezept.findFirst({ where: { id: recipe_id } })
    if (!recp) {
        return false
    }
    if (usr.user.email !== recp.creator) {
        return false
    }
    return true
}

export async function addRecipe(recipe: Prisma.RezeptCreateInput, zutaten: Prisma.ZutatCreateInput[], steps: Prisma.RezeptStepCreateInput[]) {
    if (!recipe.description) {
        recipe.description = await generateAIDescription(zutaten, steps)
    }
    if (! await checkRights()) {
        console.log("No rights!")
        return;
    }
    const item = await prisma.rezept.create({
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
    return item.id
}
export async function removeRecipe(id: number) {
    if (! await checkRights(id)) {
        console.log("No rights!")
        return;
    }
    await prisma.rezept.delete({
        where: {
            id: id
        }
    })
    console.log("Recipe removed!")
}

export async function editRecipe(id: number, recipe: Prisma.RezeptCreateInput, zutaten: Prisma.ZutatCreateInput[], steps: any[]) {
    if (!recipe.description) {
        recipe.description = await generateAIDescription(zutaten, steps)
    }
    console.log("Updating recipe")
    console.log(id, steps, zutaten)
    if (! await checkRights(id)) {
        console.log("No rights!")
        return;
    }

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