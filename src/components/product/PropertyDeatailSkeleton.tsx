import { Skeleton } from "@/components/ui/skeleton";

const PropertyDetailSkeleton = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="h-12 w-1/2" />
      <div className="flex">
        <Skeleton className="w-1/2 h-[400px] mr-3 rounded-l-xl" />
        <Skeleton className="w-1/2 h-[400px] mr-3 rounded-l-xl" />
      </div>
      <div className="flex space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <Skeleton className="h-12 w-1/2" />
      </div>
      <Skeleton className="h-12" />
      <div className="w-1/2 space-y-4">
        <Skeleton className="h-72" />
        <Skeleton className="h-72" />
      </div>
      <Skeleton className="h-72" />
      <div className="h-20"></div>
    </div>
  );
};

export default PropertyDetailSkeleton;
