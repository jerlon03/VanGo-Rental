import Skeleton from "react-loading-skeleton";

const VanLoader = () => (
  <div className="w-full rounded-[10px] flex flex-col justify-between animate-pulse border border-[#cccccc]">
    <div className="px-[10%]">
      <Skeleton height={80} />
    </div>
    <div className="p-[4%]">
      <Skeleton height={20} width="60%" className="mb-2" />
      <div className="flex gap-[10px] items-center">
        <Skeleton height={24} width={24} />
        <Skeleton height={20} width="40%" />
      </div>
      <div className="flex pt-2 gap-[20px]">
        <div className="flex gap-[10px] items-center justify-center">
          <Skeleton height={24} width={24} />
          <Skeleton height={20} width="40%" />
        </div>
        <div className="flex gap-[10px] items-center justify-center">
          <Skeleton height={24} width={24} />
          <Skeleton height={20} width="40%" />
        </div>
      </div>
      <Skeleton height={20} width="80%" className="mt-2" />
      <div className="pt-[4%]">
        <Skeleton height={40} width={200} />
      </div>
    </div>
  </div>
);

export { VanLoader };
