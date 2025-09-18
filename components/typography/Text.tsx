import { TextProps } from "react-native";
import Animated, { BaseAnimationBuilder, EntryExitAnimationFunction } from "react-native-reanimated";
import { ReanimatedKeyframe } from "react-native-reanimated/lib/typescript/layoutReanimation/animationBuilder/Keyframe";

import { useThemeColor } from "@/hooks/theme/useThemeColor";
import { useFontFamily, useFontSize } from "@/hooks/typography/useFont";

import { COLORS } from "@/constants/Colors";

/**
 * @private
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.1
 * @version 0.0.1
 * @type */
type EntryOrExitLayoutType =
  | BaseAnimationBuilder
  | typeof BaseAnimationBuilder
  | EntryExitAnimationFunction
  | ReanimatedKeyframe;

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.1
 * @version 0.0.1
 * @type */
export type TextBaseTypes = "label" | "text" | "subtitle" | "title";

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.1
 * @version 0.0.1
 * @type */
export type TextBaseProps = TextProps & {
  light?: string;
  dark?: string;
  type?: TextBaseTypes;
  animatedEntering?: EntryOrExitLayoutType;
  animatedExiting?: EntryOrExitLayoutType;
}

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @description Returns theme based, flexible and styled view, which will be used as a default container component
 * @since 0.0.1
 * @version 0.0.1
 * @param {Object} param0 - Handles the returning of a generic custom typed and styled text 
 * @param {string} param0.dark - Custom hex color in dark mode 
 * @param {string} param0.light - Custom hex color in light mode
 * @param {TextBaseTypes} param0.type - Text type handles the font sizes/family -> constants/Styles
 * @param {StyleProp<TextStyle>} param0.style - Extended custom styling 
 * @param {EntryOrExitLayoutType} param0.animatedEntering - Animated entering layout type
 * @param {EntryOrExitLayoutType} param0.animatedExiting - Animated exiting layout type */
const TextBase = ({
  dark,
  light,
  type = "text",
  style,
  animatedEntering,
  animatedExiting,
  ...props
}: TextBaseProps) => {
  return (
    <Animated.Text 
      entering={animatedEntering}
      exiting={animatedExiting}
      style={[{
        color: useThemeColor(type as keyof typeof COLORS.light & keyof typeof COLORS.dark, { dark, light }),
        fontSize: useFontSize(type),
        fontFamily: useFontFamily(type)
      }, style]} 
      {...props} />
  )
}

export default TextBase;