import { useGetMyFriend, useGetOtherFriend } from "@/api/tantask/friend.tanstack";
import { TFriendShip } from "@/types/friend.type";
import { Box, Stack, Text } from "@mantine/core";
import { forwardRef, useEffect, useRef, useState } from "react";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import Avatar from "../avatar/Avatar";
import { DataStateWrapper } from "../data-state-wrapper/DataStateWrapper";
import ArticleSkeleton from "../skeletons/ArticleSkeleton";

type TProps = {
    height: string;
    filters?: Record<string, any>;
    id?: string;
    type: "my" | "other";
};

export default function FriendList({ height, filters, type, id }: TProps) {
    const totalPageRef = useRef(0);
    const [page, setPage] = useState(1); // CHỈNH: Thay vì const [page]
    const [friends, setFriends] = useState<TFriendShip[]>([]);

    const virtuosoRef = useRef<VirtuosoHandle>(null);
    const pageSize = 9; // số bài mỗi lần load

    const getAllFriend = (() => {
        if (type === "my") return useGetMyFriend;
        return useGetOtherFriend;
    })()({
        pagination: { pageIndex: page, pageSize },
        filters,
        id: id,
        sort: { sortBy: `createdAt`, isDesc: true },
    });

    // Khi fetch thành công, append friends vào cuối mảng
    useEffect(() => {
        if (!getAllFriend.data?.items) return;
        setFriends((prev) => {
            const friends = getAllFriend.data.items;
            if (prev.length === 0) return friends;
            return [...friends, ...prev];
        });
    }, [getAllFriend.data?.items, page]);

    const handleEndReached = () => {
        if (getAllFriend.isFetching || page >= totalPageRef.current) return;
        setPage((prev) => prev + 1);
    };

    return (
        <>
            <Stack style={{ position: "relative", height: height }}>
                <Text fw={`bold`} fz={`lg`}>
                    Bạn bè
                </Text>
                <Stack style={{ position: "relative", height: height }}>
                    <DataStateWrapper
                        isLoading={getAllFriend.isLoading || getAllFriend.isFetching}
                        isError={getAllFriend.isError}
                        isEmpty={!getAllFriend.data || getAllFriend.data.items?.length === 0}
                        loadingComponent={<ArticleSkeleton />}
                    >
                        <Virtuoso
                            ref={virtuosoRef}
                            data={friends}
                            style={{ height: "100%" }}
                            components={{
                                List: GridList,
                            }}
                            itemContent={(i, friend: TFriendShip) => {
                                return (
                                    <Stack gap={5}>
                                        <Avatar
                                            sx={{ width: `auto`, height: `auto`, aspectRatio: `1 / 1` }}
                                            fullName={friend.Friends.fullName}
                                            avatar={friend.Friends.avatar}
                                            radius={`md`}
                                        />
                                        <Text ta={`center`} fw={`bold`}>
                                            {friend.Friends.fullName}
                                        </Text>
                                    </Stack>
                                );
                            }}
                            endReached={handleEndReached}
                        />
                    </DataStateWrapper>
                </Stack>
            </Stack>
        </>
    );
}

const GridList = forwardRef(({ style, children, ...props }: any, ref) => (
    <Box
        ref={ref}
        {...props}
        style={style} // Sử dụng style, nếu Virtuoso truyền xuống
        sx={(theme) => ({
            display: `grid`,
            gridTemplateColumns: `1fr 1fr 1fr`,
            gap: theme.spacing.md,
        })}
    >
        {children}
    </Box>
));
GridList.displayName = "GridList";
