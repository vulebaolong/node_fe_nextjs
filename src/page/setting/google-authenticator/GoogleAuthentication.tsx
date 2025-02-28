import ModalGoogleAuthenticator from "@/components/modal/google-authenticator/ModalGoogleAuthenticator";
import { useAppSelector } from "@/redux/hooks";
import { useGetInfo } from "@/tantask/auth.tanstack";
import { useOnOffGoogleAuthenticator } from "@/tantask/google-authenticator.tanstack";
import { ActionIcon, Box, Group, Switch, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconScan } from "@tabler/icons-react";
import { toast } from "react-toastify";
import { resError } from "../../../helpers/function.helper";
import { effectText } from "../../../helpers/motion.helper";

export default function GoogleAuthentication() {
   const info = useAppSelector((state) => state.user.info);
   const [opened, handleModalQrGoogleAuthenticator] = useDisclosure(false);
   const onOffGoogleAuthenticator = useOnOffGoogleAuthenticator();
   const getInfo = useGetInfo();
   

   const handleOnOffGoogleAuthenticator = () => {
      if (!info?.GoogleAuthenticator) {
         handleModalQrGoogleAuthenticator.open();
         return;
      }

      onOffGoogleAuthenticator.mutate(undefined, {
         onSuccess: (data) => {
            toast.success(data);
            getInfo.mutate();
         },
         onError: (error) => {
            console.log(error);
            toast.error(resError(error, `On / Off 2FA failed`));
         },
      });
   };

   return (
      <>
         <Box>
            <Group wrap="nowrap" justify="space-between">
               <Box>
                  <Title order={5}>{effectText(`Authenticator App`)}</Title>
                  <Text c={`dimmed`} size="xs" component="div">
                     {effectText(`Extra protection layers for your acount when logging in on new devices`)}
                  </Text>
               </Box>
               <Group wrap="nowrap" gap={2}>
                  <Switch
                     styles={{
                        track: {
                           cursor: `pointer`,
                        },
                     }}
                     onLabel={`ON`}
                     offLabel={`OFF`}
                     size="md"
                     checked={!!info?.GoogleAuthenticator?.isEnabled}
                     onClick={handleOnOffGoogleAuthenticator}
                  />
                  <ActionIcon size={`md`} onClick={handleModalQrGoogleAuthenticator.open} variant="default" radius="xl" aria-label="Settings">
                     <IconScan style={{ width: "70%", height: "70%" }} stroke={1.5} />
                  </ActionIcon>
               </Group>
            </Group>
         </Box>
         <ModalGoogleAuthenticator opened={opened} close={handleModalQrGoogleAuthenticator.close} />
      </>
   );
}
