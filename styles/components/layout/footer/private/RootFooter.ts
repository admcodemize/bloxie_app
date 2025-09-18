import { StyleSheet } from "react-native";

import { STYLES } from "@/constants/Styles";

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.1
 * @version 0.0.1 */
const RootFooterStyle = StyleSheet.create({
  view: {
    gap: STYLES.sizeGap,
    borderTopWidth: 0.5, 
    height: STYLES.footerRootHeight, 
    paddingTop: STYLES.paddingVertical,
    paddingHorizontal: STYLES.paddingHorizontal,
  },
})

export default RootFooterStyle;