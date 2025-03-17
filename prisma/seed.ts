import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
    await prisma.rezept.create({
        data: {
            name: "Spaghetti Carbonara",
            header_img: "https://www.gutekueche.at/storage/media/recipe/101383/resp/spaghetti-carbonara___webp_940_626.webp",
            creator: "jonas.grubbauer@outlook.com",
            description: "A classic Italian dish",
            preparation_time_min: 20,
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
            header_img: "https://www.gutekueche.at/storage/media/recipe/140784/conv/spaghetti-bolognese-default.jpg",
            creator: "jonas.grubbauer@outlook.com",
            description: "A classic Italian dish",
            preparation_time_min: 30,
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
            header_img: "https://www.gutekueche.at/storage/media/recipe/37643/resp/kardamom-kokos-chicken-curry_1489565314___webp_620_413.webp",
            creator: "indian.master@outlook.com",
            description: "A classic Indian dish",
            preparation_time_min: 40,
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