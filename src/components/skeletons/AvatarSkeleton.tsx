import { Group, Skeleton } from "@mantine/core";

export default function AvatarSkeleton() {
    return (
        <Group sx={{ gap: 5, alignItems: `center`, height: `48px`, flexWrap: `nowrap` }}>
            <Skeleton sx={{ flexShrink: 0, height: `38px`, width: `38px` }} circle />
            <Skeleton height={15} radius="xl" />
        </Group>
    );
}
