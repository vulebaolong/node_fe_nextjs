"use client";
import { Logo } from "@/components/logo/Logo";
import classes from "./../Auth.module.css";
import CustomPasswordInput, { validatePassword } from "@/components/password-input/CustomPasswordInput";
import CustomRePasswordInput from "@/components/password-input/CustomRePasswordInput";
import { Anchor, Box, Button, Center, Paper, Stack, Text, TextInput, Title } from "@mantine/core";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import * as Yup from "yup";
import { useRegister } from "@/tantask/auth.tanstack";
import { toast } from "react-toastify";

export default function Register() {
   const router = useRouter();

   const register = useRegister();

   const registerForm = useFormik({
      initialValues: {
         fullName: "",
         email: "",
         password: "",
         rePassword: "",
      },
      validationSchema: Yup.object().shape({
         fullName: Yup.string().trim().required("Username is required."),
         email: Yup.string().trim().email().required(),
         password: Yup.string()
            .trim()
            .required("Password is required")
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
         rePassword: Yup.string()
            .trim()
            .required(`Re-enter Password is required.`)
            .test("password-is-valid", `Password must be valid before matching.`, function () {
               const { password } = this.parent;
               return validatePassword.every((rule) => rule.re.test(password || ""));
            })
            .test("passwords-match", `Passwords must match.`, function (value) {
               const { password } = this.parent; // Lấy giá trị của password từ form
               return value === password;
            }),
      }),
      onSubmit: async (valuesRaw) => {
         const payload = {
            fullName: valuesRaw.fullName.trim(),
            email: valuesRaw.email.trim(),
            password: valuesRaw.password.trim(),
         };

         console.log({ payload });

         register.mutate(payload, {
            onSuccess: () => {
               router.push("/login");
               toast.success(`Register successfully`);
            },
         });
      },
   });

   return (
      <Suspense fallback={<p>Loading feed...</p>}>
         <Stack className={`${classes.wrapForm}`} style={{ animation: "fadeInUp 0.5s" }} px={`md`}>
            <Center>
               <Logo />
            </Center>

            <Title ta="center" style={{ fontFamily: `Greycliff CF,   var(--mantine-font-family)`, fontWeight: `900` }}>
               Register!
            </Title>

            <Paper
               withBorder
               shadow="md"
               p={30}
               radius="md"
               style={{
                  display: `flex`,
                  flexDirection: `column`,
                  justifyContent: `space-between`,
               }}
               component="form"
               onSubmit={(e) => {
                  e.preventDefault();
                  registerForm.handleSubmit();
               }}
            >
               <Box>
                  <TextInput
                     withAsterisk
                     label="Full name"
                     placeholder="Full name"
                     name="fullName"
                     value={registerForm.values.fullName}
                     onChange={registerForm.handleChange}
                     error={registerForm.touched.fullName && registerForm.errors.fullName}
                     inputWrapperOrder={["label", "input", "error"]}
                     style={{ height: `85px` }}
                  />

                  <TextInput
                     withAsterisk
                     label="Email"
                     placeholder="email"
                     name="email"
                     value={registerForm.values.email}
                     onChange={registerForm.handleChange}
                     error={registerForm.touched.email && registerForm.errors.email}
                     inputWrapperOrder={["label", "input", "error"]}
                     style={{ height: `85px` }}
                  />

                  <Box style={{ height: `85px` }}>
                     <CustomPasswordInput
                        label="Password"
                        placeholder="Your password"
                        withAsterisk
                        name="password"
                        value={registerForm.values.password}
                        onChange={registerForm.handleChange}
                        error={registerForm.touched.password && registerForm.errors.password}
                        inputWrapperOrder={["label", "input", "error"]}
                     />
                  </Box>

                  {/* re-password */}
                  <Box style={{ height: `85px` }}>
                     <CustomRePasswordInput
                        rePassword={registerForm.values.rePassword}
                        password={registerForm.values.password}
                        label={`Re-enter password`}
                        placeholder={`Your Password`}
                        withAsterisk
                        name="rePassword"
                        value={registerForm.values.rePassword}
                        onChange={registerForm.handleChange}
                        inputWrapperOrder={["label", "input", "error"]}
                        error={registerForm.touched.rePassword && registerForm.errors.rePassword}
                        className={classes.input}
                     />
                  </Box>
               </Box>
               <Button loading={register.isPending} type="submit" fullWidth style={{ flexShrink: `0` }}>
                  Register
               </Button>
            </Paper>

            <Text ta="center">
               Don&apos;t have an account?{" "}
               <Anchor<"a">
                  href="#"
                  fw={700}
                  onClick={(event) => {
                     event.preventDefault();
                     router.push("/login");
                  }}
               >
                  Login
               </Anchor>
            </Text>
         </Stack>
      </Suspense>
   );
}
