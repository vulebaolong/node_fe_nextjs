import { useGetInfo } from "@/tantask/auth.tanstack";
import { useGetQrGoogleAuthenticator } from "@/tantask/google-authenticator.tanstack";
import { ActionIcon, Box, Center, Loader, Modal, Stack, Text, Title } from "@mantine/core";
import { IconScan, IconX } from "@tabler/icons-react";
import Image from "next/image";
import { useEffect } from "react";
import Nodata from "../../no-data/Nodata";

type TProps = {
   opened: boolean;
   close: () => void;
};
export default function ModalGoogleAuthenticator({ opened, close }: TProps) {
   const getQrGoogleAuthenticator = useGetQrGoogleAuthenticator();
   const getInfo = useGetInfo();

   useEffect(() => {
      if (!opened) return;

      getQrGoogleAuthenticator.mutate(undefined, {
         onSuccess: () => {
            getInfo.mutate();
         },
      });
   }, [opened]);

   const renderContent = () => {
      if (getQrGoogleAuthenticator.isPending)
         return (
            <Center h={`100%`} w={`100%`}>
               <Loader />
            </Center>
         );

      if (!getQrGoogleAuthenticator.data || !getQrGoogleAuthenticator.data.qrCode || getQrGoogleAuthenticator.isError) {
         return (
            <Center h={`100%`} w={`100%`}>
               <Nodata />
            </Center>
         );
      }

      return (
         <Stack>
            <Center>
               <Box w={`80%`}>
                  <Image
                     alt=""
                     src={getQrGoogleAuthenticator.data.qrCode}
                     width={0}
                     height={0}
                     sizes="100vw"
                     style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: `20px` }}
                  />
               </Box>
            </Center>

            <Center>
               <Text>{getQrGoogleAuthenticator.data.secret}</Text>
            </Center>
         </Stack>
      );
   };

   return (
      <Modal opened={opened} onClose={close} centered radius={`xl`} size={`xs`} withCloseButton={false}>
         <Stack>
            <Center>
               <IconScan size={30} />
            </Center>

            <Title ta={`center`} order={4}>
               Scan This QR Code
            </Title>

            <Box>{renderContent()}</Box>

            <Center w={`100%`}>
               <ActionIcon onClick={close} variant="default" radius="xl" aria-label="Settings">
                  <IconX style={{ width: "70%", height: "70%" }} stroke={1.5} />
               </ActionIcon>
            </Center>
         </Stack>
      </Modal>
   );
}
