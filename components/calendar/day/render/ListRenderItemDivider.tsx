import { memo } from "react";
import { View } from "react-native";

import { useThemeColor } from "@/hooks/theme/useThemeColor";
import { STYLES } from "@/constants/Styles";

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.7
 * @version 0.0.1
 * @type */
export type ListRenderItemDividerProps = {
  showBorder: boolean;
}

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @description
 * @since 0.0.7
 * @version 0.0.1 */
const ListRenderItemDivider = ({
  showBorder = true
}: ListRenderItemDividerProps) => {
  const border = useThemeColor("primaryBorder");

  return (
    <View style={{ 
      top: STYLES.calendarHourBorderHeight,
      borderBottomColor: `${border}80`, 
      height: STYLES.calendarHourHeight / 4, 
      borderBottomWidth: showBorder ? STYLES.calendarHourBorderHeight : 0
    }} />    
  )
}

export default memo(ListRenderItemDivider);