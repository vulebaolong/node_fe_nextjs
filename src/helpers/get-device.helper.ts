type DeviceType = "desktop" | "mobile" | "tablet" | "unknown";

export const classifyDevice = (os: "undetermined" | "macos" | "ios" | "windows" | "android" | "linux", screenWidth?: number): DeviceType => {
   if (os === "undetermined") return "unknown";

   // Kiểm tra tablet
   if (os === "ios" && screenWidth && screenWidth >= 768) {
      return "tablet"; // iPad
   }
   if (os === "android" && screenWidth && screenWidth >= 600) {
      return "tablet"; // Android tablet
   }

   // Desktop
   if (os === "macos" || os === "windows" || os === "linux") {
      return "desktop";
   }

   // Mobile
   if (os === "ios" || os === "android") {
      return "mobile";
   }

   return "unknown";
};
