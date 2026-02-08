import type { SkeletonProps } from "antd";
import { Skeleton } from "antd";
import { createStaticStyles } from "antd-style";
import React from "react";
import AddStoreButton from "@/components/AddStoreButton";

const classnames = createStaticStyles(({ css }) => ({
  root: css`
    border-radius: 10px;
    padding: 12px;
  `,
  header: css`
    margin-bottom: 12px;
  `,
}));

const paragraphStyles = createStaticStyles(({ css }) => ({
  paragraph: css`
    & > li {
      background-color: rgba(229, 243, 254, 0.5);
    }
  `,
}));

const stylesFn: SkeletonProps["styles"] = (info) => {
  if (info.props.active) {
    return {
      root: {
        border: "1px solid rgba(229, 243, 254, 0.3)",
      },
      title: {
        backgroundColor: "rgba(229, 243, 254, 0.5)",
        height: 20,
        borderRadius: 20,
      },
    } satisfies SkeletonProps["styles"];
  }
  return {};
};

const StoreListSkeleton: React.FC = () => {
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
    <div className="flex flex-col w-full lg:h-[280px] bg-white border border-colorBorder rounded-2xl p-4 gap-y-3">
      <Skeleton
        classNames={{ ...classnames, paragraph: paragraphStyles.paragraph }}
        styles={stylesFn}
        active
      />
    </div>
  );
}

export default StoreListSkeleton;
