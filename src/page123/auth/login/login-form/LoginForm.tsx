import CustomPasswordInput, { validatePassword } from "@/components/password-input/CustomPasswordInput";
import ROUTER from "@/constant/router.constant";
import { useLoginForm } from "@/tantask/auth.tanstack";
import { TPayloadLoginGoogleAuthenticator, TStepLogin } from "@/types/auth.type";
import { Anchor, Box, Button, Group, TextInput } from "@mantine/core";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

type TProps = {
   setStep: Dispatch<SetStateAction<TStepLogin>>;
   setPayloadLogin: Dispatch<SetStateAction<TPayloadLoginGoogleAuthenticator | null>>;
};

export default function LoginForm({ setStep, setPayloadLogin }: TProps) {
   const router = useRouter();
   const useloginForm = useLoginForm();
   const loginForm = useFormik({
      initialValues: {
         // email: `vulebaolong@gmail.com`,
         // password: `123aA@`,
         email: ``,
         password: ``,
      },
      validationSchema: Yup.object().shape({
         email: Yup.string().trim().email().required(),
         password: Yup.string()
            .trim()
            .required("Password is required.")
            .test("includes-number", validatePassword[0].label, (value) => {
               if (!value) return false;
               return validatePassword[0].re.test(value);
            })
            .test("includes-lowercase", validatePassword[1].label, (value) => {
               if (!value) return false;
               return validatePassword[1].re.test(value);
            })
            .test("includes-uppercase", validatePassword[2].label, (value) => {
               if (!value) return false;
               return validatePassword[2].re.test(value);
            })
            .test("includes-special-symbol", validatePassword[3].label, (value) => {
               if (!value) return false;
               return validatePassword[3].re.test(value);
            })
            .test("includes-6-characters", validatePassword[4].label, (value) => {
               if (!value) return false;
               return validatePassword[4].re.test(value);
            }),
      }),
      onSubmit: async (valuesRaw) => {
         const payload = {
            email: valuesRaw.email.trim(),
            password: valuesRaw.password.trim(),
         };
         setPayloadLogin({
            ...payload,
            token: null,
         });
         useloginForm.mutate(payload, {
            onSuccess: (data) => {
               console.log({ data });
               if (data.isGoogleAuthenticator) {
                  setStep(`login-google-authentication`);
               } else {
                  router.push(ROUTER.HOME);
                  toast.success(`Login successfully`);
               }
            },
         });
      },
   });

   return (
      <Box component="form" onSubmit={loginForm.handleSubmit}>
         <Box h={200}>
            <TextInput
               withAsterisk
               label="Email"
               placeholder="Email"
               name="email"
               value={loginForm.values.email}
               onChange={loginForm.handleChange}
               error={loginForm.touched.email && typeof loginForm.errors.email === "string" ? loginForm.errors.email : undefined}
               inputWrapperOrder={["label", "input", "error"]}
               style={{ height: `85px` }}
            />

            <Box style={{ height: `85px` }}>
               <CustomPasswordInput
                  label="Password"
                  placeholder="Your password"
                  withAsterisk
                  name="password"
                  value={loginForm.values.password}
                  onChange={loginForm.handleChange}
                  error={loginForm.touched.password && typeof loginForm.errors.password === "string" ? loginForm.errors.password : undefined}
                  inputWrapperOrder={["label", "input", "error"]}
               />
            </Box>
            <Group justify="end">
               <Anchor
                  onClick={() => {
                     router.push("/forgot-pass");
                  }}
                  type="button"
                  component="button"
                  size="sm"
               >
                  Forgot password?
               </Anchor>
            </Group>
         </Box>

         <Button mt={10} loading={false} type="submit" fullWidth style={{ flexShrink: `0` }}>
            Login
         </Button>
      </Box>
   );
}
