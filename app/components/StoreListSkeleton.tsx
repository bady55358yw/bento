import AddStoreButton from "@/components/AddStoreButton";
import type { SkeletonProps } from "antd";
import { Skeleton } from "antd";

const skeletonstyles: SkeletonProps["styles"] = {
  title: {
    backgroundColor: "rgba(229, 243, 254, 0.5)",
    height: 20,
    borderRadius: 20,
  },
};

function StoreListSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <AddStoreButton />

      {Array.from({ length: 3 }).map((_, index) => (
        <StoreCardSkeleton key={index} />
      ))}
    </div>
  );
};

function StoreCardSkeleton() {
  return (
    <div className="flex flex-col w-full h-[280px] bg-white border border-colorBorder rounded-2xl p-4 gap-y-3">
      <Skeleton
        styles={skeletonstyles}
        active
      />
    </div>
  );
}

export default StoreListSkeleton;
