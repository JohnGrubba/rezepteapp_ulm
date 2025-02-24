"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { starRecipe } from '@/lib/actions/starRecipe'
import { Star } from 'lucide-react'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'

const StarComp = ({ compact, recipe_id, className, starredInit }: { compact: boolean, recipe_id: number, className?: string, starredInit: boolean }) => {
    const [isStarred, setIsStarred] = useState(starredInit)
    const router = useRouter()

    async function starRecipeCallback() {
        await starRecipe(recipe_id)
        setIsStarred(!isStarred)
        router.refresh()
    }

    return (
        <>
            {compact ? (
                <button onClick={starRecipeCallback} className={clsx("p-2 bg-white rounded-full shadow-md", className)}>
                    {isStarred ? <Star className={"h-6 w-6 text-yellow-500 fill-current z-50"} /> : <Star className="h-6 w-6 text-yellow-500 z-50" />}
                </button>
            ) : (
                <Button onClick={starRecipeCallback} variant="outline" className="mb-4">
                    {
                        isStarred ? (
                            <Star className="h-5 w-5 text-yellow-500 fill-current mr-2" />
                        ) : (
                            <Star className="h-5 w-5 text-yellow-500 mr-2" />
                        )}
                    {isStarred ? "Unstar Recipe" : "Star Recipe"}
                </Button >
            )}
        </>
    )
}

export default StarComp