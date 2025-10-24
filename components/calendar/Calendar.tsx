import { STYLES } from "@/constants/Styles";
import { useCalendarStore } from "@/context/CalendarContext";
import { getMonthWide } from "@/helpers/DateTime";
import { useThemeColors } from "@/hooks/theme/useThemeColor";
import GlobalContainerStyle from "@/styles/GlobalContainer";
import GlobalTypographyStyle from "@/styles/GlobalTypography";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCaretDown } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { View } from "react-native";
import TouchableHaptic from "../button/TouchableHaptic";
import TextBase from "../typography/Text";
import CalendarDay from "./day/CalendarDay";
import CalendarWeek from "./week/CalendarWeek";

/** @description Height constants for expand/collapse */
const COLLAPSED_HEIGHT = 56;
const EXPANDED_HEIGHT = 300;
const DRAG_THRESHOLD = 50;

const Calendar = ({
  showDragHandle = false
}: {
  showDragHandle?: boolean;
}) => {
  const { info, primaryBorderColor, tertiaryBgColor, label } = useThemeColors();

  const week = useCalendarStore((state) => state.week);

  return (
    <View style={{ flex: 1 }}>
      <View style={[GlobalContainerStyle.rowCenterBetween, { 
        paddingHorizontal: 14, borderTopWidth: 1, borderTopColor: primaryBorderColor, height: 30,
        borderBottomWidth: 1, borderBottomColor: primaryBorderColor,
        backgroundColor: tertiaryBgColor
      }]}>
        <View style={[GlobalContainerStyle.rowCenterStart, { gap: 2 }]}>
          <TextBase 
            type="subtitle" 
            text={`${getMonthWide({ number: week.month })} ${week.year}`}
            style={[GlobalTypographyStyle.titleSubtitle, { fontSize: 11, color: info }]} />
          <FontAwesomeIcon icon={faCaretDown as IconProp} size={STYLES.sizeFaIcon} color={info} />
        </View>
        <TouchableHaptic style={[{  padding: 4, paddingHorizontal: 6, borderRadius: 4 }, 
          GlobalContainerStyle.rowCenterStart, { gap: 4 }]}>
          <TextBase 
            type="label" 
            text={"Heute"}
            style={[GlobalTypographyStyle.titleSubtitle, { fontSize: 11, color: info }]} />
        </TouchableHaptic>
      </View>
      <View style={[ { 
        borderBottomWidth: 1, 
        borderBottomColor: primaryBorderColor, 
        overflow: "hidden",
        paddingVertical: 4,
        paddingBottom: 2,
        height: 60
      }]}>
          <CalendarWeek />
      </View>
      <CalendarDay now={week.startOfWeek} />
    </View>
  );
};

export default Calendar;
