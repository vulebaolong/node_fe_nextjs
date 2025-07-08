"use client";

import { useEditProfile } from "@/api/tantask/user.tanstack";
import { resError } from "@/helpers/function.helper";
import { useAppSelector } from "@/redux/hooks";
import { TEditProfileReq } from "@/types/user.type";
import { Box, Button, Modal, Stack, TextInput } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";

type TProps = {
    opened: boolean;
    close: () => void;
};

export default function ModalEditProfile({ opened, close }: TProps) {
    const info = useAppSelector((state) => state.user.info);
    const editProfile = useEditProfile();
    const queryClient = useQueryClient();

    const updateProfileForm = useFormik({
        initialValues: {
            fullName: "",
        },
        validationSchema: Yup.object().shape({
            fullName: Yup.string().trim().required(),
        }),
        onSubmit: async (valuesRaw) => {
            if (!info) return;

            const payload: TEditProfileReq = {
                id: info._id,
                fullName: valuesRaw.fullName.trim(),
            };
            console.log({ payload });

            editProfile.mutate(payload, {
                onSuccess: () => {
                    updateProfileForm.resetForm();
                    queryClient.invalidateQueries({ queryKey: [`query-info`] });
                    toast.success("Chỉnh sửa thông tin cá nhân thành công");
                    close();
                },
                onError: (error) => {
                    console.log({ error });
                    toast.error(resError(error, "Chỉnh sửa thông tin cá nhân thất bại"));
                },
            });
        },
    });

    return (
        <Modal
            opened={opened}
            onClose={close}
            title={`Chỉnh sửa thông tin cá nhân`}
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
            <Box component="form" onSubmit={updateProfileForm.handleSubmit}>
                <Stack>
                    <Box>
                        <TextInput
                            withAsterisk
                            label="Tên đầy đủ"
                            placeholder="Tên đầy đủ"
                            name="fullName"
                            value={updateProfileForm.values.fullName}
                            onChange={updateProfileForm.handleChange}
                            error={
                                updateProfileForm.touched.fullName && typeof updateProfileForm.errors.fullName === "string"
                                    ? updateProfileForm.errors.fullName
                                    : undefined
                            }
                            inputWrapperOrder={["label", "input", "error"]}
                            style={{ height: `85px` }}
                            radius={`lg`}
                        />
                    </Box>

                    <Button radius={`xl`} loading={editProfile.isPending} type="submit" fullWidth style={{ flexShrink: `0` }}>
                        Cập nhật
                    </Button>
                </Stack>
            </Box>
        </Modal>
    );
}
