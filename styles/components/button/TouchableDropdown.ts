import { LEVEL, STYLES } from "@/constants/Styles";
import { StyleSheet } from "react-native";

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.2
 * @version 0.0.3 */
const TouchableDropdownStyle = StyleSheet.create({
  view: {
    position: "absolute",
    overflow: "hidden",
    borderWidth: 1,
    borderRadius: 8,
    padding: 6,
    width: "auto",
    zIndex: LEVEL.level3
  },
  header: {
    paddingHorizontal: 8, 
    gap: STYLES.sizeGap
  }
});

export default TouchableDropdownStyle;