import { ActionIcon, Loader } from "@mantine/core";

type TProps = {
   isLoading: boolean;
};

export default function LoadingGetMessage({ isLoading }: TProps) {
   return (
      <ActionIcon
         size={`lg`}
         variant="transparent"
         radius="xl"
         style={{
            cursor: "default",
            position: "absolute",
            top: 0,
            left: "50%",
            transform: `translate(-50%, ${isLoading ? "20px" : "0"})`,
            opacity: isLoading ? 1 : 0,
            pointerEvents: isLoading ? "auto" : "none",
            transition: "all 300ms ease",
            zIndex: 1,
            boxShadow: `rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(0, 0, 0, 0.1) 0px 8px 20px 0px`,
         }}
      >
         <Loader size={"sm"} />
      </ActionIcon>
   );
}
