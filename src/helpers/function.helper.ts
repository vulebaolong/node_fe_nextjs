import * as Yup from "yup";
import { NEXT_PUBLIC_BASE_DOMAIN_API, NEXT_PUBLIC_BASE_DOMAIN_CLOUDINARY, FOLDER_IMAGE_BE } from "@/constant/app.constant";
import dayjs from "dayjs";
import { TFieldCreate } from "@/components/content-admin/ContentAdmin";

export const checkPathImage = (path: string | null | undefined) => {
   if (!path) return path;
   if (path.includes(`http`)) return path;

   if (path.includes(`local`)) {
      return `${NEXT_PUBLIC_BASE_DOMAIN_API}${FOLDER_IMAGE_BE}${path}`;
   } else {
      return `${NEXT_PUBLIC_BASE_DOMAIN_CLOUDINARY}${path}`;
   }
};

export const resError = (error: any, defaultMes: string) => {
   const mes = error.response?.data?.message;

   if (Array.isArray(mes)) return mes[0];

   if (error.message) return error.message;

   return defaultMes;
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

export class LogWithColor {
   private tagText: string = "";
   private tagColor: string = "gray";
   private messageText: string = "";
   private messageColor: string = "black";

   // 🏷️ Thiết lập tag
   tag(tag: string, color: string = "gray") {
      this.tagText = tag;
      this.tagColor = color;
      return this; // 👈 Cho phép chain method tiếp theo
   }

   // ✉️ Thiết lập message
   mes(message: string, color: string = "white") {
      this.messageText = message;
      this.messageColor = color;
      this.printLog();
   }

   // 📌 Thực hiện console.log với màu
   private printLog() {
      console.log(
         `%c[${this.tagText}] %c${this.messageText}`,
         `color: ${this.tagColor}; font-weight: bold;`,
         `color: ${this.messageColor}; font-weight: bold;`
      );
   }
}

// ✅ Khởi tạo instance
export const logWithColor = new LogWithColor();

export function buildInitialValues(fields: TFieldCreate[]) {
   return fields.reduce((acc, field) => {
      if (field.type === "number") {
         acc[field.name] = 0;
      } else if (field.type === "tags") {
         acc[field.name] = [];
      } else if (field.type === "select" && field.dataTags?.some((item: any) => item.value === "true" || item.value === "false")) {
         acc[field.name] = false;
      } else {
         acc[field.name] = "";
      }
      return acc;
   }, {} as Record<string, any>);
}

export function buildValidationSchema(fields: TFieldCreate[]) {
   const shape: Record<string, any> = {};

   fields.forEach((field) => {
      let validator: any = null;

      switch (field.type) {
         case "text":
            validator = Yup.string();
            break;
         case "number":
            validator = Yup.number();
            break;
         case "select":
            validator = Yup.string();
            break;
         case "date":
            validator = Yup.date();
            break;
         default:
            validator = Yup.mixed();
      }

      if (field.withAsterisk) {
         validator = validator.required(`${field.label} is required`);
      }

      if (field.validate) {
         // Nếu có custom validate → apply
         validator = field.validate(Yup, validator);
      }

      shape[field.name] = validator;
   });

   return Yup.object().shape(shape);
}