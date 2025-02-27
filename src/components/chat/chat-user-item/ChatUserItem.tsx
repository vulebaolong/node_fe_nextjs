import TagUser from "@/components/tag-user/TagUser";
import { TChatListItem } from "@/types/chat.type";
import { TUser } from "@/types/user.type";
import { ActionIcon, Box, Divider, Group, Loader, Stack, TextInput } from "@mantine/core";
import classes from "./ChatUserItem.module.css";
import { useState } from "react";
import { getHotkeyHandler } from "@mantine/hooks";
import { IconSend2, IconX } from "@tabler/icons-react";
import { CHAT_LIST_ID } from "@/constant/chat.constant";
import _ from "lodash";
import { useQueryClient } from "@tanstack/react-query";

type TProps = {
   item: TChatListItem;
   i: number;
};

export default function ChatUserItem({ item, i }: TProps) {
   const [value, setValue] = useState("");
   const queryClient = useQueryClient();

   const handleSubmit = () => {
      // if (!userSelected || !info) return;

      // socketRef.current.emit("send-message", {
      //    message: value,
      //    user_id_sender: info.user_id,
      //    user_id_recipient: userSelected.user_id,
      // });
      console.log(`handleSubmit`);
      setValue(``);
   };

     const handleDeleteListChat = (e: any) => {
         e.stopPropagation();
   
         const stringLocal = localStorage.getItem(CHAT_LIST_ID);
         const listChatLocal = stringLocal ? JSON.parse(stringLocal) : [];
   
         if (_.isArray(listChatLocal)) {
            _.remove(listChatLocal, (itemChat) => itemChat.id === item.id);
            localStorage.setItem(CHAT_LIST_ID, JSON.stringify(listChatLocal));
            queryClient.invalidateQueries({ queryKey: [`chat-list-id`] });
         }
      };

   return (
      <Stack
         gap={0}
         style={{
            width: `340px`,
            height: `455px`,
            position: `fixed`,
            bottom: 0,
            right: `${340 * (i + 1) - 250 + 10 * i}px`,
            boxShadow: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px`,
            border: `1px solid var(--divider-size) var(--divider-border-style, solid) var(--divider-color)`,
            borderRadius: `10px`,
         }}
         className={`${classes[`box-1`]}`}
      >
         <Group p={10} justify="space-between">
            <TagUser user={{ avatar: item.ava, fullName: item.name } as TUser} />
            <ActionIcon onClick={handleDeleteListChat} variant="subtle" color="indigo" radius="xl" aria-label="Settings">
               <IconX style={{ width: "70%", height: "70%" }} stroke={1.5} />
            </ActionIcon>
         </Group>
         <Divider />
         <Stack style={{ flex: `1`, overflowY: `auto` }} px={`10px`}></Stack>
         <Divider />
         {/* input chat */}
         <Group p={`10px`}>
            <TextInput
               onKeyDown={getHotkeyHandler([["Enter", handleSubmit]])}
               placeholder="Aa"
               size="sm"
               style={{ flex: `1` }}
               radius="xl"
               value={value}
               onChange={(event) => setValue(event.target.value)}
            />
            {false ? (
               <Loader size={`sm`} />
            ) : (
               <ActionIcon onClick={handleSubmit} variant="subtle" size={`lg`} style={{ borderRadius: `100%` }}>
                  <IconSend2 />
               </ActionIcon>
            )}
         </Group>
      </Stack>
   );
}
