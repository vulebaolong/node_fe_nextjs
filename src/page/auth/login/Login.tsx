"use client";

import { GoogleButton } from "@/components/buttons/GoogleButton";
import { Logo } from "@/components/logo/Logo";
import { useAppSelector } from "@/redux/hooks";
import { TPayloadLoginGoogleAuthenticator, TStepLogin } from "@/types/auth.type";
import { Box, Center, Divider, Group, Paper, Stack, Title, Transition } from "@mantine/core";
import { useEffect, useState } from "react";
import FooterAuth from "../footer/FooterAuth";
import LoginForm from "./login-form/LoginForm";
import LoginGoogleAuthenticator from "./login-ga/LoginGa";
// import { useGoogleOneTapLogin } from "@react-oauth/google";

export default function Login() {
    //   useGoogleOneTapLogin({
    //       onSuccess: (credentialResponse) => {
    //           console.log(credentialResponse);
    //       },
    //       onError: () => {
    //           console.log("Login Failed");
    //       },
    //   });
   //  const info = useAppSelector((state) => state.user.info);
   //  const { response, history } = useGoogleOneTapLogin(!!info);
   //  console.log({ response, history });

    const [step, setStep] = useState<TStepLogin>("login-form");
    const [payloadLogin, setPayloadLogin] = useState<TPayloadLoginGoogleAuthenticator | null>(null);
    const emailGa = useAppSelector((state) => state.ga.email);

    useEffect(() => {
        if (!emailGa) return;
        setStep("login-google-authentication");
        setPayloadLogin({
            email: emailGa,
            password: null,
            token: null,
            type: "totp",
        });
    }, [emailGa]);

    return (
        <Stack
            sx={(_, u) => {
                return {
                    [u.smallerThan("md")]: {
                        width: "360px",
                    },
                    [u.largerThan("md")]: {
                        width: "400px",
                    },
                };
            }}
            style={{ animation: "fadeInUp 0.5s" }}
            px={`md`}
        >
            <Center>
                <Logo />
            </Center>
            <Title ta="center" style={{ fontFamily: `Greycliff CF,   var(--mantine-font-family)`, fontWeight: `900` }}>
                Welcome back!
            </Title>

            <Group grow>
                <GoogleButton radius="xl">Google</GoogleButton>
                {/* <FacebookButton disabled radius="xl">Facebook</FacebookButton> */}
            </Group>

            <Divider label="Or continue with email" labelPosition="center" />

            <Paper
                withBorder
                shadow="md"
                p={"xl"}
                radius="xl"
                sx={{
                    display: `flex`,
                    flexDirection: `column`,
                    justifyContent: `space-between`,
                    overflow: `hidden`,
                    backgroundColor: `transparent`,
                    backdropFilter: `blur(5px)`,
                }}
            >
                <Box h={240}>
                    <Transition enterDelay={400} mounted={step === `login-form`} transition="slide-right" duration={400} timingFunction="ease">
                        {(styles) => (
                            <div style={{ ...styles, height: `100%` }}>
                                <LoginForm setStep={setStep} setPayloadLogin={setPayloadLogin} />
                            </div>
                        )}
                    </Transition>

                    <Transition
                        enterDelay={400}
                        mounted={step === `login-google-authentication`}
                        transition="slide-left"
                        duration={400}
                        timingFunction="ease"
                    >
                        {(styles) => (
                            <div style={{ ...styles, height: `100%` }}>
                                <LoginGoogleAuthenticator setStep={setStep} payloadLogin={payloadLogin} />
                            </div>
                        )}
                    </Transition>
                </Box>
            </Paper>

            <Box>
                <FooterAuth text="Don't have an account?" href="/register" textAnchor="Register" />
            </Box>
        </Stack>
    );
}
