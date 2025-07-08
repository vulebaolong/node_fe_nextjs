import { Group, Skeleton, Stack } from "@mantine/core";

export default function ArticleSkeleton({ ...props }: any) {
    return (
        <Stack gap={20} sx={{ position: `absolute`, top: 0, left: 0, width: `100%`, height: `100%` }} {...props}>
            {Array.from({ length: 1 }).map((_, i) => {
                return (
                    <Stack key={i} px={10}>
                        <Group sx={{ gap: 5, alignItems: `center`, height: `48px`, flexWrap: `nowrap`, maxWidth: `200px`, width: `100%` }}>
                            <Skeleton sx={{ flexShrink: 0, height: `38px`, width: `38px` }} circle />
                            <Stack sx={{ width: `100%` }} gap={5}>
                                <Skeleton height={15} radius="xl" />
                                <Skeleton height={10} width={`70%`} radius="xl" />
                            </Stack>
                        </Group>
                        <Stack gap={5}>
                            {Array.from({ length: 5 }).map((_, i) => {
                                return <Skeleton key={i} height={10} radius="xl" />;
                            })}
                        </Stack>
                        <Skeleton height={500} radius={20}></Skeleton>
                    </Stack>
                );
            })}
        </Stack>
    );
}
