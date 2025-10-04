import React from "react";
import { GestureResponderEvent, View } from "react-native";

import { faArrowUpRightFromSquare, faCalendar, faCalendarCheck, faChartNetwork, faCircle, faDown, faHandHoldingHand, faRotate, faStopwatch, faUp, faUsers, faWallet } from "@fortawesome/duotone-thin-svg-icons";
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
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const DROPDOWN_WIDTH = 175;

const ScreenDashboard = () => {
  const { primaryBgColor, primaryIconColor, success, error, focusedBg, secondaryBorderColor } = useThemeColors();

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
      style={{ padding: STYLES.paddingHorizontal, gap: STYLES.sizeGap }}>
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
        <View style={[GlobalContainerStyle.rowCenterStart, { gap: STYLES.sizeGap, paddingBottom: STYLES.sizeGap }]}>
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


      <View style={[GlobalContainerStyle.rowCenterBetween, { gap: STYLES.sizeGap, width: "100%", backgroundColor: "#e9e9e9",
             borderRadius: 6,
             padding: STYLES.paddingVertical,
         }]}>
      <View style={[GlobalContainerStyle.rowCenterStart, { 
        
      }, { gap: STYLES.sizeGap }]}>
        <View style={[GlobalContainerStyle.columnCenterCenter, { backgroundColor: "#D2D2D2", 
          height: 32, width: 32, borderRadius: 8,
          borderWidth: 1,
          borderColor: secondaryBorderColor,
        }]}>
          <FontAwesomeIcon
            icon={faWallet as IconProp}
            size={STYLES.sizeFaIcon + 2}
            color={primaryIconColor} />
        </View>
        <View>
          <TextBase 
            text="Einkommen"
            color="#5E5E5E"
            style={[GlobalTypographyStyle.titleSubtitle, { fontSize: 10 }]} />
            <View style={[GlobalContainerStyle.rowCenterStart, { gap: STYLES.sizeGap - 2 }]}>
              <TextBase 
                text="59'490.00 CHF"
                type="header"
                color="#1B1B1B"
                style={[GlobalTypographyStyle.headerSubtitle]} />
                <View style={[GlobalContainerStyle.rowCenterStart, { gap: 2 }]}>
              <FontAwesomeIcon
                icon={faUp as IconProp}
                size={STYLES.sizeFaIcon - 4}
                color={success} />
              <TextBase 
                text="3.5%"
                type="text"
                color={success}
                style={[GlobalTypographyStyle.headerSubtitle, { fontSize: 12 }]} />
            </View>
          </View>
        </View>
      </View>

      <View style={[GlobalContainerStyle.rowCenterCenter, { backgroundColor: "#D2D2D2", 
          height: 26, borderRadius: 6, gap: STYLES.sizeGap,
          paddingHorizontal: STYLES.paddingHorizontal - 4,
          borderWidth: 1,
          borderColor: secondaryBorderColor,
        }]}>
          <TextBase 
            text="details"
            color="#5E5E5E"
            style={[GlobalTypographyStyle.titleSubtitle, { fontSize: 10 }]} />
          <FontAwesomeIcon
            icon={faArrowUpRightFromSquare as IconProp}
            size={STYLES.sizeFaIcon - 2}
            color={primaryIconColor} />
        </View>
        </View>



      <View style={[GlobalContainerStyle.rowCenterStart, { gap: STYLES.sizeGap }]}>
      <View style={[GlobalContainerStyle.rowCenterStart, { 
        backgroundColor: "#e9e9e9",
        borderRadius: 6,
        padding: STYLES.paddingVertical,
        width: "49%",
      }, { gap: STYLES.sizeGap }]}>
        <View style={[GlobalContainerStyle.columnCenterCenter, { backgroundColor: "#D2D2D2", 
          height: 32, width: 32, borderRadius: 8,
          borderWidth: 1,
          borderColor: secondaryBorderColor,
        }]}>
          <FontAwesomeIcon
            icon={faUsers as IconProp}
            size={STYLES.sizeFaIcon + 2}
            color={primaryIconColor} />
        </View>
        <View>
        <TextBase 
          text="Seitenbesucher"
          color="#5E5E5E"
          style={[GlobalTypographyStyle.titleSubtitle, { fontSize: 10 }]} />
          <View style={[GlobalContainerStyle.rowCenterStart, { gap: STYLES.sizeGap - 2 }]}>
            <TextBase 
              text="175k"
              type="header"
              color="#1B1B1B"
              style={[GlobalTypographyStyle.headerSubtitle]} />
              <View style={[GlobalContainerStyle.rowCenterStart, { gap: 2 }]}>
            <FontAwesomeIcon
              icon={faUp as IconProp}
              size={STYLES.sizeFaIcon - 4}
              color={success} />
            <TextBase 
              text="80%"
              type="text"
              color={success}
              style={[GlobalTypographyStyle.headerSubtitle, { fontSize: 12 }]} />
              </View>
          </View>
        </View>
      </View>

      <View style={[GlobalContainerStyle.rowCenterStart, { 
        backgroundColor: "#e9e9e9",
        borderRadius: 6,
        padding: STYLES.paddingVertical,
        width: "49%",
      }, { gap: STYLES.sizeGap }]}>
        <View style={[GlobalContainerStyle.columnCenterCenter, { backgroundColor: "#D2D2D2", 
          height: 32, width: 32, borderRadius: 8,
          borderWidth: 1,
          borderColor: secondaryBorderColor,
        }]}>
          <FontAwesomeIcon
            icon={faCalendarCheck as IconProp}
            size={STYLES.sizeFaIcon + 2}
            color={primaryIconColor} />
        </View>
        <View>
        <TextBase 
          text="Neue Termine"
          color="#5E5E5E"
          style={[GlobalTypographyStyle.titleSubtitle, { fontSize: 10 }]} />
          <View style={[GlobalContainerStyle.rowCenterStart, { gap: STYLES.sizeGap - 2 }]}>
            <TextBase 
              text="15"
              type="header"
              color="#1B1B1B"
              style={[GlobalTypographyStyle.headerSubtitle]} />
              <View style={[GlobalContainerStyle.rowCenterStart, { gap: 2 }]}>
            <FontAwesomeIcon
              icon={faDown as IconProp}
              size={STYLES.sizeFaIcon - 4}
              color={error} />
            <TextBase 
              text="23%"
              type="text"
              color={error}
              style={[GlobalTypographyStyle.headerSubtitle, { fontSize: 12 }]} />
              </View>
          </View>
        </View>
      </View>
      </View>

      <View style={[GlobalContainerStyle.rowCenterStart, { gap: STYLES.sizeGap }]}>
      <View style={[GlobalContainerStyle.rowCenterStart, { 
        backgroundColor: "#e9e9e9",
        borderRadius: 6,
        padding: STYLES.paddingVertical,
        width: "49%",
      }, { gap: STYLES.sizeGap }]}>
        <View style={[GlobalContainerStyle.columnCenterCenter, { backgroundColor: "#D2D2D2", 
          height: 32, width: 32, borderRadius: 8,
          borderWidth: 1,
          borderColor: secondaryBorderColor,
        }]}>
          <FontAwesomeIcon
            icon={faStopwatch as IconProp}
            size={STYLES.sizeFaIcon + 2}
            color={primaryIconColor} />
        </View>
        <View>
        <TextBase 
          text="Gebuchte Zeiten"
          color="#5E5E5E"
          style={[GlobalTypographyStyle.titleSubtitle, { fontSize: 10 }]} />
          <View style={[GlobalContainerStyle.rowCenterStart, { gap: STYLES.sizeGap - 2 }]}>
            <TextBase 
              text="16h 30m"
              type="header"
              color="#1B1B1B"
              style={[GlobalTypographyStyle.headerSubtitle]} />
              <View style={[GlobalContainerStyle.rowCenterStart, { gap: 2 }]}>
            <FontAwesomeIcon
              icon={faUp as IconProp}
              size={STYLES.sizeFaIcon - 4}
              color={success} />
            <TextBase 
              text="8%"
              type="text"
              color={success}
              style={[GlobalTypographyStyle.headerSubtitle, { fontSize: 12 }]} />
              </View>
          </View>
        </View>
      </View>

      <View style={[GlobalContainerStyle.rowCenterStart, { 
        backgroundColor: "#e9e9e9",
        borderRadius: 6,
        padding: STYLES.paddingVertical,
        width: "49%",
      }, { gap: STYLES.sizeGap }]}>
        <View style={[GlobalContainerStyle.columnCenterCenter, { backgroundColor: "#D2D2D2", 
          height: 32, width: 32, borderRadius: 8,
          borderWidth: 1,
          borderColor: secondaryBorderColor,
        }]}>
          <FontAwesomeIcon
            icon={faHandHoldingHand as IconProp}
            size={STYLES.sizeFaIcon + 2}
            color={primaryIconColor} />
        </View>
        <View>
        <TextBase 
          text="Neukunden"
          color="#5E5E5E"
          style={[GlobalTypographyStyle.titleSubtitle, { fontSize: 10 }]} />
          <View style={[GlobalContainerStyle.rowCenterStart, { gap: STYLES.sizeGap - 2 }]}>
            <TextBase 
              text="23"
              type="header"
              color="#1B1B1B"
              style={[GlobalTypographyStyle.headerSubtitle]} />
              <View style={[GlobalContainerStyle.rowCenterStart, { gap: 2 }]}>
            <FontAwesomeIcon
              icon={faUp as IconProp}
              size={STYLES.sizeFaIcon - 4}
              color={success} />
            <TextBase 
              text="34%"
              type="text"
              color={success}
              style={[GlobalTypographyStyle.headerSubtitle, { fontSize: 12 }]} />
              </View>
          </View>
        </View>
      </View>
      </View>


      <View style={{
        backgroundColor: "#e9e9e9",
        borderRadius: 6,
        padding: STYLES.paddingVertical,
        width: "100%",
        gap: STYLES.sizeGap,
      }}>
      <View style={[GlobalContainerStyle.rowCenterCenter, { 
        gap: 4,
      }]}>
        <View style={{ backgroundColor: "#d1ddf7", height: 30, width: "20%", borderRadius: 6 }}>

        </View>
        <View style={{ backgroundColor: "#B0C8FE", height: 30, width: "28%", borderRadius: 6 }}>

        </View>
        <View style={{ backgroundColor: "#5A4EF5", height: 30, width: "12%", borderRadius: 6 }}>

        </View>
        <View style={{ backgroundColor: "#372F7D", height: 30, width: "36%", borderRadius: 6 }}>

        </View>
      </View>

      <View style={[GlobalContainerStyle.rowCenterStart, { gap: STYLES.sizeGap }]}>
        <View style={[GlobalContainerStyle.rowCenterStart, { gap: STYLES.sizeGap }]}>
          <TextBase 
            text="Einkommen"
            color="#5E5E5E"
            style={[GlobalTypographyStyle.titleSubtitle, { fontSize: 10 }]} />
          <FontAwesomeIcon
            icon={faCircle as IconProp}
            size={STYLES.sizeFaIcon - 2}
            color={"#d1ddf7"} />
        </View>
        <View style={[GlobalContainerStyle.rowCenterStart, { gap: STYLES.sizeGap }]}>

        </View>
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