import { Group, Skeleton, Stack } from "@mantine/core";

export default function ModalSearchSkeleton() {
    return (
        <Stack gap={2}>
            {Array.from({ length: 3 }).map((_, i) => {
                return (
                    <Group key={i} sx={{ gap: 5, alignItems: `center`, height: `36px`, flexWrap: `nowrap` }}>
                        <Skeleton sx={{ flexShrink: 0, height: `26px`, width: `26px` }} circle />
                        <Skeleton height={10} radius="xl" />
                    </Group>
                );
            })}
        </Stack>
    );
}
