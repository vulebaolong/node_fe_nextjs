"use client";

import Avatar from "@/components/avatar/Avatar";
import Badge from "@/components/badge/Badge";
import { resError } from "@/helpers/function.helper";
import { useAppSelector } from "@/redux/hooks";
import { useGetInfo } from "@/tantask/auth.tanstack";
import { useUploadAvatarCloud, useUploadAvatarLocal } from "@/tantask/user.tanstack";
import { Avatar as AvatarMantine, Button, Center, Container, Group, Paper, rem, Stack, Text } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconPhoto, IconUpload, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { toast } from "react-toastify";

export function Profile() {
   const info = useAppSelector((state) => state.user.info);
   const [file, setFile] = useState<File | null>(null);
   const [preview, setPreview] = useState<string | null>(null);
   const uploadAvatarLocal = useUploadAvatarLocal();
   const uploadAvatarCloud = useUploadAvatarCloud();
   const getInfo = useGetInfo();

   const handleUploadLocal = async () => {
      if (file === null) return;

      const fromData = new FormData();

      fromData.append("avatar", file);

      console.log(fromData.getAll(`avatar`));

      uploadAvatarLocal.mutate(fromData, {
         onSuccess: () => {
            toast.success(`Upload avatar to local successfully`);
            getInfo.mutate();
            setPreview(null);
            setFile(null);
         },
         onError: (error) => {
            console.log(error);
            toast.error(resError(error, `Upload avatar to local failed`));
         },
      });
   };

   const handleUploadCloud = () => {
      if (file === null) return;

      const fromData = new FormData();

      fromData.append("avatar", file);

      console.log(fromData.getAll(`avatar`));

      uploadAvatarCloud.mutate(fromData, {
         onSuccess: () => {
            toast.success(`Upload avatar to cloud successfully`);
            getInfo.mutate();
            setPreview(null);
            setFile(null);
         },
         onError: (error) => {
            console.log(error);
            toast.error(resError(error, `Upload avatar to cloud failed`));
         },
      });
   };

   return (
      <Container py={100}>
         <Stack>
            <Paper shadow="lg" radius="lg" withBorder p={80} pt={100} bg="var(--mantine-color-body)">
               <Center>
                  <Avatar user={info} size={120} radius={120} mx="auto" />
               </Center>

               <Text ta="center" fz="lg" fw={500} mt="md">
                  {info?.fullName}
               </Text>

               <Text ta="center" c="dimmed" fz="sm">
                  {info?.email}
               </Text>

               <Center mt={10}>
                  <Badge user={info} />
               </Center>
            </Paper>

            <Paper shadow="lg" radius="lg" withBorder bg="var(--mantine-color-body)">
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
                  <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: "none" }}>
                     <Dropzone.Accept>
                        <IconUpload style={{ width: rem(52), height: rem(52), color: "var(--mantine-color-blue-6)" }} stroke={1.5} />
                     </Dropzone.Accept>
                     <Dropzone.Reject>
                        <IconX style={{ width: rem(52), height: rem(52), color: "var(--mantine-color-red-6)" }} stroke={1.5} />
                     </Dropzone.Reject>
                     <Dropzone.Idle>
                        {preview ? (
                           <AvatarMantine src={preview} size={120} />
                        ) : (
                           <IconPhoto style={{ width: rem(52), height: rem(52), color: "var(--mantine-color-dimmed)" }} stroke={1.5} />
                        )}
                     </Dropzone.Idle>

                     <div>
                        <Text size="xl" inline>
                           Drag images here or click to select files
                        </Text>
                        <Text size="sm" c="dimmed" inline mt={7}>
                           Attach as many files as you like, each file should not exceed 5mb
                        </Text>
                     </div>
                  </Group>
               </Dropzone>
            </Paper>

            <Center>
               <Group>
                  <Button loading={uploadAvatarLocal.isPending} disabled={!!!file || uploadAvatarCloud.isPending} onClick={handleUploadLocal}>
                     Upload Local
                  </Button>
                  <Button loading={uploadAvatarCloud.isPending} disabled={!!!file || uploadAvatarLocal.isPending} onClick={handleUploadCloud}>
                     Upload Cloud
                  </Button>
               </Group>
            </Center>
         </Stack>
      </Container>
   );
}
