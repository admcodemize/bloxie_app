import { View } from "react-native";

import { STYLES } from "@/constants/Styles";
import { getTimeZoneAbbrevation } from "@/helpers/System";

import TouchableHapticText from "@/components/button/TouchableHaptichText";
import Divider from "@/components/container/Divider";

import GlobalContainerStyle from "@/styles/GlobalContainer";

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.1
 * @version 0.0.1
 * @type */
export type RootFooterLeadingProps = {

}

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.1
 * @version 0.0.1
 * @component */
const RootFooterLeading = ({

}: RootFooterLeadingProps) => {
  return (
    <View style={[GlobalContainerStyle.rowCenterCenter, { gap: STYLES.sizeGap }]}>
      <TouchableHapticText
        text={String(`${getTimeZoneAbbrevation({ now: new Date() })}`)}
        onPress={() => {}} />
      <Divider vertical />
    </View>
  );
}

export default RootFooterLeading;