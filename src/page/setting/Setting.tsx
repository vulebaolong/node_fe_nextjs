"use client";

import { Container, Divider, Paper, Stack, Text } from "@mantine/core";
import { Fragment } from "react";
import EmailVerification from "./email-verification/EmailVerification";
import GoogleAuthentication from "./google-authenticator/GoogleAuthentication";
import LoginPasssword from "./login-password/LoginPasssword";

const list = [
   {
      title: `Two-Factor Authentication (2FA)`,
      subTitle: `Two-Factor Authentication (2FA)`,
      items: [<GoogleAuthentication key="google-auth" />, <EmailVerification key="email-verification" />],
   },
   {
      title: `Advanced Settings`,
      subTitle: `Advanced Settings`,
      items: [<LoginPasssword key="login-password" />],
   },
];

export default function Setting() {
   return (
      <Container py={100}>
         <Stack gap={50}>
            {list.map((item, i) => {
               return (
                  <Paper key={i} shadow="md" radius="lg" withBorder p="xl">
                     <Text fz={24}>{item.title}</Text>
                     <Text fz={12} c="dimmed">
                        {item.subTitle}
                     </Text>

                     <Stack mt={50}>
                        {item.items.map((service, i) => {
                           return (
                              <Fragment key={i}>
                                 {i !== 0 && <Divider />}
                                 {service}
                              </Fragment>
                           );
                        })}
                     </Stack>
                  </Paper>
               );
            })}
         </Stack>
      </Container>
   );
}
