import { Stack } from "@mantine/core";
import { ReactNode } from "react";
import classes from "./AuthLayout.module.css";

type TProps = {
   children: ReactNode;
};

export default function AuthLayout({ children }: TProps) {
   return <Stack className={`${classes[`box-1`]}`}>{children}</Stack>;
}
