import { TArticle } from "@/types/article.type";
import { Box, Transition } from "@mantine/core";
import { IconThumbUp } from "@tabler/icons-react";
import { iconsReaction } from "../button-like/ButtonLike";

type TProps = {
    reactionType: TArticle["reaction"];
};

export default function IconReaction({ reactionType }: TProps) {
    return (
        <Box>
            <Transition enterDelay={400} mounted={reactionType === null} transition="slide-left" duration={400} timingFunction="ease">
                {(styles) => (
                    <div style={styles}>
                        <IconThumbUp size={20} />
                    </div>
                )}
            </Transition>

            {Object.entries(iconsReaction).map(([key, IconComp]) => (
                <Transition enterDelay={400} mounted={reactionType === key} key={key} transition="slide-left" duration={400} timingFunction="ease">
                    {(styles) => <div style={styles}>{IconComp(20)}</div>}
                </Transition>
            ))}

        </Box>
    );
}
