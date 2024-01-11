import { Separator } from "../ui/separator";
import { EditNote } from "@mui/icons-material";
import { ReviewPointA } from "../Component";
import { IReview, IReviewList } from "@/lib/interface";
import { ReviewA } from "./Review";

const ReviewList: React.FC<IReviewList> = ({ reviews, score }) => {
  return (
    <div className="space-y-4">
      <p className="text-2xl">Ulasan</p>

      <div className="flex items-center space-x-6 font-thin">
        <ReviewPointA score={score.rating} desc="rating" />
        <Separator orientation="vertical" className="h-20" />
        <ReviewPointA score={score.clean} desc="kebersihan" />
        <Separator orientation="vertical" className="h-20" />
        <ReviewPointA score={score.security} desc="keamanan" />
        <Separator orientation="vertical" className="h-20" />
        <ReviewPointA score={score.service} desc="pelayanan" />
        <Separator orientation="vertical" className="h-20" />
        <ReviewPointA score={score.satisfied} desc="kepuasan" />
        <Separator orientation="vertical" className="h-20" />
      </div>

      <Separator />

      <div className="text-lg">
        {reviews.length > 0 ? (
          <div className="flex flex-col md:flex-row flex-wrap">
            {reviews.slice(0, 4).map((review: IReview) => (
              <ReviewA key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 space-y-2">
            <EditNote sx={{ fontSize: "80px" }} />
            <p className="text-2xl ">belum ada ulasan</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewList;
