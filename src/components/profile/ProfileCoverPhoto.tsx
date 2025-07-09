import { Paper } from "@mantine/core";

export default function ProfileCoverPhoto() {
    return <Paper sx={{ aspectRatio: `1920 / 720`, width: `100%` }} shadow="lg" radius="lg" withBorder bg="var(--mantine-color-body)"></Paper>;
}
