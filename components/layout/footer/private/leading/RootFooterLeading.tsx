import React from "react";
import { View } from "react-native";

import { STYLES } from "@/constants/Styles";
import { getTimeZone } from "@/helpers/System";

import TouchableHapticText from "@/components/button/TouchableHaptichText";
import Divider from "@/components/container/Divider";

import GlobalContainerStyle from "@/styles/GlobalContainer";
import { router } from "expo-router";

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
  /**
   * @description Handles the display of the time zones
   * @function */
  const onPress = React.useCallback(() => router.push("/(private)/(modal)/timeZone"), []);

  return (
    <View style={[GlobalContainerStyle.rowCenterCenter, { gap: STYLES.sizeGap }]}>
      <TouchableHapticText
        text={String(`${getTimeZone()}`)}
        i18nTranslation={false}
        onPress={onPress} />
      <Divider vertical />
    </View>
  );
}

export default RootFooterLeading;