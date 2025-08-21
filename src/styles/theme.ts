import useSystemStore from "@stores/system";

export enum BorderRadius {
  none = "0rem",
  small = "0.25rem",
  medium = "0.5rem",
  large = "0.75rem",
  huge = "2rem",
  full = "31.25rem",
}

export enum LightColors {
  primary = "#024FF0",
  secondary = "#0499C8",
  background = "#FFFFFF",
  backgroundSecondary = "#F5F5F5",
  text = "#1A1A1A",
  subtle = "#2A2A2A",
}

export enum DarkColors {
  primary = "#024FF0",
  secondary = "#0499C8",
  background = "#1A1A1A",
  backgroundSecondary = "#2E2E2E",
  text = "#FFFFFF",
  subtle = "#FAFAFA",
}

export enum Gradients {
  primary = "linear-gradient(90deg, #024FF0 0%, #0499C8 100%)",
}

export enum FontSize {
  tiny = "0.75rem",
  small = "0.875rem",
  medium = "1rem",
  large = "1.25rem",
  huge = "1.5rem",
  extraHuge = "2rem",
}

type Theme = {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    backgroundSecondary: string;
    text: string;
    subtle: string;
  };
  borderRadius: Record<keyof typeof BorderRadius, string>;
  gradients: Record<keyof typeof Gradients, string>;
  fontSize: Record<keyof typeof FontSize, string>;
};

let oldTheme: string | null = null;
let currentTheme: Theme;

const updateTheme = () => {
  const storeTheme = useSystemStore.getState().system.theme;
  oldTheme = storeTheme;
  currentTheme = {
    colors:
      storeTheme === "dark"
        ? (DarkColors as unknown as Theme["colors"])
        : (LightColors as unknown as Theme["colors"]),
    borderRadius: BorderRadius,
    gradients: Gradients,
    fontSize: FontSize,
  };
};

updateTheme();

useSystemStore.subscribe((state) => {
  if (oldTheme !== state.system.theme) {
    updateTheme();
  }
});

const getCurrentTheme = (): Theme => currentTheme;

export default getCurrentTheme;
