import { Skeleton } from "../ui/skeleton";

const SkeletonProduct = () => {
  return (
    <div className="grid md:grid-cols-4 lg:grid-cols-6">
      {Array(18)
        .fill(0)
        .map((item, i) => (
          <div key={i} className="mx-auto">
            <Skeleton className="w-[200px] h-[200px] rounded-lg bg-slate-300 my-2" />
            <Skeleton className="w-[200px] h-[10px] rounded-full bg-slate-300 my-2" />
            <Skeleton className="w-[200px] h-[10px] rounded-full bg-slate-300 my-2" />
            <Skeleton className="w-[200px] h-[10px] rounded-full bg-slate-300 my-2" />
          </div>
        ))}
    </div>
  );
};

export default SkeletonProduct;
