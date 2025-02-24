"use server"
import React from 'react'
import StarComp from '@/components/star_rating/StarComp'
import { checkIsStarred } from '@/lib/actions/starRecipe'

const StarWrapper = async ({ compact, recipe_id, className }: { compact: boolean, recipe_id: number, className?: string }) => {
    const isStarred = await checkIsStarred(recipe_id)
    return (
        <StarComp compact={compact} recipe_id={recipe_id} className={className} starredInit={isStarred} />
    )
}

export default StarWrapper