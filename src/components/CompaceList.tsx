"use client"
import React, { useState } from 'react'
import { CardContent } from './ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible'
import { Button } from './ui/button'
import { ChevronDown, ChevronUp } from 'lucide-react'

const CompaceList = ({ recipe }: CompactRecipeViewProps) => {
    const [ingredientsOpen, setIngredientsOpen] = useState(false)
    const [stepsOpen, setStepsOpen] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false);
    const MAX_CHARS = 150;

    return (
        <CardContent>
            {recipe.description && (
                <div className="mb-4 text-sm text-gray-600">
                    <p>
                        {isExpanded
                            ? recipe.description
                            : recipe.description.length > MAX_CHARS
                                ? `${recipe.description.slice(0, MAX_CHARS)}...`
                                : recipe.description
                        }
                    </p>
                    {recipe.description.length > MAX_CHARS && (
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                            {isExpanded ? 'Show Less' : 'Show More'}
                        </button>
                    )}
                </div>
            )}<Collapsible open={ingredientsOpen} onOpenChange={setIngredientsOpen} className="mb-4">
                <CollapsibleTrigger asChild>
                    <Button variant="outline" className="flex w-full items-center justify-between">
                        <span>Ingredients ({recipe.zutaten.length})</span>
                        {ingredientsOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2">
                    <ul className="list-inside list-disc space-y-1 text-sm">
                        {recipe.zutaten.map((zutat) => (
                            <li key={zutat.name}>
                                {zutat.amount} {zutat.name}
                                {zutat.type && <span className="text-gray-500"> ({zutat.type})</span>}
                            </li>
                        ))}
                    </ul>
                </CollapsibleContent>
            </Collapsible>
            <Collapsible open={stepsOpen} onOpenChange={setStepsOpen}>
                <CollapsibleTrigger asChild>
                    <Button variant="outline" className="flex w-full items-center justify-between">
                        <span>Steps ({recipe.steps.length})</span>
                        {stepsOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2">
                    <ol className="list-inside list-decimal space-y-2 text-sm">
                        {recipe.steps.map((step) => (
                            <li key={step.step_id}>{step.text}</li>
                        ))}
                    </ol>
                </CollapsibleContent>
            </Collapsible>
        </CardContent>
    )
}

export default CompaceList