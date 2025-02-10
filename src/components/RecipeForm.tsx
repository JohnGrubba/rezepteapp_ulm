"use client"

import { useState } from "react"
import { PlusCircle, Save, Trash, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Prisma } from "@prisma/client"
import { useSession } from "next-auth/react"
import { addRecipe, editRecipe } from "@/lib/actions/subm"

interface RecipeFormProps {
    initialName?: string;
    initialDescription?: string | null;
    initialHeaderImg?: string | null;
    initialIngredients?: Prisma.ZutatCreateInput[];
    initialSteps?: Prisma.RezeptStepCreateInput[];
    editMode?: boolean;
    recipeID?: number;
}

export default function RecipeForm({
    initialName = "",
    initialDescription = "",
    initialHeaderImg = "",
    initialIngredients = [{ name: "", type: "", amount: "" }],
    initialSteps = [{ text: "" }],
    editMode = false,
    recipeID = undefined,
}: RecipeFormProps) {
    const { data: session } = useSession()
    const [name, setName] = useState(initialName)
    const [description, setDescription] = useState(initialDescription)
    const [headerImg, setHeaderImg] = useState(initialHeaderImg)
    const [ingredients, setIngredients] = useState<(Prisma.ZutatCreateInput | Prisma.ZutatMaxAggregateOutputType)[]>(initialIngredients)
    const [steps, setSteps] = useState<Prisma.RezeptStepCreateInput[]>(initialSteps)

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
        console.log({ name, description, headerImg, ingredients, steps, creator: session.user.email })
        await addRecipe({ name: name, description: description, header_img: headerImg, creator: session.user.email }, ingredients as unknown as Prisma.ZutatCreateInput[], steps)
    }

    async function handleUpdate() {
        console.log("Update")
        console.log(session)
        if (!session?.user?.email) {
            alert("You need to be signed in to submit a recipe")
            return
        }
        if (!recipeID) {
            alert("Invalid State, Please reload")
            return
        }
        // Here you would typically send the data to your backend
        console.log({ name, description, headerImg, ingredients, steps, creator: session.user.email })
        await editRecipe(recipeID, { name: name, description: description, header_img: headerImg, creator: session.user.email }, ingredients as unknown as Prisma.ZutatMaxAggregateOutputType[], steps)

    }
    async function handleDelete() {
        console.log("Delete")
    }

    if (!session) return <div className="font-bold text-2xl text-center">Sign in to submit a recipe</div>

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
                        value={description || ""}
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
                        value={headerImg || ""}
                        onChange={(e) => setHeaderImg(e.target.value)}
                        placeholder="Enter image URL"
                    />
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Ingredients</h2>
                <p className="text-gray-500">Note that the amount here is for one serving</p>

                {ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <Input
                            value={ingredient.name || ""}
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



            {editMode ? (
                <div className="flex gap-2">
                    <Button type="button" className="w-full" onClick={handleUpdate}>
                        Update Recipe <Save />
                    </Button>
                    <Button type="button" variant="destructive" className="w-full" onClick={handleDelete}>
                        Delete Recipe <Trash />
                    </Button>
                </div>

            ) : (
                <Button type="submit" className="w-full">
                    Create Recipe
                </Button>
            )}

        </form>
    )
}