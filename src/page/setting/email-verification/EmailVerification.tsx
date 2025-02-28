import { Box, Group, Switch, Text, Title } from "@mantine/core";
import { effectText } from "../../../helpers/motion.helper";

export default function EmailVerification() {
   return (
      <>
         <Box>
            <Group wrap="nowrap" justify="space-between">
               <Box>
                  <Title order={5}>{effectText(`Email Verification`)}</Title>
                  <Text c={`dimmed`} size="xs" component="div">
                     {effectText(`Email address is used for login`)}
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
                     // checked={!!info?.GoogleAuthenticator?.isEnabled}
                     // onClick={handleOnOffGoogleAuthenticator}
                  />
                  {/* <ActionIcon size={`md`} variant="default" radius="xl" aria-label="Settings">
                     <IconScan style={{ width: "70%", height: "70%" }} stroke={1.5} />
                  </ActionIcon> */}
               </Group>
            </Group>
         </Box>
      </>
   );
}
