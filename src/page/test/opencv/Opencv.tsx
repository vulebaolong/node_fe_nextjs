"use client";

import { Container } from "@mantine/core";
import ListImage from "./ListImage";
import Stream from "./Stream";

export default function Opencv() {
   return (
      <Container>
         <Stream />
         <ListImage />
      </Container>
   );
}
