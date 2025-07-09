"use client";

import { ActionIcon, Anchor, Box, Center, Group, Modal, PinInput, rem, Stack, Text } from "@mantine/core";
import { IconBrandFacebook } from "@tabler/icons-react";

type TProps = {
   opened: boolean;
   close: () => void;
   onComplete?: (value: string) => void;
};

function ModalVerifyGA({ opened, close, onComplete }: TProps) {
   return (
      <Modal
         styles={{
            content: { borderRadius: `20px` },
         }}
         opened={opened}
         onClose={close}
         centered
         title={<Text style={{ textAlign: `center`, fontSize: `18px`, fontWeight: `700` }}>Verify google authenticator</Text>}
         trapFocus={false}
         transitionProps={{ transition: "slide-right" }}
      >
         <Stack gap={50}>
            <Stack py={50}>
               <Text style={{ textAlign: `center`, fontSize: `25px`, fontWeight: `900` }}>Verify Code</Text>
               <Text style={{ textAlign: `center`, padding: `0px 20px` }} mt={20}>
                  Enter the 6-digit code from your Google Authenticator app to verify
               </Text>
               <Center>
                  <Box pos={`relative`}>
                     <PinInput length={6} onComplete={onComplete} />
                     {/* {loading && (
                        <Center style={{ position: `absolute`, top: `50%`, left: `50%`, transform: `translate(-50%,-50%)` }}>
                           <Loader size={20} />
                        </Center>
                     )} */}
                  </Box>
               </Center>
            </Stack>

            <Center>
               <Group align="center" gap={10}>
                  <Anchor href={"#"} target="_blank" inherit style={{ textDecoration: `none` }}>
                     <Text>Support Center</Text>
                  </Anchor>
                  <ActionIcon
                     onClick={() => window.open("#", "_blank")}
                     size="lg"
                     variant="subtle"
                     radius="xl"
                  >
                     <IconBrandFacebook href={"#"} style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                  </ActionIcon>
               </Group>
            </Center>
         </Stack>
      </Modal>
   );
}

export default ModalVerifyGA;
