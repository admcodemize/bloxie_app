/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.*/
import { Platform } from 'react-native';

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @readonly
 * @since 0.0.1
 * @version 0.0.3
 * @constant */
export const COLORS = {
  light: {
    info: "#626D7B",
    label: "#999999",
    text: '#303030',
    title: "#1B1B1B",
    subtitle: "#303030",
    focusedBg: "#303030",
    focusedContent: "#fff",
    dashboardCardBg: "#e7e7e7",
    dashboardCardIconBg: "#D2D2D2",
    dashboardCardTitle: "#5E5E5E",
    dashboardCardValue: "#1B1B1B",
    success: "#159F85",
    error: "#D15555",
    warning: "#e09100",
    information: "#047dd4",
    pointerComponent: "#000",
    primaryBg: "#fff",
    secondaryBg: "#F3F3F3",
    tertiaryBg: "#f8f8f8",
    primaryBorder: "#E3E3E3",
    secondaryBorder: "#CACACA",
    tertiaryBorder: "#D1D1D1",
    primaryIcon: "#303030",
    secondaryIcon: "#626D7B",
    primaryIconBg: "#fff",
    weekendBgColor: "#5E5E5E",
    todayBgColor: "#047dd4"
  },
  dark: {
    info: "#626D7B",
    label: "#FFF",
    text: '#FFF',
    title: "#FFF",
    subtitle: "#FFF",
    focusedBg: "#051120",
    focusedContent: "#fff",
    dashboardCardBg: "#e7e7e7",
    dashboardCardIconBg: "#D2D2D2",
    dashboardCardTitle: "#5E5E5E",
    dashboardCardValue: "#1B1B1B",
    success: "#159F85",
    error: "#D15555",
    warning: "#D76F00",
    information: "#0092F9",
    pointerComponent: "white",
    primaryBg: "#15151D",
    secondaryBg: "#181820",
    tertiaryBg: "#232429",
    primaryBorder: "#282a33",
    secondaryBorder: "#CACACA",
    tertiaryBorder: "#d1d1d1",
    primaryIcon: "#626D7B",
    secondaryIcon: "#fff",
    primaryIconBg: "#1f2127",
    weekendBgColor: "#5E5E5E",
    todayBgColor: "#303030"
  },
};

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @readonly
 * @since 0.0.1
 * @version 0.0.1
 * @constant */
export const FONTS = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
