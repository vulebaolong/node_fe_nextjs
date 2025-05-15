import { Loader } from "@mantine/core";

export default function LoadingPage() {
   return <Loader  size={"sm"} style={{ position: "fixed", zIndex: 999999, bottom: "20px", left: "20px", scroll: "unset" }} />
}
