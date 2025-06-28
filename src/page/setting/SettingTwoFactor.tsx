import ImageCustom from "@/components/custom/image-custom/ImageCustom";
import Paper from "@/components/custom/paper/PaperCustom";
import { Logo } from "@/components/logo/Logo";
import QRImage from "@/components/qr-image/QRImage";
import { resError } from "@/helpers/function.helper";
import { useIsMobile } from "@/hooks/is-mobile.hook";
import { useAppSelector } from "@/redux/hooks";
import { useGetInfoMutation } from "@/tantask/auth.tanstack";
import { useTotpDisable, useTotpGenerate, useTotpSave } from "@/tantask/totp.tanstack";
import { TPayloadTotpSave } from "@/types/totp.type";
import {
   ActionIcon,
   Box,
   Button,
   Center,
   Collapse,
   CopyButton,
   Group,
   Loader,
   PinInput,
   Stack,
   Stepper,
   Switch,
   Text,
   Title,
   Tooltip,
   Transition,
} from "@mantine/core";
import { IconCheck, IconCopy, IconX } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "react-toastify";

export default function SettingTwoFactor() {
   const t = useTranslations("setting");
   const isMobile = useIsMobile();
   const isTotp = useAppSelector((state) => state.user.info?.isTotp);
   const [active, setActive] = useState(-1);

   const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
   const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

   const totpGenerate = useTotpGenerate();
   const totpSave = useTotpSave();
   const totpDisable = useTotpDisable();
   const getInfo = useGetInfoMutation();

   const handleOnOffGoogleAuthenticator = async () => {
      if (!isTotp) {
         totpGenerate.mutate(undefined, {
            onSuccess: () => {
               nextStep();
            },
         });
      } else {
         totpDisable.mutate(undefined, {
            onSuccess: () => {
               toast.success(`Off Google Authenticator Successfully`);
               getInfo.mutate();
            },
         });
      }
   };

   const handleComplete = (token: string) => {
      if (!totpGenerate.data?.secret) return toast.error(`Not have secret`);
      const payload: TPayloadTotpSave = {
         secret: totpGenerate.data?.secret,
         token,
      };
      totpSave.mutate(payload, {
         onSuccess: () => {
            toast.success(`Verify Code Successfully`);
            nextStep();
         },
         onError: (error) => {
            toast.error(resError(error, `Verify Code Error`));
         },
      });
   };

   const handleFinish = async () => {
      getInfo.mutate(undefined, {
         onSuccess: () => {
            nextStep();
            setActive(-1);
         },
      });
   };

   return (
      <>
         <Title
            order={2}
            mt="sm"
            sx={{
               fontWeight: 900,
               fontSize: `clamp(20px, 3vw, 28px)`,
            }}
         >
            {t(`Two-factor authentication (2FA)`)}
         </Title>

         <Paper shadow="sm">
            <Stack>
               <Group sx={{ width: `100%`, justifyContent: `space-between` }}>
                  <Title
                     order={2}
                     mt="sm"
                     sx={{
                        fontWeight: 900,
                        fontSize: `clamp(14px, 2vw, 18px)`,
                     }}
                  >
                     {t(`Google Authenticator`)}
                  </Title>

                  <Switch
                     checked={isTotp}
                     onChange={handleOnOffGoogleAuthenticator}
                     size={isMobile ? `md` : `lg`}
                     thumbIcon={
                        active > -1 ? (
                           <Loader size={12} />
                        ) : isTotp ? (
                           <IconCheck size={12} color="var(--mantine-color-teal-6)" stroke={3} />
                        ) : (
                           <IconX size={12} color="var(--mantine-color-red-6)" stroke={3} />
                        )
                     }
                  />
               </Group>

               <Collapse in={active > -1} transitionDuration={500} transitionTimingFunction="linear">
                  <Box>
                     <Stepper size="xs" active={active} onStepClick={setActive}>
                        <Stepper.Step allowStepSelect={false}></Stepper.Step>
                        <Stepper.Step allowStepSelect={false}></Stepper.Step>
                        <Stepper.Step allowStepSelect={false}></Stepper.Step>
                     </Stepper>
                  </Box>

                  <Stack justify="center" h={450}>
                     <Transition enterDelay={400} mounted={active === 0} transition="slide-right" duration={400} timingFunction="ease">
                        {(styles) => (
                           <div style={{ ...styles }}>
                              <Stack>
                                 <Center>
                                    <Logo width={60} />
                                 </Center>
                                 <Center>
                                    {totpGenerate.data?.qrCode && (
                                       <QRImage
                                          width="200px"
                                          height="200px"
                                          paddingImageCenter={`5px`}
                                          isPending={totpGenerate.isPending}
                                          qr={totpGenerate.data.qrCode}
                                          srcImageCenter={`/images/logo/logo-512x512.png`}
                                       />
                                    )}
                                 </Center>
                                 <Box>
                                    <Center>
                                       <Text>Generate QR Code</Text>
                                    </Center>
                                    <Center>
                                       <Group
                                          style={{
                                             gap: `2px`,
                                             borderRadius: `10px`,
                                             border: `1px solid gray`,
                                             alignItems: `center`,
                                             justifyContent: `center`,
                                          }}
                                          p={5}
                                       >
                                          <Text>{totpGenerate.data?.secret}</Text>
                                          <CopyButton value={totpGenerate.data?.secret || ``} timeout={2000}>
                                             {({ copied, copy }) => (
                                                <Tooltip label={copied ? "Copied" : "Copy"} withArrow position="right">
                                                   <ActionIcon
                                                      color={copied ? "teal" : "gray"}
                                                      variant="subtle"
                                                      onClick={(e) => {
                                                         e.stopPropagation();
                                                         copy();
                                                      }}
                                                   >
                                                      {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                                                   </ActionIcon>
                                                </Tooltip>
                                             )}
                                          </CopyButton>
                                       </Group>
                                    </Center>
                                 </Box>
                              </Stack>
                           </div>
                        )}
                     </Transition>

                     <Transition enterDelay={400} mounted={active === 1} transition="slide-right" duration={400} timingFunction="ease">
                        {(styles) => (
                           <div style={{ ...styles }}>
                              <Stack>
                                 <Center>
                                    <Text fz={20} fw={`bold`}>
                                       Verify Code
                                    </Text>
                                 </Center>
                                 <Center>
                                    <Text>Enter the 6-digit code from your Google Authenticator app</Text>
                                 </Center>
                                 <Center>
                                    <Box pos={`relative`}>
                                       <PinInput length={6} disabled={totpGenerate.isPending} onComplete={handleComplete} />
                                       {totpGenerate.isPending && (
                                          <Center style={{ position: `absolute`, top: `50%`, left: `50%`, transform: `translate(-50%,-50%)` }}>
                                             <Loader size={20} />
                                          </Center>
                                       )}
                                    </Box>
                                 </Center>
                              </Stack>
                           </div>
                        )}
                     </Transition>

                     <Transition
                        enterDelay={400}
                        mounted={active === 2 || active === 3}
                        transition="slide-right"
                        duration={400}
                        timingFunction="ease"
                     >
                        {(styles) => (
                           <div style={{ ...styles }}>
                              <Stack>
                                 <Center>
                                    <Box w={150}>
                                       <ImageCustom src={`/images/auth/${!!totpSave.data}.webp`} alt="" />
                                    </Box>
                                 </Center>
                                 <Text ta={`center`} fz={20} fw={`bold`}>
                                    Success Confirmation
                                 </Text>
                                 <Text ta={`center`} c={`gray`}>
                                    Google Authenticator Setup Successfully
                                 </Text>
                              </Stack>
                           </div>
                        )}
                     </Transition>
                  </Stack>

                  <Center>
                     {active === 0 && (
                        <Button w="120px" onClick={nextStep} variant="filled">
                           Next
                        </Button>
                     )}

                     {active === 1 && (
                        <Group>
                           <Button onClick={prevStep} w="120px" variant="default">
                              Back
                           </Button>
                        </Group>
                     )}

                     {active === 2 && (
                        <Button w="120px" onClick={handleFinish} variant="filled">
                           {!!totpSave.data ? `Finish` : `Try Again`}
                        </Button>
                     )}
                  </Center>
               </Collapse>
            </Stack>
         </Paper>
      </>
   );
}
