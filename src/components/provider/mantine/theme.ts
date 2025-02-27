import { Container, createTheme, CSSVariablesResolver } from "@mantine/core";

export const themeOverride = createTheme({
  // defaultRadius: `0px`,
  primaryColor: 'indigo',
  fontFamily: "Andika, sans-serif",
  fontFamilyMonospace: "Andika, sans-serif",
  headings: {
    fontFamily: "Angkor, sans-serif",
    fontWeight: "400",
  },
  other: {
    color_1: "#00FFF0",
    color_2: "#00D1FF",
    color_3: "#061022",
  },
  components: {
    Container: Container.extend({
      vars: (_, { size, fluid }) => {
        return {
          root: {
            "--container-size": fluid ? `100%` : `var(--container-size-${size ? size : `md`})`,
          },
        };
      },
    }),
    Button: {
      defaultProps: {
        radius: "md",
      },
    }
  },
});

export const resolver: CSSVariablesResolver = (theme) => ({
  variables: {
    "--mantine-color-1": theme.other.color_1,
    "--mantine-color-2": theme.other.color_2,
    "--mantine-color-3": theme.other.color_3,
  },
  light: {

  },
  dark: {},
});
