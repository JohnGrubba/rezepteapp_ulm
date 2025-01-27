import { auth } from "@/auth"
import ProfileHeader from "@/components/ProfileHeaders"
import RecipeList from "@/components/RecipeList"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { redirect } from "next/navigation"
import React from "react"

const ProfilePage = async () => {
    const session = await auth()
    if (!session) return redirect("/")

    return (
        <div className="container mx-auto px-4 py-8">
            <ProfileHeader user={session?.user} />

            <Tabs defaultValue="your-recipes" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="your-recipes">Your Recipes</TabsTrigger>
                    <TabsTrigger value="starred-recipes">Starred Recipes</TabsTrigger>
                </TabsList>
                <TabsContent value="your-recipes">
                    <div className="mt-6">
                        <h2 className="text-2xl font-semibold mb-4">Your Recipes</h2>
                        <RecipeList type="yoursUploaded" />
                    </div>
                </TabsContent>
                <TabsContent value="starred-recipes">
                    <div className="mt-6">
                        <h2 className="text-2xl font-semibold mb-4">Starred Recipes</h2>
                        <RecipeList type="starred" />
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default ProfilePage

