import React from 'react';
import { IReview } from '../interface/review.interface';

type Props = {
    review: IReview;
};

const ReviewCard: React.FC<Props> = ({ review }) => {
    return (
        <div className="border rounded-lg p-4 mb-4">
            <h2 className="text-xl font-semibold mb-2">{review.by}</h2>
            <p>Rating: {review.rating}</p>
            <p>Review: {review.comment}</p>
        </div>
    );
};

export default ReviewCard;
