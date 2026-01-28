import { Button, Loader } from "@mantine/core";
import React, { ReactNode, useEffect, useRef } from "react";

type LoadMoreButtonConfig = {
    /** bật/tắt chế độ nút Load More */
    enabled?: boolean;
    /** text hiển thị trên nút */
    label?: string;
    /** ẩn nút khi đạt tối đa */
    hideWhenMax?: boolean;
    /** đã đạt tới giới hạn (không còn load được nữa) */
    isEnd?: boolean;

    /** className cho nút Load More */
    classNameButton?: string;
};

type AppendLoadingProps = {
    /** đang fetch (trạng thái chung) */
    isLoading: boolean;
    /** danh sách hiện tại rỗng (chưa có item nào) */
    isEmpty: boolean;
    /** có lỗi khi fetch lần gần nhất */
    isError: boolean;

    /** loader cho lần tải đầu tiên (khi isEmpty && isLoading) */
    initialLoadingComponent?: ReactNode;
    /** hiển thị khi không có dữ liệu (isEmpty || isError) && !isLoading */
    noDataComponent?: ReactNode;

    /** loader đặt ở top (khi appendSide='top' & đang loading & có data) */
    loadingIndicatorTop?: ReactNode;
    /** loader đặt ở bottom (khi appendSide='bottom' & đang loading & có data) */
    loadingIndicatorBottom?: ReactNode;
    /** Giữ tương thích: nếu bạn truyền footerLoadingComponent cũ vẫn hoạt động (bottom) */
    footerLoadingComponent?: ReactNode;

    /** nội dung danh sách */
    children: ReactNode;

    /**
     * Vị trí append: 'top' để load thêm ở đầu (chat cũ),
     * 'bottom' để load thêm ở cuối (feed).
     */
    appendSide?: "top" | "bottom";

    /** callback khi chạm sentinel */
    onLoadMore?: () => void;

    /**
     * scroll container làm root cho IntersectionObserver.
     * Ví dụ: ref đến ScrollArea viewport / div có overflow.
     */
    containerRef: React.RefObject<HTMLElement | null>;

    /** tinh chỉnh */
    threshold?: number; // default 0.1
    rootMargin?: string; // default "0px"
    debug?: boolean;

    /** config cho button load more */
    loadMoreButton?: LoadMoreButtonConfig;
};

export function AppendLoading({
    debug = false,
    isLoading,
    isEmpty,
    isError,
    initialLoadingComponent,
    noDataComponent,
    loadingIndicatorTop,
    loadingIndicatorBottom,
    // backward-compat (bottom)
    footerLoadingComponent,
    children,
    appendSide = "bottom",
    onLoadMore,
    containerRef,
    threshold = 0.1,
    rootMargin = "0px",
    loadMoreButton,
}: AppendLoadingProps) {
    const sentinelRef = useRef<HTMLDivElement | null>(null);

    // trạng thái hiển thị
    const showInitialLoading = isLoading && isEmpty && !isError;
    const showNoData = (isEmpty || isError) && !isLoading;
    const showEdgeLoading = isLoading && !isEmpty && !isError; // có data rồi, đang kéo thêm

    const useButton = !!loadMoreButton?.enabled;
    const label = loadMoreButton?.label ?? "Load more";
    const hideWhenMax = loadMoreButton?.hideWhenMax ?? true;
    const isEnd = loadMoreButton?.isEnd ?? false;
    const classNameButton = loadMoreButton?.classNameButton;

    if (debug) {
        console.log({ appendSide, showInitialLoading, showNoData, showEdgeLoading });
    }

    // Observer cho sentinel
    useEffect(() => {
        if (useButton) return; // nếu dùng button thì không observer

        const rootEl = containerRef?.current;
        const target = sentinelRef.current;
        if (!rootEl || !target || !onLoadMore || typeof IntersectionObserver === "undefined") return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    if (debug) console.log(`[AppendLoading] ${appendSide} sentinel visible -> onLoadMore()`);
                    onLoadMore();
                }
            },
            { root: rootEl, rootMargin, threshold },
        );

        observer.observe(target);
        return () => observer.disconnect();
    }, [appendSide, onLoadMore, containerRef, rootMargin, threshold, debug]);

    // 1) lần đầu: chỉ hiển thị loader initial
    if (showInitialLoading) {
        return <>{initialLoadingComponent ?? <Loader />}</>;
    }

    // 2) không có dữ liệu (hoặc lỗi) và không loading
    if (showNoData) {
        return <>{noDataComponent ?? <p className="text-muted-foreground text-sm">No Data</p>}</>;
    }

    // 3) đã có dữ liệu
    const TopLoader = loadingIndicatorTop ?? (appendSide === "top" ? <Loader /> : null);

    const BottomLoader =
        loadingIndicatorBottom ??
        footerLoadingComponent ?? // BC
        (appendSide === "bottom" ? <Loader /> : null);

    const LoadMoreButton =
        useButton && (!hideWhenMax || !isEnd) ? (
            <div className="flex justify-center my-3 [grid-column:1/-1]">
                <Button className={classNameButton} variant={"outline"} loading={isLoading} onClick={onLoadMore} disabled={isLoading || isEnd}>
                    {isEnd ? "Fully loaded" : label}
                </Button>
            </div>
        ) : null;

    return (
        <>
            {/* appendSide = 'top' thì sentinel đặt trước children */}
            {appendSide === "top" && (
                <>
                    {showEdgeLoading && TopLoader}
                    {!useButton && <div ref={sentinelRef} style={{ backgroundColor: debug ? "red" : "transparent" }} aria-hidden />}
                    {useButton && LoadMoreButton}
                </>
            )}

            {children}

            {/* appendSide = 'bottom' thì sentinel đặt sau children */}
            {appendSide === "bottom" && (
                <>
                    {showEdgeLoading && BottomLoader}
                    {!useButton && <div ref={sentinelRef} style={{ backgroundColor: debug ? "red" : "transparent", height: "2px" }} aria-hidden />}
                    {useButton && LoadMoreButton}
                </>
            )}
        </>
    );
}
