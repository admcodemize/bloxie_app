import { useColorScheme } from 'react-native';

import { COLORS } from '@/constants/Colors';

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.1
 * @version 0.0.1
 * @type */
export type ThemeProps = {
  light?: string;
  dark?: string;
}

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @description Returns theme based color
 * @since 0.0.1
 * @version 0.0.1
 * @param {string} prop - The property to get the color from inside the color constants object
 * @param {ThemeProps} props - Handles individual color styling based on the theme
 * @function */
export const useThemeColor = (
  prop: keyof typeof COLORS.light & keyof typeof COLORS.dark,
  props: ThemeProps = {},
) => {
  const theme = useColorScheme() || "light";
  const colorFromProps = props[theme];

  if (colorFromProps) return colorFromProps;
  return COLORS[theme][prop];
}

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @description Returns theme based colors
 * @since 0.0.1
 * @version 0.0.2
 * @function */
export const useThemeColors = () => {
  const primaryBgColor = useThemeColor("primaryBg");
  const secondaryBgColor = useThemeColor("secondaryBg");
  const tertiaryBgColor =  useThemeColor("tertiaryBg");
  const primaryBorderColor = useThemeColor("primaryBorder");
  const primaryIconColor = useThemeColor("primaryIcon");
  const secondaryIconColor = useThemeColor("secondaryIcon");
  const primaryIconBg = useThemeColor("primaryIconBg");
  const info = useThemeColor("info");
  const text = useThemeColor("text");
  const focusedBg = useThemeColor("focusedBg");
  const focusedContent = useThemeColor("focusedContent");
  const success = useThemeColor("success");
  const error = useThemeColor("error");
  const warning = useThemeColor("warning");
  const information = useThemeColor("information");

  return {
    primaryBgColor,
    secondaryBgColor,
    tertiaryBgColor,
    primaryBorderColor,
    primaryIconColor,
    secondaryIconColor,
    primaryIconBg,
    info,
    text,
    focusedBg,
    focusedContent,
    success,
    error,
    warning,
    information
  }
}