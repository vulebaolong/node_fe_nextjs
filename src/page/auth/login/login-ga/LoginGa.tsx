"use client";

import { ROUTER_CLIENT } from "@/constant/router.constant";
import useRouter from "@/hooks/use-router-custom";
import { useLoginForm, useLoginGoogleWithTotp } from "@/api/tantask/auth.tanstack";
import { TLoginGoogleWithTotpReq, TPayloadLoginGoogleAuthenticator, TStepLogin } from "@/types/auth.type";
import { Anchor, Box, Center, Group, PinInput, Stack, Text, Title } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useFormik } from "formik";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

type TProps = {
    setStep: Dispatch<SetStateAction<TStepLogin>>;
    payloadLogin: TPayloadLoginGoogleAuthenticator | null;
};

export default function LoginGa({ setStep, payloadLogin }: TProps) {
    const loginForm = useLoginForm();
    const loginGoogleWithTotp = useLoginGoogleWithTotp();
    const router = useRouter();

    const loginGAForm = useFormik({
        initialValues: {
            token: "",
        },
        validationSchema: Yup.object().shape({
            token: Yup.string().trim().required("Code is required."),
        }),
        onSubmit: async (valuesRaw: any) => {
            if (payloadLogin?.type === "email/pass") {
                if (!payloadLogin) return toast.warning(`Please go back login`);
                if (!payloadLogin.email) return toast.warning(`Please go back login`);
                if (!payloadLogin.password) return toast.warning(`Please go back login`);

                const { email, password } = payloadLogin;

                const payload = {
                    email,
                    password,
                    token: valuesRaw.token,
                };

                loginForm.mutate(payload, {
                    onSuccess: () => {
                        router.push(ROUTER_CLIENT.HOME);
                        toast.success(`Login successfully`);
                    },
                });
            }
            if (payloadLogin?.type === "totp") {
                if (!payloadLogin.email) return toast.warning(`Invalid login`);
                const payload: TLoginGoogleWithTotpReq = {
                    token: valuesRaw.token,
                    email: payloadLogin.email,
                };
                loginGoogleWithTotp.mutate(payload, {
                    onSuccess: () => {
                        router.push(ROUTER_CLIENT.HOME);
                        toast.success(`Login successfully`);
                    },
                });
            }
        },
    });
    return (
        <Stack h={`100%`}>
            <Group justify="space-between">
                <Anchor
                    onClick={() => {
                        setStep(`login-form`);
                    }}
                    c="dimmed"
                    size="sm"
                >
                    <Center inline>
                        <IconArrowLeft style={{ width: "12px", height: "12px" }} stroke={1.5} />
                        <Box ml={5}>Back to login</Box>
                    </Center>
                </Anchor>
            </Group>
            <Stack justify="center" h={`100%`}>
                <Title order={4} ta={`center`}>
                    Google Authenticator
                </Title>
                <Text c={`dimmed`} ta={`center`}>
                    Enter the code displayed in your authenticator app
                </Text>
                <Box>
                    <Center>
                        <PinInput
                            length={6}
                            name="token"
                            value={loginGAForm.values.token}
                            onChange={(e) => {
                                loginGAForm.setFieldValue(`token`, e);
                            }}
                            onComplete={() => {
                                loginGAForm.handleSubmit();
                            }}
                            error={!!(loginGAForm.touched.token && loginGAForm.errors.token)}
                        />
                    </Center>
                    <Center>
                        <Text
                            c={`var(--input-asterisk-color, var(--mantine-color-error))`}
                            style={{
                                fontSize: `var(--input-error-size, calc(var(--mantine-font-size-sm) - calc(0.125 * var(--mantine-scale))))`,
                            }}
                        >
                            {loginGAForm.errors.someField && typeof loginGAForm.errors.someField === "string" ? loginGAForm.errors.someField : null}
                        </Text>
                    </Center>
                </Box>
            </Stack>
        </Stack>
    );
}
