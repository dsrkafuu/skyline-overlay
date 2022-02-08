import { ThemePartial, DefaultThemeOptions, Theme } from "./constants";

/**
 * Applies default options recursively
 */
function applyDefaultThemeOptionsInner(options: {[k: string]: any}, defaults: {[k: string]: any}) {
  Object.keys(defaults).forEach((option) => {
    if (!(option in options)) {
      options[option] = defaults[option]
    } else if (typeof defaults[option] === 'object' && !Array.isArray(defaults[option]) && defaults[option] !== null) {
      if (option in options) {
        applyDefaultThemeOptionsInner(options[option], defaults[option])
      } else {
        options[option] = defaults[option]
      }
    }
  });

  return options;
}

/**
 * Applies all default options to a theme to return a full theme object.
 */
export function applyDefaultThemeOptions(theme: ThemePartial) {
  theme.options = theme.options
    ? applyDefaultThemeOptionsInner(theme.options, DefaultThemeOptions)
    : DefaultThemeOptions;

  return theme as Theme;
}