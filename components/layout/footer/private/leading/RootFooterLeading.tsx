import React from "react";
import { View } from "react-native";

import { STYLES } from "@/constants/Styles";


import { useDateTimeContextStore } from "@/context/DateTimeContext";
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
 * @version 0.0.2
 * @component */
const RootFooterLeading = ({

}: RootFooterLeadingProps) => {
  /**
   * @description Returns the current time zone of the user
   * @see {@link @/context/DateTimeContext} */
  const timeZone = useDateTimeContextStore((state) => state.timeZone);

  /**
   * @description Handles the display of the time zones
   * @function */
  const onPress = React.useCallback(() => router.push("/(private)/(modal)/timeZone"), []);

  return (
    <View style={[GlobalContainerStyle.rowCenterCenter, { gap: STYLES.sizeGap }]}>
      {/*<TouchableHapticText
        text={String(`${timeZone}`)}
        i18nTranslation={false}
        onPress={onPress} />
      <Divider vertical />*/}
    </View>
  );
}

export default RootFooterLeading;