import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { IReviewProps } from "@/lib/interface";
import moment from "moment";

const ReviewA: React.FC<IReviewProps> = ({ review }) => {
  return (
    <div className="w-full md:w-1/2 space-y-4 my-4 ">
      <div className="flex items-center space-x-6">
        <Avatar className="h-16 w-16">
          <AvatarFallback />
          <AvatarImage src={review.user.image_url} />
        </Avatar>
        <div className="items-center">
          <p className="font-bold">{review.user.name}</p>
          <p className="font-thin text-base leading-none">{review.room.name}</p>
          <p className="text-sm">{moment(review.createdAt).locale("id").format("MMM Do YY")}</p>
        </div>
      </div>
      <div className="w-full md:w-3/4">
        <p>{review.review.length > 150 ? review.review.substring(0, 147) + "...." : review.review}</p>
      </div>
    </div>
  );
};

const ReviewB: React.FC<IReviewProps> = ({ review }) => {
  return (
    <div className="space-y-2">
      <div className="flex space-x-4">
        <Avatar className="">
          <AvatarFallback />
          <AvatarImage src={review.user.image_url} />
        </Avatar>
        <div className="items-center text-base">
          <p className="font-bold">{review.user.name}</p>
          <div className="flex text-sm leading-none font-thin space-x-4 items-center">
            <p>{review.room.name}</p>
            <p>{moment(review.createdAt).locale("id").format("MMM Do YY")}</p>
          </div>
        </div>
      </div>
      <div className="text-base">
        <p>{review.review}</p>
      </div>
    </div>
  );
};
export { ReviewA, ReviewB };
