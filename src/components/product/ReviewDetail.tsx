import React from "react";
import { ReviewPointB } from "../Component";
import { Separator } from "../ui/separator";
import { IReview, IReviewList } from "@/lib/interface";
import { DialogContent } from "../ui/dialog";
import { EditNote } from "@mui/icons-material";
import { ReviewB } from "./Review";

const ReviewDetail: React.FC<IReviewList> = ({ reviews, score }) => {
  return (
    <DialogContent className="max-w-[900px] p-12">
      <div className="flex space-x-8">
        <div className="space-y-2 w-1/3">
          <ReviewPointB score={score.rating} desc="rating" />
          <Separator />
          <ReviewPointB score={score.clean} desc="kebersihan" />
          <Separator />
          <ReviewPointB score={score.security} desc="keamanan" />
          <Separator />
          <ReviewPointB score={score.service} desc="pelayanan" />
          <Separator />
          <ReviewPointB score={score.satisfied} desc="kepuasan" />
        </div>
        <div className="w-2/3">
          <div className="text-lg overflow-scroll max-h-96">
            {reviews.length > 0 ? (
              <div className="space-y-6">
                {reviews.map((review: IReview) => (
                  <ReviewB key={review.id} review={review} />
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
      </div>
    </DialogContent>
  );
};

export default ReviewDetail;
