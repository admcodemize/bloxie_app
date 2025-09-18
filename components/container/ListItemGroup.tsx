import { PropsWithChildren } from "react";
import { StyleProp, View, ViewStyle } from "react-native";

import { IconProp } from "@fortawesome/fontawesome-svg-core";

import { useThemeColors } from "@/hooks/theme/useThemeColor";

import TextBase from "@/components/typography/Text";

import GlobalTypographyStyle from "@/styles/GlobalTypography";

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.1
 * @version 0.0.1
 * @type */
export type ListItemGroupProps = PropsWithChildren & {
  title?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.1
 * @version 0.0.1
 * @description A container for a group of settings
 * -> Used for components such as ListItemWithChildren or all the other components that are registered in the path components/list/..
 * @param {ListItemGroupProps} param0
 * @param {string} param0.title - The title of the group
 * @param {React.ReactNode} param0.children - The children of the group
 * @component */
const ListItemGroup = ({
  title,
  children,
  style
}: ListItemGroupProps) => {
  const { info } = useThemeColors();

  return (
    <View style={[style, { gap: 10 }]}>
      {title && <TextBase 
        text={title}
        style={[GlobalTypographyStyle.standardText, { 
        color: info, 
        paddingLeft: 8
      }]} />}
      {children}
    </View>
  )
}

export default ListItemGroup;