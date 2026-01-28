import { Loader2 } from "lucide-react";
import Nodata from "../no-data/Nodata";
import { ReactNode } from "react";

type TProps = {
    isLoading: boolean;
    isError: boolean;
    isEmpty: boolean;
    loadingComponent?: ReactNode;
    noDataComponent?: ReactNode;
    children: ReactNode;
    /**
     * Xác định khi nào loadingComponent được hiển thị:
     * - 'initial': chỉ khi dữ liệu chưa có
     * - 'append': khi đã có dữ liệu, chỉ muốn loader bên dưới
     */
    showSkeletonWhen?: Array<"initial" | "append">;
    footerLoading?: ReactNode;
};

export function DataState({
    isLoading,
    isError,
    isEmpty,
    loadingComponent,
    noDataComponent,
    children,
    showSkeletonWhen = ["initial"],
    footerLoading,
}: TProps) {
    const shouldShowSkeleton = isLoading && ((showSkeletonWhen.includes("initial") && isEmpty) || (showSkeletonWhen.includes("append") && !isEmpty));

    if (shouldShowSkeleton && showSkeletonWhen.includes("initial")) {
        return (
            loadingComponent || (
                <div className="flex h-full w-full items-center justify-center">
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                </div>
            )
        );
    }

    if ((isError || isEmpty) && !isLoading) {
        return (
            noDataComponent || (
                <div className="flex h-full w-full items-center justify-center">
                    <Nodata />
                </div>
            )
        );
    }

    return (
        <>
            {children}
            {shouldShowSkeleton && showSkeletonWhen.includes("append") && footerLoading}
        </>
    );
}
