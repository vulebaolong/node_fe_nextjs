// import ImageCustom from "@/components/custom/image-custom/ImageCustom";
// import Paper from "@/components/custom/paper/PaperCustom";
// import QRImage from "@/components/qr-image/QRImage";
// import { resError } from "@/helpers/function.helper";
// import { useAppSelector } from "@/redux/hooks";
// import { useDisableSecrect, useGenerateGa, useGetInfoMutation, useSaveSecrect } from "@/tantask/auth.tanstack";
// import { TPayloadSaveSecret } from "@/types/auth.type";
// import {
//    ActionIcon,
//    Box,
//    Button,
//    Center,
//    Collapse,
//    CopyButton,
//    Group,
//    Loader,
//    PinInput,
//    Stack,
//    Stepper,
//    Switch,
//    Text,
//    Title,
//    Tooltip,
//    Transition,
// } from "@mantine/core";
// import { IconCheck, IconCopy } from "@tabler/icons-react";
// import { useTranslations } from "next-intl";
// import { useState } from "react";
// import { toast } from "react-toastify";

// export default function SettingGoogleAuthenticator() {
//    const t = useTranslations("setting");
//    const info = useAppSelector((state) => state.user.info);
//    const getInfo = useGetInfoMutation();
//    const [active, setActive] = useState(-1);

//    const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
//    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

//    const generateGa = useGenerateGa();
//    const saveSecrect = useSaveSecrect();
//    const disableSecrect = useDisableSecrect();

//    const handleOnOffGoogleAuthenticator = () => {
//       if (info?.googleAuthenticator) {
//          disableSecrect.mutate(undefined, {
//             onSuccess: (data) => {
//                if(data.status) {
//                   toast.success(`Disable Google Authenticator Successfully`);
//                } else {
//                   toast.error(`Disable Google Authenticator Failed`);
//                }
//                getInfo.mutate();
//             },
//             onError: (error) => {
//                console.log(error);
//                toast.error(resError(error, `Disable Google Authenticator Error`));
//             }
//          });
//       } else {
//          generateGa.mutate(undefined, {
//             onSuccess: (data) => {
//                console.log({ data });
//                nextStep();
//             },
//          });
//       }
//    };

//    const handleComplete = (token: string) => {
//       if (!generateGa.data?.secret) return toast.error(`Not have secret`);
//       const payload: TPayloadSaveSecret = {
//          secret: generateGa.data?.secret,
//          token,
//       };
//       saveSecrect.mutate(payload, {
//          onSuccess: (data) => {
//             if (data.status) {
//                toast.success(`Verify Code Successfully`);
//             } else {
//                toast.error(`Verify Code Failed`);
//             }
//             nextStep();
//          },
//          onError: (error) => {
//             console.log(error);
//             toast.error(resError(error, `Verify Code Error`));
//          },
//       });
//    };

//    const handleFinish = async () => {
//       getInfo.mutate(undefined, {
//          onSuccess: () => {
//             nextStep();
//             setActive(-1);
//          },
//          onError: (error) => {
//             console.log(error);
//             toast.error(resError(error, `Verify Code Error`));
//             setTimeout(() => {
//                window.location.reload();
//             }, 3000);
//          },
//       });
//    };

//    return (
//       <>
//          <Title
//             order={2}
//             mt="sm"
//             sx={{
//                fontWeight: 900,
//                fontSize: `clamp(20px, 3vw, 28px)`,
//             }}
//          >
//             {t(`Google Authenticator (2FA)`)}
//          </Title>

//          <Paper shadow="sm">
//             <Stack gap={active > -1 ? 10 : 0}>
//                <Group sx={{ width: `100%`, justifyContent: `space-between` }}>
//                   <Title
//                      order={2}
//                      sx={{
//                         fontWeight: 900,
//                         fontSize: `clamp(14px, 2vw, 18px)`,
//                      }}
//                   >
//                      {t(`Display mode`)}
//                   </Title>

//                   <Group wrap="nowrap" gap={2}>
//                      {/* {info?.googleAuthenticator && (
//                         <ActionIcon size={`md`} onClick={handleModalQrGoogleAuthenticator.open} variant="default" radius="xl" aria-label="Settings">
//                            <IconScan style={{ width: "70%", height: "70%" }} stroke={1.5} />
//                         </ActionIcon>
//                      )} */}
//                      <Switch
//                         styles={{
//                            track: {
//                               cursor: `pointer`,
//                            },
//                         }}
//                         onLabel={`ON`}
//                         offLabel={`OFF`}
//                         size="md"
//                         checked={!!info?.googleAuthenticator}
//                         onClick={handleOnOffGoogleAuthenticator}
//                      />
//                   </Group>
//                </Group>

//                <Collapse in={active > -1} transitionDuration={500} transitionTimingFunction="linear">
//                   <Box>
//                      <Stepper size="xs" active={active} onStepClick={setActive}>
//                         <Stepper.Step allowStepSelect={false}></Stepper.Step>
//                         <Stepper.Step allowStepSelect={false}></Stepper.Step>
//                         <Stepper.Step allowStepSelect={false}></Stepper.Step>
//                      </Stepper>
//                   </Box>

//                   <Stack justify="center" h={400}>
//                      <Transition enterDelay={400} mounted={active === 0} transition="slide-right" duration={400} timingFunction="ease">
//                         {(styles) => (
//                            <div style={{ ...styles }}>
//                               <Stack>
//                                  <Center>
//                                     {generateGa.data?.qrCode && (
//                                        <QRImage
//                                           width="200px"
//                                           height="200px"
//                                           isPending={saveSecrect.isPending}
//                                           qr={generateGa.data.qrCode}
//                                           srcImageCenter={`/logo/logo-nail2.png`}
//                                        />
//                                     )}
//                                  </Center>
//                                  <Box>
//                                     <Center>
//                                        <Text>Generate QR Code</Text>
//                                     </Center>
//                                     <Center>
//                                        <Group
//                                           style={{
//                                              gap: `2px`,
//                                              borderRadius: `10px`,
//                                              border: `1px solid gray`,
//                                              alignItems: `center`,
//                                              justifyContent: `center`,
//                                           }}
//                                           p={5}
//                                        >
//                                           <Text>{generateGa.data?.secret}</Text>
//                                           <CopyButton value={generateGa.data?.secret || ``} timeout={2000}>
//                                              {({ copied, copy }) => (
//                                                 <Tooltip label={copied ? "Copied" : "Copy"} withArrow position="right">
//                                                    <ActionIcon
//                                                       color={copied ? "teal" : "gray"}
//                                                       variant="subtle"
//                                                       onClick={(e) => {
//                                                          e.stopPropagation();
//                                                          copy();
//                                                       }}
//                                                    >
//                                                       {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
//                                                    </ActionIcon>
//                                                 </Tooltip>
//                                              )}
//                                           </CopyButton>
//                                        </Group>
//                                     </Center>
//                                  </Box>
//                               </Stack>
//                            </div>
//                         )}
//                      </Transition>

//                      <Transition enterDelay={400} mounted={active === 1} transition="slide-right" duration={400} timingFunction="ease">
//                         {(styles) => (
//                            <div style={{ ...styles }}>
//                               <Stack>
//                                  <Center>
//                                     <Text fz={20} fw={`bold`}>
//                                        Verify Code
//                                     </Text>
//                                  </Center>
//                                  <Center>
//                                     <Text>Enter the 6-digit code from your Google Authenticator app</Text>
//                                  </Center>
//                                  <Center>
//                                     <Box pos={`relative`}>
//                                        <PinInput length={6} disabled={saveSecrect.isPending} onComplete={handleComplete} />
//                                        {saveSecrect.isPending && (
//                                           <Center style={{ position: `absolute`, top: `50%`, left: `50%`, transform: `translate(-50%,-50%)` }}>
//                                              <Loader size={20} />
//                                           </Center>
//                                        )}
//                                     </Box>
//                                  </Center>
//                               </Stack>
//                            </div>
//                         )}
//                      </Transition>

//                      <Transition
//                         enterDelay={400}
//                         mounted={active === 2 || active === 3}
//                         transition="slide-right"
//                         duration={400}
//                         timingFunction="ease"
//                      >
//                         {(styles) => (
//                            <div style={{ ...styles }}>
//                               <Stack>
//                                  <Center>
//                                     <Box w={150}>
//                                        <ImageCustom src={`/auth/${!!saveSecrect.data?.status}.webp`} alt="" />
//                                     </Box>
//                                  </Center>
//                                  <Text ta={`center`} fz={20} fw={`bold`}>
//                                     Success Confirmation
//                                  </Text>
//                                  <Text ta={`center`} c={`gray`}>
//                                     Google Authenticator Setup Successfully
//                                  </Text>
//                               </Stack>
//                            </div>
//                         )}
//                      </Transition>
//                   </Stack>

//                   <Center>
//                      {active === 0 && (
//                         <Button w="120px" onClick={nextStep} variant="filled">
//                            Next
//                         </Button>
//                      )}

//                      {active === 1 && (
//                         <Group>
//                            <Button onClick={prevStep} w="120px" variant="default">
//                               Back
//                            </Button>
//                         </Group>
//                      )}

//                      {active === 2 && (
//                         <Button w="120px" onClick={handleFinish} variant="filled">
//                            {!!saveSecrect.data?.status ? `Finish` : `Try Again`}
//                         </Button>
//                      )}
//                   </Center>
//                </Collapse>
//             </Stack>
//          </Paper>
//          {/* <ModalGoogleAuthenticator opened={opened} close={handleModalQrGoogleAuthenticator.close} /> */}
//       </>
//    );
// }
