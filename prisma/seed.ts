import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
    await prisma.rezept.create({
        data: {
            name: "Spaghetti Carbonara",
            creator: "jonas.grubbauer@outlook.com",
            description: "A classic Italian dish",
            steps: {
                create: [
                    { text: "Boil water" },
                    { text: "Cook bacon" },
                    { text: "Mix eggs and cheese" },
                    { text: "Mix everything together" },
                    { text: "Serve" }
                ]
            },
            zutaten: {
                create: [
                    { name: "Spaghetti", amount: "200g" },
                    { name: "Bacon", amount: "100g" },
                    { name: "Eggs", amount: "2" },
                    { name: "Parmesan", amount: "50g" }
                ]
            }
        }
    })
    await prisma.rezept.create({
        data: {
            name: "Spaghetti Bolognese",
            creator: "jonas.grubbauer@outlook.com",
            description: "A classic Italian dish",
            steps: {
                create: [
                    { text: "Boil water" },
                    { text: "Cook meat" },
                    { text: "Add tomato sauce" },
                    { text: "Mix everything together" },
                    { text: "Serve" }
                ]
            },
            zutaten: {
                create: [
                    { name: "Spaghetti", amount: "200g" },
                    { name: "Ground beef", amount: "200g" },
                    { name: "Tomato sauce", amount: "200g" }
                ]
            }
        }
    })
    await prisma.rezept.create({
        data: {
            name: "Chicken Curry",
            creator: "jonas.grubbauer@outlook.com",
            description: "A classic Indian dish",
            steps: {
                create: [
                    { text: "Cook chicken in pan" },
                    { text: "Add curry sauce" },
                    { text: "Simmer for 20 minutes" },
                    { text: "Serve" }
                ]
            },
            zutaten: {
                create: [
                    { name: "Chicken", amount: "200g" },
                    { name: "Curry sauce", amount: "200g" }
                ]
            }
        }
    })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })