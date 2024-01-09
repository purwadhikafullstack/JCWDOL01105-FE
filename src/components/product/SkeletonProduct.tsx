import { Skeleton } from "../ui/skeleton";

const SkeletonProduct = () => {
  return (
    <div className="flex flex-grow flex-wrap justify-center">
      {Array(8)
        .fill(0)
        .map((item, i) => (
          <div key={i + item} className="h-full w-full md:max-w-[320px] mx-2">
            <Skeleton className="w-full md:w-[320px] h-[200px] rounded-lg my-2" />
            <Skeleton className="w-full md:max-w-[320px] h-2 rounded-full my-2" />
            <Skeleton className="w-full md:max-w-[320px] h-2 rounded-full my-2" />
            <Skeleton className="w-full md:max-w-[320px] h-2 rounded-full my-2" />
          </div>
        ))}
    </div>
  );
};

export default SkeletonProduct;
