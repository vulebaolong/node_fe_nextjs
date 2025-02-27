"use client";
// import { postLoginAction } from "@/actions/auth.action";
// import { useAppContext } from "@/components/provider/appProvider/AppProvider";
import { FacebookButton } from "@/components/buttons/FacebookButton";
import { GoogleButton } from "@/components/buttons/GoogleButton";
import { Logo } from "@/components/logo/Logo";
import { Anchor, Box, Center, Divider, Group, Loader, Paper, Text, Title, Transition } from "@mantine/core";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import classes from "./../Auth.module.css";
import Login2Fa from "./login-2fa/Login2Fa";
import LoginForm from "./login-form/LoginForm";

export default function Login() {
   const router = useRouter();
   const [step, setStep] = useState<"login" | "2 fa">("login");

   return (
      <Suspense fallback={<Loader />}>
         <Box className={`${classes.wrapForm}`} style={{ animation: "fadeInUp 0.5s" }} px={`md`}>
            <Center>
               <Logo />
            </Center>
            <Title mt={20} ta="center" style={{ fontFamily: `Greycliff CF,   var(--mantine-font-family)`, fontWeight: `900` }}>
               Welcome back!
            </Title>

            <Group grow mb="md" mt="md">
               <GoogleButton radius="xl">Google</GoogleButton>
               <FacebookButton radius="xl">Facebook</FacebookButton>
            </Group>

            <Divider label="Or continue with email" labelPosition="center" my="lg" />

            <Paper
               withBorder
               shadow="md"
               p={30}
               radius="md"
               style={{
                  display: `flex`,
                  flexDirection: `column`,
                  justifyContent: `space-between`,
                  overflow: `hidden`,
               }}
            >
               <Box h={256}>
                  <Transition enterDelay={400} mounted={step === `login`} transition="slide-right" duration={400} timingFunction="ease">
                     {(styles) => (
                        <div style={{ ...styles, height: `100%` }}>
                           <LoginForm setStep={setStep} />
                        </div>
                     )}
                  </Transition>

                  <Transition enterDelay={400} mounted={step === `2 fa`} transition="slide-left" duration={400} timingFunction="ease">
                     {(styles) => (
                        <div style={{ ...styles, height: `100%` }}>
                           <Login2Fa setStep={setStep} />
                        </div>
                     )}
                  </Transition>
               </Box>
            </Paper>

            <Text ta="center" mt="md">
               Don&apos;t have an account?{" "}
               <Anchor<"a">
                  href="#"
                  fw={700}
                  onClick={(event) => {
                     event.preventDefault();
                     router.push("/register");
                  }}
               >
                  Register
               </Anchor>
            </Text>
         </Box>
      </Suspense>
   );
}
