import { SheetSize, TrueSheet } from "@lodev09/react-native-true-sheet";
import React, { PropsWithChildren } from "react";
import { View } from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmark } from "@fortawesome/duotone-thin-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import { STYLES } from "@/constants/Styles";
import { useThemeColors } from "@/hooks/theme/useThemeColor";

import TouchableHapticIcon from "@/components/button/TouchableHaptichIcon";
import ViewBase from "@/components/container/View";
import TextBase from "@/components/typography/Text";

import GlobalContainerStyle from "@/styles/GlobalContainer";
import GlobalTypographyStyle from "@/styles/GlobalTypography";

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.1
 * @version 0.0.1
 * @type */
export type BottomSheetProps = PropsWithChildren & {
  name: string;
  title?: string;
  icon?: IconProp;
  size?: SheetSize[] | undefined;
  cornerRadius?: number;
}

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.1
 * @version 0.0.1
 * @param {Object} param0 - Handles the styling and activity of an icon based button
 * @param {string} param0.name - The name of the sheet
 * @param {string} param0.title - The title of the sheet
 * @param {IconProp} param0.icon - The icon of the sheet
 * @param {heetSize[]|undefined} param0.size - The size of the sheet
 * @param {number} param0.cornerRadius - The corner radius of the sheet
 * @param {ReactNode|undefined} param0.children - Represents all of the things React can render.
 * @component */
const BottomSheet = ({
  name,
  title,
  icon,
  size = ["auto"],
  cornerRadius = 0,
  children,
}: BottomSheetProps) => {
  const { primaryBgColor, primaryBorderColor, primaryIconColor } = useThemeColors();

  /**
   * @description Handles the on press event for the dismiss sheet
   * @function */
  const onPressDismiss = React.useCallback(() => TrueSheet.dismiss(name), [name]);

  return (
    <TrueSheet
      edgeToEdge
      name={name}
      backgroundColor={primaryBgColor}
      sizes={size}
      cornerRadius={cornerRadius}
      contentContainerStyle={{ paddingBottom: 40 }}
      style={{ 
        borderTopWidth: 1, 
        backgroundColor: primaryBgColor, 
        borderTopColor: primaryBorderColor 
      }}>
        <ViewBase>
          <View style={[GlobalContainerStyle.rowCenterBetween, { 
            padding: STYLES.paddingVertical - 4,
          }]}>
            <View style={[GlobalContainerStyle.rowCenterStart, { 
              padding: STYLES.paddingVertical + 4,
            }]}>
              {icon && <FontAwesomeIcon
                icon={icon as IconProp}
                size={STYLES.sizeFaIcon}
                color={primaryIconColor} />}  
              {title && <TextBase 
                text={title}
                style={[GlobalTypographyStyle.standardText]} />}
            </View>
            <TouchableHapticIcon
              hideBorder
              icon={faXmark as IconProp}
              onPress={onPressDismiss} />
          </View>
          {children}
        </ViewBase>
    </TrueSheet>
  );
};

export default BottomSheet;