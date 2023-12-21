import { CleaningServices, GppGood, SentimentVerySatisfied, StarRate } from "@mui/icons-material";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface IReview {
  review: {
    id: string;
    review: string;
    clean: number;
    security: number;
    service: number;
    satisfied: number;
    user: { id: string; name: string; image_url: string };
    room: { id: string; name: string };
  };
}

const Review: React.FC<IReview> = ({ review }) => {
  return (
    <div className="w-full md:w-1/2 space-y-4 my-4 ">
      <div className="flex items-center space-x-6">
        <Avatar className="h-16 w-16">
          <AvatarFallback />
          <AvatarImage className="" src={review.user.image_url} />
        </Avatar>
        <div className="items-center">
          <p>{review.user.name}</p>
          <p>{review.room.name}</p>
        </div>
      </div>
      <div className="w-full md:w-3/4">
        <p>{review.review.length > 180 ? review.review.substring(0, 180) + "...." : review.review}</p>
      </div>
    </div>
  );
};
export default Review;
