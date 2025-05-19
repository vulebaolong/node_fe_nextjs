import { Indicator, NumberInput, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useDebouncedCallback } from "@mantine/hooks";
import { IconCalendar } from "@tabler/icons-react";
import { Dispatch, SetStateAction } from "react";

type TProps = {
   filters: any[];
   setFiltersValue: Dispatch<SetStateAction<{}>>;
   filtersValue: {}
};

export default function Filter({ filters, setFiltersValue, filtersValue }: TProps) {
   const handleSearch = useDebouncedCallback(async (query: any) => {
      setFiltersValue(query);
   }, 500);
   return (
      <>
         {filters.map((item, i) => {
            const { field, label, type } = item;
            if (type === `date`) {
               return (
                  <DatePickerInput
                     clearable
                     key={i}
                     onChange={(value) => {
                        handleSearch({ ...filtersValue, [field]: value });
                     }}
                     label={label}
                     placeholder={label}
                     miw={172}
                     valueFormat="DD-MM-YYYY"
                     leftSection={<IconCalendar size={18} stroke={1.5} />}
                     renderDay={(date) => {
                        const day = new Date(date).getDate();
                        return (
                           <Indicator size={6} color="red" offset={-5} disabled={day !== new Date().getDate()}>
                              <div>{day}</div>
                           </Indicator>
                        );
                     }}
                  />
               );
            }
            if (type === `number`) {
               return (
                  <NumberInput
                     key={i}
                     onChange={(value) => {
                        handleSearch({ ...filtersValue, [field]: value });
                     }}
                     label={label}
                     placeholder={label}
                  />
               );
            }
            if (type === `text`) {
               return (
                  <TextInput
                     key={i}
                     onChange={(event) => {
                        const value = event.currentTarget.value.trim();
                        handleSearch({ ...filtersValue, [field]: value });
                     }}
                     label={label}
                     placeholder={label}
                  />
               );
            }
         })}
      </>
   );
}
