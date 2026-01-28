import Nodata from "@/components/no-data/Nodata";
import { Loader } from "@mantine/core";
import { ReactNode } from "react";

type OverlayStateProps<T> = {
    isLoading: boolean;
    isError: boolean;
    data: T | null | undefined;
    content: (data: T) => ReactNode;
    loadingComponent?: ReactNode;
    noDataComponent?: ReactNode;
};

export function OverlayState<T>({ isLoading, isError, data, content, loadingComponent, noDataComponent }: OverlayStateProps<T>) {
    if (isLoading) {
        return (
            <div className="absolute inset-0 z-10 flex items-center justify-center min-h-5 h-auto">
                {loadingComponent || <Loader className="h-5 w-5 animate-spin" />}
            </div>
        );
    }

    if (!data || (data as any)?.length === 0 || isError) {
        return <div className="absolute inset-0 z-10 flex items-center justify-center">{noDataComponent || <Nodata />}</div>;
    }

    return <>{content(data)}</>;
}
