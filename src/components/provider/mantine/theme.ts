import { createTheme, CSSVariablesResolver } from "@mantine/core";

export const colors = {
   Aurora: ["#e6f6ff", "#cceeff", "#b3e5ff", "#99ddff", "#80d4ff", "#66ccff", "#4dc3ff", "#33bbff", "#1ab2ff", "#00aaff"],
   Blush: ["#fff0f5", "#ffe4ec", "#ffd6e3", "#ffc9db", "#ffbbd2", "#ffadca", "#ff9fc1", "#ff91b9", "#ff84b0", "#ff76a8"],
   Violet: ["#f5f0ff", "#e8dbff", "#dcc7ff", "#cfb3ff", "#c39fff", "#b68aff", "#aa76ff", "#9d62ff", "#914eff", "#842aff"],
   Mint: ["#e6fff5", "#ccffeb", "#b3ffe0", "#99ffd6", "#80ffcc", "#66ffc2", "#4dffb8", "#33ffad", "#1affa3", "#00ff99"],
   Sunset: ["#fff0e6", "#ffe0cc", "#ffd1b3", "#ffc199", "#ffb280", "#ffa366", "#ff944d", "#ff8533", "#ff751a", "#ff6600"],
   IndigoSteel: ["#edf0f9", "#dbe1f2", "#c7d1ec", "#b3c2e5", "#9fb2df", "#8ba3d8", "#7893d2", "#6484cb", "#5074c5", "#3c65be"],
   ElectricPlum: ["#f7f3ff", "#e6dbff", "#d4c2ff", "#c2aaff", "#b091ff", "#9e78ff", "#8d60ff", "#7b47ff", "#692eff", "#5715ff"],
   FrostedCyan: ["#f0fafd", "#d5f1f9", "#bbe8f5", "#a0e0f0", "#85d7ec", "#6acee8", "#50c6e4", "#35bde0", "#1bb5db", "#00acd7"],
   GoldenDust: ["#fefcf5", "#fcf5e5", "#f9edcf", "#f7e5b9", "#f4dda3", "#f1d48c", "#efcc76", "#ecc460", "#e9bb49", "#e7b333"],
   SlateGraphite: ["#f7f8fa", "#e1e3e8", "#caccd3", "#b4b6bd", "#9da0a7", "#878a91", "#70737d", "#5a5d68", "#434651", "#2d2f3b"],
   CrimsonFlame: ["#fff5f5", "#ffe3e3", "#ffc9c9", "#ffa8a8", "#ff8787", "#ff6b6b", "#fa5252", "#f03e3e", "#e03131", "#c92a2a"],
   RosewoodBrick: ["#fdf3f3", "#f8dede", "#f1c4c4", "#eaa9a9", "#e28e8e", "#db7373", "#d35858", "#cc3e3e", "#b33636", "#992e2e"],
   OliveGrove: ["#f7f9f5", "#e5ecdb", "#d2debf", "#bfd1a3", "#adc387", "#9ab66b", "#88a94f", "#759c33", "#628f17", "#4f8200"],
   EmeraldMist: ["#f2fef9", "#d1f9eb", "#aaf2d8", "#85ebc6", "#61e4b3", "#3cdda1", "#1ad68e", "#00c47e", "#00b06f", "#009c60"],
   ForestDepth: ["#f3f9f5", "#d7eadc", "#b8dbc2", "#99cda8", "#7abe8e", "#5cb074", "#3da15a", "#21833f", "#156832", "#0a4e25"],
} as const;

type TGetTheme = {
   primaryColor: string;
};

export const getTheme = ({ primaryColor }: TGetTheme) => {
   return createTheme({
      colors: colors,
      primaryColor: primaryColor,
      components: {
         Button: {
            defaultProps: {
               radius: "lg",
            },
         },
         Modal: {
            defaultProps: {
               radius: "lg",
            },
         },
      },
   });
};

export const resolver: CSSVariablesResolver = () => ({
   variables: {},
   light: {
      "--mantine-color-body": "#F2F4F7",
   },
   dark: {

   },
});
