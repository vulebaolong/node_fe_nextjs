import Nodata from "@/components/no-data/Nodata";
import TagUser from "@/components/tag-user/TagUser";
import { SOCKET_CHAT_MES } from "@/constant/chat.constant";
import { addUserToChatList, listenToEvent } from "@/helpers/chat.helper";
import { useSocket } from "@/hooks/socket.hook";
import { useAppSelector } from "@/redux/hooks";
import { useFindAllUser } from "@/tantask/user.tanstack";
import { TUser } from "@/types/user.type";
import { Box, Center, Drawer, Loader, Stack } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { Fragment, useEffect, useState } from "react";

type TProps = {
   opened: boolean;
   close: () => void;
};

export default function DrawerListChat({ opened, close }: TProps) {
   const findAllUser = useFindAllUser();
   const userId = useAppSelector((state) => state.user.info?.id);
   const queryClient = useQueryClient();
   const [listIdUserNoti, setListIdUserNoti] = useState<number[]>([]);
   const { socket } = useSocket();

   const handleClickUser = (user: TUser) => {
      close();
      addUserToChatList({ ava: user.avatar, id: user.id, name: user.fullName, roleId: user.roleId }, () => {
         queryClient.invalidateQueries({ queryKey: [`chat-list-user-item`] });
         queryClient.invalidateQueries({ queryKey: [`chat-list-user-bubble`] });
      });
   };

   useEffect(() => {
      if (socket) {
         listenToEvent(socket, SOCKET_CHAT_MES.NOTI_MESSAGE, (data) => {
            console.log({ data });
            setListIdUserNoti((prev) => {
               return [...prev, data.payload.userIdSender];
            });
            queryClient.invalidateQueries({ queryKey: ["user-list"] });
         });
      }
   }, [socket]);

   const renderContent = () => {
      if (findAllUser.isLoading) {
         return (
            <Center h={`100%`}>
               <Loader />
            </Center>
         );
      }

      if (!findAllUser.data || findAllUser.data.items.length === 0 || findAllUser.isError) {
         return (
            <Center h={`100%`}>
               <Nodata />
            </Center>
         );
      }

      return (
         <>
            {findAllUser.data?.items?.map((user, i) => {
               if (user.id === userId) return <Fragment key={i}></Fragment>;
               return (
                  <Box
                     key={i}
                     onClick={() => {
                        handleClickUser(user);
                     }}
                     style={{ cursor: "pointer" }}
                  >
                     <TagUser user={user} fw={listIdUserNoti.includes(user.id) ? `bold` : `normal`} />
                  </Box>
               );
            })}
         </>
      );
   };

   return (
      <Drawer offset={8} radius="lg" size="100%" opened={opened} onClose={close}>
         <Stack pt={20}>{renderContent()}</Stack>
      </Drawer>
   );
}
