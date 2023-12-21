import { useGetAPI } from "@/lib/service";
import { Separator } from "../ui/separator";
import Review from "./Review";
import {
  CleaningServices,
  GppGood,
  SentimentVerySatisfied,
  EditNote,
  SupportAgent,
  StarRate,
} from "@mui/icons-material";
import { useEffect } from "react";

interface IReview {
  id: string;
  review: string;
  clean: number;
  security: number;
  service: number;
  satisfied: number;
  user: { id: string; name: string; image_url: string };
  room: { id: string; name: string };
}

interface IProperty {
  property: { id: string };
  setReview: ({ rating, totalReview }: { rating: number; totalReview: number }) => void;
}

const ReviewList: React.FC<IProperty> = ({ property, setReview }) => {
  const {
    data: reviews,
    isFetched,
    refetch,
  } = useGetAPI(`/api/review/property?propertyId=${property.id}`, `review-${property.id}`);

  useEffect(() => {
    refetch();
    isFetched && setReview({ rating: reviews.score.rating, totalReview: reviews.reviews.count });
  }, [reviews]);

  return (
    <div className="space-y-4">
      <p className="text-2xl">ulasan</p>

      <div>
        {isFetched && (
          <div className="flex items-center space-x-6">
            <div>
              <StarRate className="mb-2" sx={{ fontSize: "40px" }} />
              <p className="font-thin">rating</p>
              <p className="font-thin">{reviews.score.rating}</p>
            </div>
            <Separator orientation="vertical" className="h-20" />
            <div>
              <CleaningServices className="mb-2" sx={{ fontSize: "40px" }} />
              <p className="font-thin">kebersihan</p>
              <p className="font-thin">{reviews.score.clean}</p>
            </div>
            <Separator orientation="vertical" className="h-20" />
            <div>
              <GppGood className="mb-2" sx={{ fontSize: "40px" }} />
              <p className="font-thin">keamanan</p>
              <p className="font-thin">{reviews.score.security}</p>
            </div>
            <Separator orientation="vertical" className="h-20" />
            <div>
              <SupportAgent className="mb-2" sx={{ fontSize: "40px" }} />
              <p className="font-thin">pelayanan</p>
              <p className="font-thin">{reviews.score.service}</p>
            </div>
            <Separator orientation="vertical" className="h-20" />
            <div>
              <SentimentVerySatisfied className="mb-2" sx={{ fontSize: "40px" }} />
              <p className="font-thin">kepuasan</p>
              <p className="font-thin">{reviews.score.satisfied}</p>
            </div>
          </div>
        )}
      </div>

      <Separator />

      {isFetched && (
        <div>
          {reviews.reviews.rows.length > 0 ? (
            <div className="flex flex-col md:flex-row flex-wrap">
              {reviews.reviews.rows.map((review: IReview) => (
                <Review key={review.id} review={review} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 space-y-2">
              <EditNote sx={{ fontSize: "80px" }} />
              <p className="text-2xl ">belum ada ulasan</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReviewList;
