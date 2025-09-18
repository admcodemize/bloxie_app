import { STYLES } from "@/constants/Styles";
import GlobalContainerStyle from "@/styles/GlobalContainer";
import GlobalTypographyStyle from "@/styles/GlobalTypography";
import { faChevronLeft, faXmark } from "@fortawesome/duotone-thin-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";
import TouchableHapticIcon from "../button/TouchableHaptichIcon";
import TextBase from "../typography/Text";
import Divider from "./Divider";

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.1
 * @version 0.0.1
 * @enum */
export enum StackModalHeaderPresentationEnum {
  modal = "modal",
  card = "card"
}

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.1
 * @version 0.0.1
 * @type */
export type StackModalHeaderProps = {
  icon: IconProp;
  title: string;
  presentation?: StackModalHeaderPresentationEnum;
}

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.1
 * @version 0.0.1
 * @param {StackModalHeaderProps} param0
 * @param {IconProp} param0.icon - The icon to display
 * @param {string} param0.title - The title to display
 * @param {StackModalHeaderPresentationEnum} param0.presentation - The presentation of the header handles the type of the back/close icon to display
 * @component */
const StackModalHeader = ({
  icon,
  title,
  presentation = StackModalHeaderPresentationEnum.modal
}: StackModalHeaderProps) => {
  /**
   * @description Handles the on press event for the close/back button
   * @function */
  const onPressClose = React.useCallback(() => router.back(), []);

  return (
    <View style={[GlobalContainerStyle.rowStartBetween, { paddingHorizontal: STYLES.paddingHorizontal }]}>
      <View style={[GlobalContainerStyle.rowCenterStart, GlobalContainerStyle.sizeGap]}>
        <Divider 
          vertical
          style={{ backgroundColor: "#3EFDC3", width: 2, height: 20 }} />
        <TouchableHapticIcon
          icon={icon}
          disabled={true}
          onPress={() => {}} />
        <TextBase 
          text={title}
          style={GlobalTypographyStyle.titleSubtitle} />
      </View>
      <View style={[GlobalContainerStyle.rowCenterStart, GlobalContainerStyle.sizeGap]}>
      <TouchableHapticIcon
          hideBorder
          icon={presentation === StackModalHeaderPresentationEnum.modal ? faXmark as IconProp : faChevronLeft as IconProp}
          onPress={onPressClose} />
      </View>
    </View>
  )
}

export default StackModalHeader;