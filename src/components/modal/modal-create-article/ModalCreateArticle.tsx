import TagUser from "@/components/tag-user/TagUser";
import { resError } from "@/helpers/function.helper";
import { useAppSelector } from "@/redux/hooks";
import { useCreateArticle } from "@/tantask/article.tanstack";
import { ActionIcon, Box, Button, Group, Modal, rem, Stack, Text, Textarea } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconPhoto, IconUpload, IconX } from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import classes from "./ModalCreateArticle.module.css";
import { useQueryClient } from "@tanstack/react-query";

type TProps = {
   opened: boolean;
   close: () => void;
};

export default function ModalCreateArticle({ opened, close }: TProps) {
   const queryClient = useQueryClient();
   const info = useAppSelector((state) => state.user.info);
   const [value, setValue] = useState("");
   const [file, setFile] = useState<File | null>(null);
   const [preview, setPreview] = useState<string | null>(null);
   const createArticle = useCreateArticle();

   const handleCreateArticle = () => {
      const fromData = new FormData();
      if (file !== null) fromData.append("imageArticle", file);
      if (value.trim() === "") return toast.warning("Nội dung bài viết không được để trống");

      fromData.append("content", value);

      console.log(fromData.getAll(`imageArticle`));
      createArticle.mutate(fromData, {
         onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [`get-list-article`] });
            toast.success(`Create Article successfully`);
            setPreview(null);
            setFile(null);
            setValue(``);
            close();
         },
         onError: (error) => {
            console.log(error);
            toast.error(resError(error, `Create Article Failed`));
         },
      });
   };

   return (
      <Modal
         opened={opened}
         onClose={close}
         title={`Tạo bài viết`}
         styles={{
            title: {
               fontSize: "24px",
               fontWeight: "bold",
               width: `100%`,
               textAlign: `center`,
            },
         }}
         size={`md`}
         centered
      >
         <Stack p={5}>
            <Box py={5}>
               <TagUser user={info} />
            </Box>

            {/* content */}
            <Textarea
               value={value}
               onChange={(event) => setValue(event.currentTarget.value)}
               autosize
               minRows={1}
               maxRows={5}
               variant="unstyled"
               size="xl"
               placeholder={`${info?.fullName} ơi, Bạn Đăng Nghĩ Gì Thế?`}
            />

            {/* image view */}
            {preview && (
               <Box className={`${classes[`box-1`]}`} pos={`relative`}>
                  <Image
                     alt=""
                     width={0}
                     height={0}
                     sizes="100vw"
                     style={{ width: "100%", height: "100%", objectFit: "cover", maxHeight: `700px` }}
                     src={preview}
                  />
                  <ActionIcon
                     style={{
                        position: `absolute`,
                        top: `15px`,
                        right: `15px`,
                     }}
                     variant="filled"
                     color="gray"
                     size="lg"
                     radius="xl"
                     onClick={() => {
                        setFile(null);
                        setPreview(null);
                     }}
                  >
                     <IconX style={{ width: "70%", height: "70%" }} stroke={1.5} />
                  </ActionIcon>
               </Box>
            )}

            {/* image up */}
            <Box className={`${classes[`box-1`]}`}>
               <Dropzone
                  onDrop={(files) => {
                     console.log("accepted files", files);
                     if (!files) return;
                     setFile(files[0]);
                     setPreview(URL.createObjectURL(files[0]));
                  }}
                  onReject={(files) => console.log("rejected files", files)}
                  maxSize={5 * 1024 ** 2}
                  accept={IMAGE_MIME_TYPE}
               >
                  <Group justify="center" gap="md" style={{ pointerEvents: "none" }}>
                     <Dropzone.Accept>
                        <IconUpload style={{ width: rem(52), height: rem(52), color: "var(--mantine-color-blue-6)" }} stroke={1.5} />
                     </Dropzone.Accept>
                     <Dropzone.Reject>
                        <IconX style={{ width: rem(52), height: rem(52), color: "var(--mantine-color-red-6)" }} stroke={1.5} />
                     </Dropzone.Reject>

                     <Box>
                        <Group wrap="nowrap">
                           <Dropzone.Idle>
                              <IconPhoto style={{ width: rem(52), height: rem(52), color: "var(--mantine-color-dimmed)" }} stroke={1.5} />
                           </Dropzone.Idle>

                           <Text ta={`center`} size="md" inline>
                              Drag images here or click to select files
                           </Text>
                        </Group>
                        <Text ta={`center`} size="12" c="dimmed" inline mt={7}>
                           Attach as many files as you like, each file should not exceed 5mb
                        </Text>
                     </Box>
                  </Group>
               </Dropzone>
            </Box>

            {/* button */}
            <Button loading={createArticle.isPending} onClick={handleCreateArticle} variant="filled">
               Đăng
            </Button>
         </Stack>
      </Modal>
   );
}
