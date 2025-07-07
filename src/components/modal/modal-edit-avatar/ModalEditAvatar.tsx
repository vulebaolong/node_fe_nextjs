import { useGetInfoMutation } from "@/api/tantask/auth.tanstack";
import { useUploadAvatarCloud, useUploadAvatarLocal } from "@/api/tantask/user.tanstack";
import { resError } from "@/helpers/function.helper";
import { Avatar as AvatarMantine, Button, Center, Group, Modal, Stack } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconPhoto, IconUpload, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { toast } from "react-toastify";

type TProps = {
    opened: boolean;
    close: () => void;
};

export default function ModalEditAvatar({ opened, close }: TProps) {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const uploadAvatarLocal = useUploadAvatarLocal();
    const uploadAvatarCloud = useUploadAvatarCloud();
    const getInfo = useGetInfoMutation();

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
        <Modal
            opened={opened}
            onClose={close}
            title={`Chỉnh sửa ảnh đại diện`}
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
            <Stack>
                <Center>
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
                        styles={{
                            inner: {
                                width: `100%`,
                                height: `100%`,
                            },
                        }}
                        sx={{
                            aspectRatio: `1 / 1`,
                            width: `135px`,
                            height: `135px`,
                            display: `flex`,
                            justifyContent: `center`,
                            alignItems: `center`,
                            borderRadius: `50%`,
                            boxShadow: `var(--paper-shadow)`,
                            cursor: `pointer`,
                            border: `calc(0.0625rem * var(--mantine-scale)) solid var(--paper-border-color)`,
                        }}
                    >
                        <Group justify="center" style={{ pointerEvents: "none", width: `100%`, height: `100%` }}>
                            <Dropzone.Accept>
                                <IconUpload style={{ width: `40%`, height: `40%`, color: "var(--mantine-color-dimmed)" }} stroke={1.5} />
                            </Dropzone.Accept>
                            <Dropzone.Reject>
                                <IconX style={{ width: `40%`, height: `40%`, color: "var(--mantine-color-red-6)" }} stroke={1.5} />
                            </Dropzone.Reject>
                            <Dropzone.Idle>
                                {preview ? (
                                    <AvatarMantine src={preview} size={120} />
                                ) : (
                                    <IconPhoto style={{ width: `40%`, height: `40%`, color: "var(--mantine-color-dimmed)" }} stroke={1.5} />
                                )}
                            </Dropzone.Idle>
                        </Group>
                    </Dropzone>
                </Center>

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
        </Modal>
    );
}
