import Skeleton from "react-loading-skeleton";

function CardSkeleton() {
  return (
    <div className="w-72 bg-white rounded-xl border p-4 min-h-64">
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div> {/* Icon placeholder */}
            <Skeleton width={120} height={20} /> {/* Title */}
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div> {/* Share */}
            <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div> {/* Delete */}
          </div>
        </div>

        {/* Memory content */}
        <Skeleton count={5} height={15} />

        {/* Link or embed placeholder */}
        <Skeleton count={3} height={20} width="80%" />

        {/* Tags */}
        <div className="flex gap-2 flex-wrap">
          <Skeleton width={50} height={20} />
          <Skeleton width={60} height={20} />
        </div>

        {/* Footer */}
        <Skeleton width={100} height={15} />
      </div>
    </div>
  );
}

export default CardSkeleton;
