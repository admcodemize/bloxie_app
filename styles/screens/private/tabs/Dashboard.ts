import { STYLES } from "@/constants/Styles";
import { StyleSheet } from "react-native";

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.4
 * @version 0.0.1 */
const DashboardStyle = StyleSheet.create({
  view: {
    padding: STYLES.paddingHorizontal,
    gap: STYLES.sizeGap * 2
  }
})

export default DashboardStyle;