import { Star, StarHalf } from "lucide-react"

interface StarRatingProps {
    rating: number
}

export function StarRating({ rating }: StarRatingProps) {
    const fullStars = Math.round(rating)

    return (
        <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400">
                    {i < fullStars ? (
                        <Star className="fill-current" />
                    ) : (
                        <Star />
                    )}
                </span>
            ))}
            <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
        </div>
    )
}

