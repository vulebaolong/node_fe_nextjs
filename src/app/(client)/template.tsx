import Template from "@/template/template";
import React from "react";

type TProps = {
    children: React.ReactNode;
};

export default function template({ children }: TProps) {
    return <Template>{children}</Template>;
}
