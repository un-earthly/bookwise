import { IReview } from "./review.interface";

export interface IBook {
    _id?: string;
    title: string;
    author: string;
    genre: string;
    publicationDate: string;
    reviews?: IReview[];
    createdAt?: string;
    updatedAt?: string;
}
