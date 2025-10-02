import { FAMILIY, SIZES } from "@/constants/Fonts";
import { LEVEL, STYLES } from "@/constants/Styles";
import { StyleSheet } from "react-native";

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.2
 * @version 0.0.1 */
const TouchableDropdownStyle = StyleSheet.create({
  view: {
    position: "absolute",
    overflow: "hidden",
    borderWidth: 0,
    borderRadius: 5,
    paddingHorizontal: 4,
    paddingVertical: 8,
    zIndex: LEVEL.level3
  },
  header: {
    paddingHorizontal: 8, 
    gap: STYLES.sizeGap
  },
  dropdownItem: {
    gap: STYLES.sizeGap, 
    padding: STYLES.paddingVertical,
    borderRadius: 10 
  },
  dropdownTitle: {
    fontSize: Number(SIZES.label), 
    fontFamily: String(FAMILIY.subtitle)
  },
  dropdownLabel: {
    fontSize: Number(SIZES.label), 
    fontFamily: String(FAMILIY.subtitle)
  }
});

export default TouchableDropdownStyle;