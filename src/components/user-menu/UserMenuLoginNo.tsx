import useRouter from "@/hooks/use-router-custom";
import { Stack } from "@mantine/core";
import { IconLogin, IconUserEdit } from "@tabler/icons-react";
import { Fragment } from "react";
import { toast } from "react-toastify";
import UserMenuItem from "./UserMenuItem";
import { ROUTER_CLIENT } from "@/constant/router.constant";

const listMenu = [
   {
      label: "Đăng nhập",
      icon: <IconLogin size={16} />,
      href: ROUTER_CLIENT.LOGIN,
   },
   {
      label: "Đăng ký",
      icon: <IconUserEdit size={16} />,
      href: ROUTER_CLIENT.REGISTER,
   },
];

type TProps = {
   onClick?: () => void;
};

export default function UserMenuLoginNo({ onClick }: TProps) {
   const router = useRouter();
   return (
      <Stack gap={2}>
         {listMenu.map((item, i) => {
            return (
               <Fragment key={i}>
                  <UserMenuItem
                     item={item}
                     onClick={() => {
                        if (item.href) {
                           router.push(item.href);
                        } else {
                           toast.info(`Coming Soon`);
                        }
                        onClick?.();
                     }}
                  />
               </Fragment>
            );
         })}
      </Stack>
   );
}
