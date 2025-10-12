import { PropsWithChildren } from "react";
import { GestureResponderEvent, ViewStyle } from "react-native";

import TouchableHaptic from "@/components/button/TouchableHaptic";
import { STYLES } from "@/constants/Styles";
import { useThemeColors } from "@/hooks/theme/useThemeColor";

/**
 * @private
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.2
 * @version 0.0.2
 * @type */
type DropdownItemProps = PropsWithChildren & {
  isSelected?: boolean;
  onPress: (e: GestureResponderEvent) => void;
  style?: ViewStyle;
}

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @description Returns a positioned dropdown based on parent component
 * @since 0.0.2
 * @version 0.0.2
 * @param {Object} param0 
 * @param {boolean} param0.isSelected - Handles the selected state of the dropdown item
 * @param {boolean} param0.onPress - Callback function called when user has clicked an item
 * @param {ViewStyle} param0.style - Custom dropdown style */
const TouchableDropdownItem = ({ 
  isSelected = false,
  onPress,
  style,
  children,
}: DropdownItemProps) => {  
  const { focusedBg } = useThemeColors();
  return (
    <TouchableHaptic
      onPress={onPress}
      style={[{
        padding: STYLES.paddingVertical,
        backgroundColor: isSelected ? focusedBg : undefined,
        borderRadius: 6,
        ...style
      }]}>
        {children}
    </TouchableHaptic>
  )
}

export default TouchableDropdownItem;