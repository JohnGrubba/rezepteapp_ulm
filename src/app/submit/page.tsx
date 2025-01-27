"use client"

import { useState } from "react"
import { PlusCircle, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Prisma } from "@prisma/client"
import { useSession } from "next-auth/react"
import { addRecipe } from "@/lib/actions/subm"


export default function RecipeForm() {
    const { data: session } = useSession()
    if (!session) return <div className="font-bold text-2xl text-center">Sign in to submit a recipe</div>
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [headerImg, setHeaderImg] = useState("")
    const [rating, setRating] = useState(0)
    const [ingredients, setIngredients] = useState<Prisma.ZutatCreateInput[]>([{ name: "", type: "", amount: "" }])
    const [steps, setSteps] = useState<Prisma.RezeptStepCreateInput[]>([{ text: "" }])

    const addIngredient = () => {
        setIngredients([...ingredients, { name: "", type: "", amount: "" }])
    }

    const removeIngredient = (index: number) => {
        setIngredients(ingredients.filter((_, i) => i !== index))
    }

    const addStep = () => {
        setSteps([...steps, { text: "" }])
    }

    const removeStep = (index: number) => {
        setSteps(steps.filter((_, i) => i !== index))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log(session)
        if (!session?.user?.email) {
            alert("You need to be signed in to submit a recipe")
            return
        }
        // Here you would typically send the data to your backend
        console.log({ name, description, headerImg, rating, ingredients, steps, creator: session.user.email })
        await addRecipe({ name: name, description: description, header_img: headerImg, rating: rating, creator: session.user.email }, ingredients, steps)
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">Create New Recipe</h1>
                <p className="text-gray-500">Fill in the details to share your creation with others!</p>
            </div>

            <div className="space-y-4">
                <div>
                    <Label htmlFor="name">Recipe Name</Label>
                    <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter recipe name"
                        required
                    />
                </div>

                <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe your recipe"
                    />
                    <p className="text-sm text-muted-foreground mt-2 italic flex items-center gap-2">
                        <span>✨</span>
                        Leave blank for an AI-generated description
                    </p>
                </div>

                <div>
                    <Label htmlFor="headerImg">Header Image URL</Label>
                    <Input
                        id="headerImg"
                        value={headerImg}
                        onChange={(e) => setHeaderImg(e.target.value)}
                        placeholder="Enter image URL"
                    />
                </div>

                <div>
                    <Label htmlFor="rating">Rating</Label>
                    <Input
                        id="rating"
                        type="number"
                        min="0"
                        max="5"
                        step="0.1"
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        placeholder="Rate your recipe (0-5)"
                    />
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Ingredients</h2>
                {ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <Input
                            value={ingredient.name}
                            onChange={(e) => {
                                const newIngredients = [...ingredients]
                                newIngredients[index].name = e.target.value
                                setIngredients(newIngredients)
                            }}
                            placeholder="Ingredient name"
                        />
                        <Input
                            value={ingredient.type || ""}
                            onChange={(e) => {
                                const newIngredients = [...ingredients]
                                newIngredients[index].type = e.target.value
                                setIngredients(newIngredients)
                            }}
                            placeholder="Type (optional)"
                        />
                        <Input
                            value={ingredient.amount || ""}
                            onChange={(e) => {
                                const newIngredients = [...ingredients]
                                newIngredients[index].amount = e.target.value
                                setIngredients(newIngredients)
                            }}
                            placeholder="Amount (optional)"
                            type="text"
                        />
                        <Button type="button" variant="outline" size="icon" onClick={() => removeIngredient(index)}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
                <Button type="button" variant="outline" onClick={addIngredient}>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Ingredient
                </Button>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Steps</h2>
                {steps.map((step, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <Textarea
                            value={step.text}
                            onChange={(e) => {
                                const newSteps = [...steps]
                                newSteps[index].text = e.target.value
                                setSteps(newSteps)
                            }}
                            placeholder={`Step ${index + 1}`}
                        />
                        <Button type="button" variant="outline" size="icon" onClick={() => removeStep(index)}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
                <Button type="button" variant="outline" onClick={addStep}>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Step
                </Button>
            </div>

            <Button type="submit" className="w-full">
                Create Recipe
            </Button>
        </form>
    )
}

