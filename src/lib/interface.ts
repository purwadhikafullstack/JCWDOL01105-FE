export interface UserInterface {
  id: string;
  name: string;
}

export interface IReview {
  id: string;
  review: string;
  clean: number;
  security: number;
  service: number;
  satisfied: number;
  createdAt: Date;
  user: { id: string; name: string; image_url: string };
  room: { id: string; name: string };
}

export interface IReviewProps {
  review: {
    id: string;
    review: string;
    clean: number;
    security: number;
    service: number;
    satisfied: number;
    createdAt: Date;
    user: { id: string; name: string; image_url: string };
    room: { id: string; name: string };
  };
}

export interface IReviewList {
  reviews: IReview[];
  score: { rating: string; clean: string; security: string; service: string; satisfied: string };
}
