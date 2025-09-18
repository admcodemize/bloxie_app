import React from "react";
import { View } from "react-native";

import { TrueSheet } from "@lodev09/react-native-true-sheet";

import { faGrid2Plus, faPlug } from "@fortawesome/duotone-thin-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import { STYLES } from "@/constants/Styles";

import TouchableHapticIcon from "@/components/button/TouchableHaptichIcon";
import Divider from "@/components/container/Divider";
import Create from "@/components/sheet/Create";

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
 * @version 0.0.1
 * @component */
const RootFooterTrailing = ({

}: RootFooterTrailingProps) => {
  /**
   * @description Handles the on press event for the create sheet
   * @function */
  const onPressCreate = React.useCallback(() => TrueSheet.present("create"), []);

  return (
    <View style={[GlobalContainerStyle.rowCenterCenter, { gap: STYLES.sizeGap }]}>
      <Divider vertical />
      <TouchableHapticIcon
        icon={faPlug as IconProp}
        onPress={() => {}} />
      <TouchableHapticIcon
        icon={faGrid2Plus as IconProp}
        onPress={onPressCreate} />
      <Create />
    </View>
  );
}

export default RootFooterTrailing;