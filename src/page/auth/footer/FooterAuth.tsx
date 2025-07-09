import SwitchLang from "@/components/switch-lang/SwitchLang";
import ButtonToggleTheme from "@/components/toggle-theme/button/ButtonToggleTheme";
import useRouter from "@/hooks/use-router-custom";
import { Anchor, Center, Group, Text } from "@mantine/core";

type TProps = {
   textAnchor?: string;
   text?: string;
   href: string;
};

export default function FooterAuth({ textAnchor, text, href }: TProps) {
   const router = useRouter();

   return (
      <>
         <Text fz={`sm`} ta="center">
            {text}{" "}
            <Anchor<"a">
               href="#"
               fw={700}
               onClick={(event) => {
                  event.preventDefault();
                  router.push(href);
               }}
               fz={`sm`}
            >
               {textAnchor}
            </Anchor>
         </Text>

         <Center>
            <Group mt={`sm`}>
               <ButtonToggleTheme size="md" />
               <SwitchLang size="md" />
            </Group>
         </Center>
      </>
   );
}
