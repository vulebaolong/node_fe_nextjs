import { TStateChat } from "@/types/chat.type";
import { Divider, Stack } from "@mantine/core";
import MessageHeader from "../chat/chat-user-item/message-header/MessageHeader";
import MessageInput from "../chat/chat-user-item/message-input/MessageInput";

type TProps = {
    stateChat: TStateChat;
};

export default function ChatUser({ stateChat }: TProps) {
    return (
        <Stack>
            <MessageHeader stateChat={stateChat} />
            <Divider />
            {/* <MessageList stateChat={stateChat} dataSendMessage={dataSendMessage} /> */}
            <Divider />
            <MessageInput stateChat={stateChat} />
        </Stack>
    );
}
