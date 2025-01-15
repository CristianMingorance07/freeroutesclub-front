export default function Reviews({ reviews }: { reviews: { user: string; comment: string; rating: number }[] }) {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">What Others Say</h2>
            <ul className="space-y-4">
                {reviews.map((review, index) => (
                    <li key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                        <p>
                            <strong>{review.user}</strong>: {review.comment}
                        </p>
                        <p className="text-yellow-500">Rating: {review.rating} / 5</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
