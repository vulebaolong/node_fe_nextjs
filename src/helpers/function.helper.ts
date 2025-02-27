import { BASE_DOMAIN_API, BASE_DOMAIN_CLOUDINARY, FOLDER_IMAGE_BE } from "@/constant/app.constant";
import dayjs from "dayjs";

export const checkPathImage = (path: string | null | undefined) => {
   if (!path) return path;
   if (path.includes(`http`)) return path;

   if (path.includes(`local`)) {
      return `${BASE_DOMAIN_API}${FOLDER_IMAGE_BE}${path}`;
   } else {
      return `${BASE_DOMAIN_CLOUDINARY}${path}`;
   }
};

export const resError = (error: any, defaultMes: string) => {
   let mes = error.response?.data?.message;
   if (!mes) mes = defaultMes;
   if (Array.isArray(mes)) mes = mes[0];
   return mes;
};

export const formatLocalTime = (time?: dayjs.ConfigType, format = "HH:mm:ss DD/MM/YYYY") => {
   if (typeof time === "string") {
      if (format === `ago`) return dayjs.utc(time).local().fromNow();
      return dayjs.utc(time).local().format(format);
   } else if (typeof time === "number") {
      if (format === `ago`) return dayjs.unix(time).local().fromNow();
      return dayjs.unix(time).local().format(format);
   } else {
      if (format === `ago`) return dayjs().local().fromNow();
      return dayjs().local().format(format);
   }
};

export function moveElementToTop<T>(arr: T[], condition: (item: T) => boolean): T[] {
   const matched = arr.filter(condition); // Lấy phần tử thỏa mãn điều kiện
   const others = arr.filter((item) => !condition(item)); // Lấy phần tử không thỏa mãn
   return matched.concat(others); // Ghép lại, đảm bảo phần tử thỏa mãn lên đầu
}

