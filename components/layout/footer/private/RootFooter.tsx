import { View } from "react-native";

import { useThemeColors } from "@/hooks/theme/useThemeColor";

import RootFooterLeading from "@/components/layout/footer/private/leading/RootFooterLeading";
import RootFooterMiddle from "@/components/layout/footer/private/middle/RootFooterMiddle";
import RootFooterTrailing from "@/components/layout/footer/private/trailing/RootFooterTrailing";

import RootFooterStyle from "@/styles/components/layout/footer/private/RootFooter";
import GlobalContainerStyle from "@/styles/GlobalContainer";

/**
 * @private
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.1
 * @version 0.0.1
 * @type */
type RootFooterProps = {

}

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.1
 * @version 0.0.2
 * @component */
const RootFooter = ({

}: RootFooterProps) => {
  const { primaryBgColor, primaryBorderColor } = useThemeColors();

  return (
    <View style={[GlobalContainerStyle.rowCenterBetween, RootFooterStyle.view, {
      borderTopColor: primaryBorderColor,
      backgroundColor: primaryBgColor
    }]}>
      <RootFooterLeading />
      <RootFooterMiddle />
      <RootFooterTrailing />
    </View>
  );
}

export default RootFooter;