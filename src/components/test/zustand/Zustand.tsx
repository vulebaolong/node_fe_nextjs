"use client";

import { Center, Container, Title } from "@mantine/core";
import CountZustand from "./CountZustand";
import SettingZustand from "./SettingZustand";
import UserZustand from "./UserZustand";

function Zustand() {
   return (
      <Container>
         <Center>
            <Title>Zustand</Title>
         </Center>
         <CountZustand />
         <SettingZustand />
         <UserZustand />
      </Container>
   );
}

export default Zustand;
