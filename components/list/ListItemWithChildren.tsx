import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { PropsWithChildren } from "react";
import { StyleProp, View, ViewStyle } from "react-native";

import { STYLES } from "@/constants/Styles";
import { useThemeColors } from "@/hooks/theme/useThemeColor";

import TouchableHapticIcon from "@/components/button/TouchableHaptichIcon";
import TextBase from "@/components/typography/Text";

import GlobalContainerStyle from "@/styles/GlobalContainer";
import GlobalTypographyStyle from "@/styles/GlobalTypography";
import { faCaretRight } from "@fortawesome/duotone-thin-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.1
 * @version 0.0.1
 * @type */
export type ListItemWithChildrenProps = PropsWithChildren & {
  icon: IconProp;
  title: string;
  description: string;
  styleTextComponent?: StyleProp<ViewStyle>;
}

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @description A list item with a title, description and children
 * @since 0.0.1
 * @version 0.0.1
 * @param {ListItemWithChildrenProps} param0
 * @param {IconProp} param0.icon - The icon to display
 * @param {string} param0.title - The title of the list item
 * @param {string} param0.description - The description of the list item
 * @param {React.ReactNode} param0.children - The generic children to display on the right side of the list item
 * @component */
const ListItemWithChildren = ({
  icon,
  title,
  description,
  styleTextComponent,
  children
}: ListItemWithChildrenProps) => {
  const { primaryIconColor, info } = useThemeColors();

  return (
    <View style={[GlobalContainerStyle.rowCenterStart]}>
      <View style={[GlobalContainerStyle.rowCenterStart, { gap: 4 }]}>
        <TouchableHapticIcon
          hideBorder
          icon={icon}
          iconSize={STYLES.sizeFaIcon + 4} />
          <View style={[GlobalContainerStyle.rowCenterBetween, { flex: 1 }]}>
            <View style={[{ flexShrink: 1 }, styleTextComponent]}>
              <TextBase style={[GlobalTypographyStyle.standardText]}>{title}</TextBase>
              <TextBase 
                numberOfLines={2}
                ellipsizeMode="tail"
                style={[GlobalTypographyStyle.labelText, { 
                  color: info
                }]}>{description}</TextBase>
            </View>
            <FontAwesomeIcon
              icon={faCaretRight as IconProp}
              size={STYLES.sizeFaIcon}
              color={primaryIconColor} />
          </View>
      </View>
      {children}
    </View>
  )
}

export default ListItemWithChildren;