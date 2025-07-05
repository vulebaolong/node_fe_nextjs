import NodataOverlay from "@/components/no-data/NodataOverlay";
import TagUser from "@/components/tag-user/TagUser";
import { ROUTER_CLIENT } from "@/constant/router.constant";
import { animationList } from "@/helpers/function.helper";
import useRouter from "@/hooks/use-router-custom";
import { useAppSelector } from "@/redux/hooks";
import { useSearchNameUser } from "@/api/tantask/user.tanstack";
import { Box, Divider, Input, LoadingOverlay, Modal, Stack } from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { Fragment, useEffect, useState } from "react";

type TProps = {
   opened: boolean;
   close: () => void;
};

export default function ModalSearchUser({ opened, close }: TProps) {
   const [search, setSearch] = useState("");
   const searchNameUser = useSearchNameUser();
   const id = useAppSelector((state) => state.user.info?._id);
   const router = useRouter();

   const handleSearch = useDebouncedCallback(async (query: string) => {
      if (query.trim() === "") return;
      searchNameUser.mutate(query, {
         onSuccess: (data) => {
            console.log(data);
         },
         onError: (error) => {
            console.log(error);
         },
      });
   }, 500);

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.currentTarget.value);
      handleSearch(event.currentTarget.value);
   };

   useEffect(() => {
      if (!opened) setSearch("");
   }, [opened]);

   return (
      <Modal
         opened={opened}
         onClose={close}
         size={`md`}
         overlayProps={{
            backgroundOpacity: 0.55,
            blur: 3,
         }}
         styles={{
            body: {
               padding: 0,
            },
         }}
         withCloseButton={false}
      >
         <Input  value={search} onChange={handleChange} leftSection={<IconSearch size={16} />} variant="unstyled" placeholder="Tìm kiếm người dùng" />
         <Divider />
         <Stack
            sx={{
               minHeight: `100px`,
               maxHeight: `300px`,
               overflowY: `scroll`,
               overflowX: `hidden`,
               position: `relative`,
               padding: `5px`,
            }}
            gap={2}
         >
            <LoadingOverlay visible={searchNameUser.isPending} zIndex={1000} overlayProps={{ radius: "sm", bg: `transparent` }} />
            <NodataOverlay
               width={50}
               visible={!searchNameUser.isPending && (!searchNameUser.data || searchNameUser.data?.items?.length === 0 || searchNameUser.isError)}
            />
            {searchNameUser.data?.items?.map((user, i) => {
               if (user._id === id) return <Fragment key={i} />;
               return (
                  <Box
                     key={i}
                     onClick={() => {
                        router.push(`${ROUTER_CLIENT.USER}/${user._id}`);
                        close();
                     }}
                     sx={{
                        ...animationList(i),
                        padding: `5px`,
                        cursor: "pointer",
                        borderRadius: `5px`,
                        "--button-hover": `var(--mantine-color-default-hover)`,
                        "&:hover": {
                           background: `var(--button-hover, var(--mantine-primary-color-filled-hover))`,
                        },
                     }}
                  >
                     <TagUser fullName={user.fullName} avatar={user.avatar}  sizeAvatar={`sm`} />
                  </Box>
               );
            })}
         </Stack>
      </Modal>
   );
}
