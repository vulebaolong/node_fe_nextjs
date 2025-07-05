import { SOCKET_CHAT_MES } from "@/constant/chat.constant";
import { emitToEvent } from "@/helpers/chat.helper";
import { getAccessToken } from "@/helpers/cookies.helper";
import { useSocket } from "@/hooks/socket.hook";
import { useAppSelector } from "@/redux/hooks";
import { TSendMessageReq, TStateChat } from "@/types/chat.type";
import { ActionIcon, Box, Group, Popover, Textarea, useMantineColorScheme } from "@mantine/core";
import { getHotkeyHandler } from "@mantine/hooks";
import { IconMoodSmile, IconSend2 } from "@tabler/icons-react";
import Picker, { Theme } from "emoji-picker-react";
import * as emoji from "node-emoji";
import { useState } from "react";
import { toast } from "react-toastify";

type TProps = {
    stateChat: TStateChat;
};

export default function MessageInput({ stateChat }: TProps) {
    const userId = useAppSelector((state) => state.user.info?._id);
    const email = useAppSelector((state) => state.user.info?.email);
    const { socket, isConnected } = useSocket();
    const [value, setValue] = useState("");
    const [opened, setOpened] = useState(false);
    const { colorScheme } = useMantineColorScheme();

    const handleEmoji = (e: any) => {
        const emoji = e.emoji;
        setValue((prevValue) => prevValue + emoji);
    };

    const handleSubmit = async () => {
        if (!isConnected) return toast.warning(`isConnected: ${isConnected}`);
        if (!userId) return toast.warning(`userId: ${userId}`);
        if (!email) return toast.warning(`email: ${email}`);
        if (value.trim() === ``) return;
        if (!isConnected) return toast.warning(`Disconnected. Refresh to reconnect.`);
        if (!stateChat.chatGroupId) return toast.warning(`ChatGroupId: ${stateChat.chatGroupId}`);
        const accessToken = await getAccessToken();
        if (!accessToken) return toast.error("Vui lòng đăng nhập");

        const payload: TSendMessageReq = {
            message: value,
            accessToken,
            chatGroupId: stateChat.chatGroupId,
        };
        emitToEvent(socket, SOCKET_CHAT_MES.SEND_MESSAGE, payload, () => {});
        setValue(``);
    };
    return (
        <Box
            sx={(_, u) => {
                return {
                    padding: 10,
                    position: `relative`,
                    zIndex: 2,
                    [u.dark]: {
                        backgroundColor: `var(--mantine-color-dark-6)`,
                    },
                    [u.light]: {
                        backgroundColor: `var(--mantine-color-gray-2)`,
                    },
                };
            }}
            p={10}
        >
            <Group gap={2} align="center">
                <Textarea
                    disabled={!stateChat.chatGroupId}
                    radius="xl"
                    onKeyDown={getHotkeyHandler([["Enter", handleSubmit]])}
                    placeholder="Write a message..."
                    size="sm"
                    style={{ flex: `1` }}
                    value={emoji.emojify(value)}
                    onChange={(event) => setValue(event.target.value)}
                    autosize
                    minRows={1}
                    maxRows={5}
                    sx={(_, u) => {
                        return {
                            "& textarea, & input": {
                                [u.dark]: {
                                    color: `white`,
                                },
                                [u.light]: {
                                    color: `black`,
                                },
                                fontSize: `14px`,
                                fontWeight: 400,
                                whiteSpace: `pre-wrap`,
                                unicodeBidi: `isolate`,
                                wordWrap: `break-word`,
                                wordBreak: `break-word`,
                            },
                        };
                    }}
                    styles={{
                        section: {
                            width: `fit-content`,
                            padding: `0 5px`,
                        },
                    }}
                />
                <Popover
                    opened={opened}
                    onChange={setOpened}
                    position="top-end"
                    offset={{ mainAxis: 10, crossAxis: 60 }}
                    styles={{
                        dropdown: {
                            backgroundColor: "transparent",
                            border: "none",
                            padding: 0,
                        },
                    }}
                >
                    <Popover.Target>
                        <ActionIcon onClick={() => setOpened((o) => !o)} variant={colorScheme} radius="xl" aria-label="Settings">
                            <IconMoodSmile style={{ width: "70%", height: "70%" }} stroke={1.5} />
                        </ActionIcon>
                    </Popover.Target>
                    <Popover.Dropdown>
                        <Picker
                            previewConfig={{ showPreview: false }}
                            reactionsDefaultOpen={true}
                            onReactionClick={handleEmoji}
                            onEmojiClick={handleEmoji}
                            theme={colorScheme as Theme}
                            // theme={Theme.DARK}
                            width={340}
                            height={400}
                        />
                    </Popover.Dropdown>
                </Popover>
                <ActionIcon onClick={handleSubmit} variant="subtle" size={`lg`} style={{ borderRadius: `100%` }}>
                    <IconSend2 />
                </ActionIcon>
            </Group>
        </Box>
    );
}
