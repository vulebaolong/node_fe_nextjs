import { Center, Text } from "@mantine/core";

export default function FooterAdmin() {
   return (
      <Center h={`100%`}>
         <Text c="dimmed" ta="center" size="sm">
            © {new Date().getFullYear()} vulebaolong
         </Text>
      </Center>
   );
}
