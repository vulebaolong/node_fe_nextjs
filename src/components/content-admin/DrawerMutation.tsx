import { Box, Button, Drawer, NumberInput, Radio, Select, Stack, TagsInput, Textarea, TextInput } from "@mantine/core";
import { RichTextEditor } from "@mantine/tiptap";
import { UseMutationResult } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useEffect, useMemo } from "react";
import CustomPasswordInput from "../password-input/CustomPasswordInput";
import { TFieldCreate } from "./ContentAdmin";
import { useRichTextEditor } from "./hook";
import { useIsMobile } from "@/hooks/is-mobile.hook";
import { buildInitialValues, buildValidationSchema } from "@/helpers/function.helper";

type TProps = {
   editData: any;
   updates: TFieldCreate[];
   creates: TFieldCreate[];
   update: UseMutationResult<any, Error, any, unknown> | null;
   create: UseMutationResult<any, Error, any, unknown> | null;
   setEditData: React.Dispatch<React.SetStateAction<null>>;
   opened: boolean;
   close: () => void;
};

export default function DrawerMutation({ editData, updates, creates, update, create, setEditData, opened, close }: TProps) {
   const isMobile = useIsMobile();
   const { editor, setContent } = useRichTextEditor(undefined);

   useEffect(() => {
      // Merge đầy đủ field
      const fullValues = { ...createForm.initialValues, ...editData };
      console.log({ fullValues });
      createForm.setValues(fullValues);

      // Tìm field editor và set content
      const editorField = creates.find((field) => field.type === "editor");
      if (editorField && editData[editorField.name]) {
         setContent(editData[editorField.name]);
      }
   }, [editData]);

   const initialValues = useMemo(() => buildInitialValues(editData ? updates : creates), [editData, updates, creates]);
   const validationSchema = useMemo(() => buildValidationSchema(editData ? updates : creates), [editData, updates, creates]);
   const createForm = useFormik({
      initialValues,
      validationSchema,
      enableReinitialize: true,
      onSubmit: async (values) => {
         const payload = { ...values };
         let formData: FormData | null = null;

         console.log({ values });
         Object.entries(payload).forEach(([key, value]) => {
            if (value instanceof File) {
               formData = new FormData();
               formData.append(key, value);
               payload[key] = formData;
            }
         });

         const editorField = creates.find((field) => field.type === "editor");

         if (editorField) {
            payload[editorField.name] = editor?.getHTML();

            if (!payload[editorField.name]) {
               createForm.setFieldError(editorField.name, `${editorField.label} không được để trống`);
               return;
            }
         }

         console.log({ payload });

         if (editData) {
            if (!update) return;
            update.mutate(payload, {
               onSuccess: () => {
                  close();
                  createForm.resetForm();
               },
            });
         } else {
            if (!create) return;
            create.mutate(payload, {
               onSuccess: () => {
                  close();
                  createForm.resetForm();
               },
            });
         }
      },
   });

   return (
      <Drawer
         position={`right`}
         opened={opened}
         onClose={() => {
            close();
            createForm.resetForm();
            setEditData(null);
            setContent("");
         }}
         title={editData ? "Update" : "Create"}
         size={isMobile ? `90%` : `50%`}
      >
         <form onSubmit={createForm.handleSubmit}>
            <Stack>
               {(editData ? updates : creates).map((field) => {
                  const error =
                     createForm.touched[field.name] && typeof createForm.errors[field.name] === "string"
                        ? (createForm.errors[field.name] as string)
                        : undefined;

                  if (field.type === "custom" && field.component) {
                     return (
                        <Box key={field.name}>
                           <label>{field.label}</label>
                           {field.component({
                              value: createForm.values[field.name],
                              error,
                              setValue: (value) => {
                                 console.log({ value, field: field.name });
                                 createForm.setFieldValue(field.name, value);
                              },
                              createForm,
                           })}
                        </Box>
                     );
                  }

                  if (field.type === "text") {
                     return (
                        <TextInput
                           key={field.name}
                           placeholder={field.placeholder || field.label}
                           withAsterisk={field.withAsterisk}
                           label={field.label}
                           name={field.name}
                           value={createForm.values[field.name]}
                           onChange={createForm.handleChange}
                           error={error}
                           inputWrapperOrder={["label", "input", "error"]}
                        />
                     );
                  }

                  if (field.type === "password") {
                     return (
                        <CustomPasswordInput
                           key={field.name}
                           label={field.label}
                           placeholder={field.placeholder || field.label}
                           withAsterisk={field.withAsterisk}
                           name={field.name}
                           value={createForm.values[field.name]}
                           onChange={createForm.handleChange}
                           error={error}
                           inputWrapperOrder={["label", "input", "error"]}
                        />
                     );
                  }

                  if (field.type === "textArea") {
                     return (
                        <Textarea
                           key={field.name}
                           placeholder={field.placeholder || field.label}
                           withAsterisk={field.withAsterisk}
                           label={field.label}
                           name={field.name}
                           autosize={field.autosize}
                           resize={field.resize}
                           minRows={field.minRows}
                           maxRows={field.maxRows}
                           value={createForm.values[field.name]}
                           onChange={createForm.handleChange}
                           error={error}
                           inputWrapperOrder={["label", "input", "error"]}
                        />
                     );
                  }

                  if (field.type === "number") {
                     return (
                        <NumberInput
                           key={field.name}
                           withAsterisk={field.withAsterisk}
                           label={field.label}
                           name={field.name}
                           value={createForm.values[field.name]}
                           onChange={(value) => createForm.setFieldValue(field.name, value)}
                           error={error}
                           inputWrapperOrder={["label", "input", "error"]}
                           suffix={field.suffix}
                           leftSection={field.leftSection}
                           thousandSeparator={field.thousandSeparator}
                           defaultValue={field.defaultValue}
                        />
                     );
                  }

                  if (field.type === "select") {
                     return (
                        <Select
                           key={field.name}
                           label={field.label}
                           placeholder={field.placeholder || field.label}
                           withAsterisk={field.withAsterisk}
                           data={field.dataSelect}
                           value={String(createForm.values[field.name])}
                           onChange={(value) => {
                              if (value === "true" || value === "false") {
                                 createForm.setFieldValue(field.name, value === "true");
                              } else {
                                 createForm.setFieldValue(field.name, value);
                              }
                           }}
                           inputWrapperOrder={["label", "input", "error"]}
                        />
                     );
                  }

                  if (field.type === "tags") {
                     return (
                        <TagsInput
                           placeholder={field.placeholder || field.label}
                           key={field.name}
                           withAsterisk={field.withAsterisk}
                           label={field.label}
                           data={field.dataTags}
                           // value={(createForm.values[field.name] || []).map((item: number) => field.enum[item]).filter(Boolean)}
                           value={
                              Array.isArray(createForm.values[field.name])
                                 ? createForm.values[field.name].map((item: number) => field.enum?.[item])
                                 : []
                           }
                           onChange={(e) => {
                              createForm.setFieldValue(
                                 field.name,
                                 e.map((item: any) => field.enum?.[item as keyof typeof field.enum] as number)
                              );
                           }}
                           inputWrapperOrder={["label", "input", "error"]}
                        />
                     );
                  }

                  if (field.type === "editor") {
                     return (
                        <Box key={field.name}>
                           <label>{field.label}</label>
                           <RichTextEditor key={1} editor={editor}>
                              <RichTextEditor.Toolbar sticky stickyOffset={60}>
                                 <RichTextEditor.ControlsGroup>
                                    <RichTextEditor.Bold />
                                    <RichTextEditor.Italic />
                                    <RichTextEditor.Underline />
                                    <RichTextEditor.Strikethrough />
                                    <RichTextEditor.ClearFormatting />
                                    <RichTextEditor.Highlight />
                                    <RichTextEditor.Code />
                                 </RichTextEditor.ControlsGroup>

                                 <RichTextEditor.ControlsGroup>
                                    <RichTextEditor.H1 />
                                    <RichTextEditor.H2 />
                                    <RichTextEditor.H3 />
                                    <RichTextEditor.H4 />
                                 </RichTextEditor.ControlsGroup>

                                 <RichTextEditor.ControlsGroup>
                                    <RichTextEditor.Blockquote />
                                    <RichTextEditor.Hr />
                                    <RichTextEditor.BulletList />
                                    <RichTextEditor.OrderedList />
                                    <RichTextEditor.Subscript />
                                    <RichTextEditor.Superscript />
                                 </RichTextEditor.ControlsGroup>

                                 <RichTextEditor.ControlsGroup>
                                    <RichTextEditor.Link />
                                    <RichTextEditor.Unlink />
                                 </RichTextEditor.ControlsGroup>

                                 <RichTextEditor.ControlsGroup>
                                    <RichTextEditor.AlignLeft />
                                    <RichTextEditor.AlignCenter />
                                    <RichTextEditor.AlignJustify />
                                    <RichTextEditor.AlignRight />
                                 </RichTextEditor.ControlsGroup>

                                 <RichTextEditor.ControlsGroup>
                                    <RichTextEditor.Undo />
                                    <RichTextEditor.Redo />
                                 </RichTextEditor.ControlsGroup>
                              </RichTextEditor.Toolbar>

                              <RichTextEditor.Content />
                           </RichTextEditor>
                        </Box>
                     );
                  }

                  if (field.type === "radio") {
                     return (
                        <Radio.Group
                           key={field.name}
                           label={field.label}
                           value={String(createForm.values[field.name])}
                           onChange={(value) => {
                              createForm.setFieldValue(field.name, Number(value));
                           }}
                           withAsterisk={field.withAsterisk}
                        >
                           <Stack gap={10}>
                              {field.dataRadios?.map((option: any) => (
                                 <Radio key={option.value} value={option.value} label={option.label} />
                              ))}
                           </Stack>
                        </Radio.Group>
                     );
                  }

                  return null;
               })}
               <Button loading={update?.isPending || create?.isPending} type="submit">
                  Save
               </Button>
            </Stack>
         </form>
      </Drawer>
   );
}
