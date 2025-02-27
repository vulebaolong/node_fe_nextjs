const postcss = require("postcss");

module.exports = postcss.plugin("postcss-mobile-desktop-enhanced", () => {
   return (root) => {
      root.walkDecls((decl) => {
         // handle mobile-desktop
         if (decl.value.includes("mobile-desktop(")) {
            const match = decl.value.slice(15, -1).split("=");
            if (match && match.length >= 2) {
               const mobileValue = match[0].trim();
               const desktopValue = match[1].trim();

               // Create at-rule for mobile
               const mobileRule = postcss.atRule({
                  name: "media",
                  params: `(max-width: $mantine-breakpoint-md)`,
               });
               const mobileDecl = decl.clone({ value: mobileValue });
               mobileRule.append(mobileDecl);

               // Create at-rule for desktop
               const desktopRule = postcss.atRule({
                  name: "media",
                  params: `(min-width: $mantine-breakpoint-md)`,
               });
               const desktopDecl = decl.clone({ value: desktopValue });
               desktopRule.append(desktopDecl);

               // Insert the new rules before the original declaration
               decl.before(mobileRule);
               decl.before(desktopRule);

               // Remove the original declaration
               decl.remove();
            }
         }

         // handle mobile-tablet-desktop
         if (decl.value.includes("mobile-tablet-desktop(")) {
            const match = decl.value.slice(22, -1).split("=");
            if (match && match.length >= 3) {
               const mobileValue = match[0].trim();
               const tabletValue = match[1].trim();
               const desktopValue = match[2].trim();

               // Create at-rule for mobile
               const mobileRule = postcss.atRule({
                  name: "media",
                  params: `(max-width: $mantine-breakpoint-sm)`,
               });
               const mobileDecl = decl.clone({ value: mobileValue });
               mobileRule.append(mobileDecl);

               // Create at-rule for tablet
               const tabletRule = postcss.atRule({
                  name: "media",
                  params: `(min-width: $mantine-breakpoint-sm) and (max-width: $mantine-breakpoint-lg)`,
               });
               const tabletDecl = decl.clone({ value: tabletValue });
               tabletRule.append(tabletDecl);

               // Create at-rule for desktop
               const desktopRule = postcss.atRule({
                  name: "media",
                  params: `(min-width: $mantine-breakpoint-lg)`,
               });
               const desktopDecl = decl.clone({ value: desktopValue });
               desktopRule.append(desktopDecl);

               // Insert the new rules before the original declaration
               decl.before(mobileRule);
               decl.before(tabletRule);
               decl.before(desktopRule);

               // Remove the original declaration
               decl.remove();
            }
         }
      });
   };
});
