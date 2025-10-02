import React from "react";
import { GestureResponderEvent, View } from "react-native";

import { faCalendar, faChartNetwork, faRotate } from "@fortawesome/duotone-thin-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import { STYLES } from "@/constants/Styles";
import { useDropdown } from "@/hooks/button/useDropdown";

import TouchableDropdown, { open as _open } from "@/components/button/TouchableDropdown";
import TouchableDropdownItem from "@/components/button/TouchableDropdownItem";
import ViewBase from "@/components/container/View";
import TextBase from "@/components/typography/Text";

import TouchableHapticDropdown from "@/components/button/TouchableHapticDropdown";
import TouchableHapticIcon from "@/components/button/TouchableHaptichIcon";
import Divider from "@/components/container/Divider";
import { useThemeColors } from "@/hooks/theme/useThemeColor";
import GlobalContainerStyle from "@/styles/GlobalContainer";
import GlobalTypographyStyle from "@/styles/GlobalTypography";

const DROPDOWN_WIDTH = 175;

const ScreenDashboard = () => {
  const { primaryBgColor } = useThemeColors();

  const refContainer = React.useRef<any>(null)
  const refTeams = React.useRef<View>(null);
  const refCalendar = React.useRef<View>(null);

 /**
   * @description Get the dropdown functions.
   * @see {@link hooks/container/useDropdown} */
   const { open, close } = useDropdown();

  /**
   * @description Used to open the dropdown component
   * @param {React.RefObject<View|any>} ref - The ref of the dropdown component for calculating the measurement position
   * @param {GestureResponderEvent} e - The event of the dropdown component
   * @function */
  const onPressDropdown = React.useCallback(
    (ref: React.RefObject<View|any>) =>
    (e: GestureResponderEvent) => {
    /** 
     * @description Open the dropdown component based on a calculated measurement template
     * @see {@link components/button/TouchableDropdown} */
    _open({
      refTouchable: ref,
      refContainer,
      open,
      children: <TouchableDropdownBase />,
      containerWidth: DROPDOWN_WIDTH
    });
  }, [open]);

  return (
    <ViewBase 
      ref={refContainer}
      schemeProperty="secondaryBg"
      style={{ padding: STYLES.paddingHorizontal, gap: STYLES.sizeGap * 2 }}>
      <View style={{ gap: STYLES.sizeGap / 2 }}>
        <TextBase 
          text="Analytics" 
          style={[GlobalTypographyStyle.textSubtitle, { paddingLeft: 4 }]} />
        <TextBase 
          type="label" 
          text="Untersuche deine Daten mithilfe von Statistiken und Diagrammen um neue Erkenntnisse zu gewinnen oder Trends zu identifizieren." 
          style={[GlobalTypographyStyle.labelText, { paddingLeft: 4 }]} />
      </View>
      <View style={[GlobalContainerStyle.rowCenterBetween]}>
        <View style={[GlobalContainerStyle.rowCenterStart, { gap: STYLES.sizeGap }]}>
          <TouchableHapticDropdown
            ref={refTeams}
            icon={faChartNetwork as IconProp}
            text="codemize.com"
            backgroundColor={primaryBgColor}
            onPress={onPressDropdown(refTeams)} /> 
          <TouchableHapticDropdown
            ref={refCalendar}
            icon={faCalendar as IconProp}
            text="Last 30 days"
            backgroundColor={primaryBgColor}
            onPress={onPressDropdown(refCalendar)} /> 
        </View>
        <View style={[GlobalContainerStyle.rowCenterStart, { gap: STYLES.sizeGap }]}>
          <Divider vertical />
          <TouchableHapticIcon
            icon={faRotate as IconProp}
            backgroundColor={primaryBgColor}
            onPress={() => {}} />
        </View>
      </View>
    </ViewBase>
  );
}

const TouchableDropdownBase = () => (
  <TouchableDropdown
    title="Breaking Time"
    style={[{ width: DROPDOWN_WIDTH }]}>
      <TouchableDropdownItem
        onPress={() => () => {}}>

    </TouchableDropdownItem>
  </TouchableDropdown>
);

export default ScreenDashboard;