import { Box, Stack, Group, Anchor, Center, Title, PinInput, Button, Text } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useFormik } from "formik";
import { Dispatch, SetStateAction } from "react";
import * as Yup from "yup";

type TProps = {
   setStep: Dispatch<SetStateAction<"login" | "2 fa">>;
};

export default function Login2Fa({ setStep }: TProps) {
   const login2FaForm = useFormik({
      initialValues: {
         token: "",
      },
      validationSchema: Yup.object().shape({
         token: Yup.string().trim().required("Code is required."),
      }),
      onSubmit: async (valuesRaw: any) => {
         console.log({ valuesRaw });
      },
   });
   return (
      <Box
         component="form"
         onSubmit={(e) => {
            e.preventDefault();
            login2FaForm.handleSubmit();
         }}
      >
         <Stack h={200}>
            <Group justify="space-between">
               <Anchor
                  onClick={() => {
                     setStep(`login`);
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
               Two-factor Authentication
            </Title>
            <Text c={`dimmed`} ta={`center`}>
               Enter the code displayed in your authenticator app
            </Text>
            <Box>
               <Center>
                  <PinInput
                     length={6}
                     name="token"
                     value={login2FaForm.values.token}
                     onChange={(e) => {
                        login2FaForm.setFieldValue(`token`, e);
                     }}
                     error={!!(login2FaForm.touched.token && login2FaForm.errors.token)}
                  />
               </Center>
               <Center>
                  <Text
                     c={`var(--input-asterisk-color, var(--mantine-color-error))`}
                     style={{
                        fontSize: `var(--input-error-size, calc(var(--mantine-font-size-sm) - calc(0.125 * var(--mantine-scale))))`,
                     }}
                  >
                     {login2FaForm.errors.someField && typeof login2FaForm.errors.someField === "string" ? login2FaForm.errors.someField : null}
                  </Text>
               </Center>
            </Box>
         </Stack>
         <Button mt={20} loading={false} type="submit" fullWidth style={{ flexShrink: `0` }}>
            Login 2FA
         </Button>
      </Box>
   );
}
