import { PropsWithChildren } from "react";
import { GestureResponderEvent, ViewStyle } from "react-native";

import TouchableHaptic from "@/components/button/TouchableHaptic";

/**
 * @private
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.17
 * @version 0.0.18
 * @type */
type DropdownItemProps = PropsWithChildren & {
  onPress: (e: GestureResponderEvent) => void;
  style?: ViewStyle|ViewStyle[];
}

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @description Returns a positioned dropdown based on parent component
 * @since 0.0.2
 * @version 0.0.1
 * @param {Object} param0 
 * @param {boolean} param0.onPress - Callback function called when user has clicked an item
 * @param {ViewStyle} param0.style - Custom dropdown style */
const TouchableDropdownItem = ({ 
  onPress,
  style,
  children,
}: DropdownItemProps) => {  
  return (
    <TouchableHaptic
      onPress={onPress}
      style={style}>
        {children}
    </TouchableHaptic>
  )
}

export default TouchableDropdownItem;