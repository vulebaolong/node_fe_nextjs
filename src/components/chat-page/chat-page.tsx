"use client";

import { TStateChat } from "@/types/chat.type";
import { Box, Group } from "@mantine/core";
import { useState } from "react";
import ChatGroupList from "./chat-group-list";
import ChatUser from "./chat-user";

export default function ChatPage() {
    const [chat, setChat] = useState<TStateChat | null>(null);
    return (
        <Group
            sx={{
                height: "100vh",
                display: "flex",
                flexWrap: "nowrap",
            }}
        >
            <Box sx={{ flexBasis: "40%", height: "100%" }}>
                <ChatGroupList setChat={setChat} />
            </Box>

            <Box sx={{ flexBasis: "60%", height: "100%" }}>{chat && <ChatUser stateChat={chat} />}</Box>
        </Group>
    );
}
