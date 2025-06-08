import { memo } from "react";
import { TextInput } from "@mantine/core";

type Props = {
   label: string;
   name: string;
   value: string;
   error?: string;
   withAsterisk?: boolean;
   placeholder?: string;
   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function FormFieldTextComponent(props: Props) {
   return (
      <TextInput
         label={props.label}
         name={props.name}
         value={props.value}
         onChange={props.onChange}
         error={props.error}
         withAsterisk={props.withAsterisk}
         placeholder={props.placeholder || props.label}
         inputWrapperOrder={["label", "input", "error"]}
      />
   );
}

const FormFieldText = memo(FormFieldTextComponent);
export default FormFieldText;
