import { router } from "expo-router";
import React from "react";
import { View } from "react-native";

import { faEllipsisStrokeVertical, faGrid2Plus, faPlug } from "@fortawesome/duotone-thin-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import { STYLES } from "@/constants/Styles";

import TouchableHapticIcon from "@/components/button/TouchableHaptichIcon";
import Divider from "@/components/container/Divider";

import GlobalContainerStyle from "@/styles/GlobalContainer";

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.1
 * @version 0.0.1
 * @type */
export type RootFooterTrailingProps = {

}

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.1
 * @version 0.0.2
 * @component */
const RootFooterTrailing = ({

}: RootFooterTrailingProps) => {
  /**
   * @description Handles the on press event for opening the create modal
   * @function */
  const onPressCreate = React.useCallback(() => router.push("/(private)/(modal)/create"), []);

  return (
    <View style={[GlobalContainerStyle.rowCenterCenter, { gap: STYLES.sizeGap }]}>
      <TouchableHapticIcon
        icon={faPlug as IconProp}
        onPress={() => {}} />
      <TouchableHapticIcon
        icon={faGrid2Plus as IconProp}
        onPress={onPressCreate} />
      <Divider vertical />
      <TouchableHapticIcon
        icon={faEllipsisStrokeVertical as IconProp}
        onPress={() => {}} />
    </View>
  );
}

export default RootFooterTrailing;