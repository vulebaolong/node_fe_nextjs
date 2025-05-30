import { TPayloadLoginGoogleAuthenticator, TStepLogin } from "@/types/auth.type";
import { Anchor, Box, Button, Center, Group, PinInput, Stack, Text, Title } from "@mantine/core";
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
   const loginGAForm = useFormik({
      initialValues: {
         token: "",
      },
      validationSchema: Yup.object().shape({
         token: Yup.string().trim().required("Code is required."),
      }),
      onSubmit: async (valuesRaw: any) => {
         if (!payloadLogin) return toast.warning(`Please go back login`);
         if (!payloadLogin.email) return toast.warning(`Please go back login`);
         if (!payloadLogin.password) return toast.warning(`Please go back login`);

         const { email, password } = payloadLogin;

         const payload = {
            email,
            password,
            token: valuesRaw.token,
         };

         console.log({ payload });
      },
   });
   return (
      <Box
         component="form"
         onSubmit={(e) => {
            e.preventDefault();
            loginGAForm.handleSubmit();
         }}
      >
         <Stack h={200}>
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
         <Button mt={20} loading={false} type="submit" fullWidth style={{ flexShrink: `0` }}>
            Verify
         </Button>
      </Box>
   );
}
