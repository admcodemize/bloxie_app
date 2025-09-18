import { faGlobe } from "@fortawesome/duotone-thin-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import { STYLES } from "@/constants/Styles";

import SearchField from "@/components/container/SearchField";
import StackModalHeader from "@/components/container/StackModalHeader";
import ViewBase from "@/components/container/View";
import GlobalGroupedList, { GlobalGroupedListDataProps } from "@/components/list/GlobalGroupedList";
import TextBase from "@/components/typography/Text";
import { getTimeZones } from "@/helpers/DateTime";
import { useThemeColors } from "@/hooks/theme/useThemeColor";
import GlobalContainerStyle from "@/styles/GlobalContainer";
import GlobalTypographyStyle from "@/styles/GlobalTypography";
import { tzName } from "@date-fns/tz";
import React from "react";
import { View } from "react-native";

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.1
 * @version 0.0.1
 * @component */
const ScreenTimeZone = () => {
  const { info } = useThemeColors();
  const [timeZones, setTimeZones] = React.useState<GlobalGroupedListDataProps[]>(getZones());

  /**
   * @description Handles the live change of the search field and the filtering of the time zones
   * -> The filtering by property "isStickyHeader" is needed so when searching by description the sticky header
   * does not disappear!
   * @function */
  const onLiveChange = React.useCallback((text: string) => setTimeZones(getZones().filter((timeZone) => 
    timeZone.leftTitle?.toLowerCase().includes(text.toLowerCase()) || 
    timeZone.leftDescription?.toLowerCase().includes(text.toLowerCase()) || 
    timeZone.isStickyHeader)), []);

  return (
    <ViewBase>
      <StackModalHeader 
        icon={faGlobe as IconProp}
        title={"i18n.modal.timeZone.title"} />
      <View style={[GlobalContainerStyle.columnStartStart, { 
        padding: STYLES.paddingHorizontal,
        gap: STYLES.sizeGap + 4
      }]}>
        <TextBase 
          text={"Das Wechseln der Zeitzonen ermöglicht dir eine vereinfachte Sicht für das länderübergreifende Terminieren. Die möglichen Zeitzonen werden anhand der aktuellen Lokalisierung angezeigt."}
          style={[GlobalTypographyStyle.labelText, { color: info }]} />
        <SearchField onLiveChange={onLiveChange}/>
      </View>
      <GlobalGroupedList data={timeZones}/>
    </ViewBase>
  )
}

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.1
 * @version 0.0.1
 * @description Returns the time zones with the date and time formatted in the correct grouping list format
 * @function */
const getZones = () => {
  let _timeZones: GlobalGroupedListDataProps[] = [];
  getTimeZones({}).map((timeZone) => {
    /** @description Adds the time zone sticky header items */
    _timeZones.push({
      _id: timeZone.name,
      leftTitle: timeZone.name,
      rightTitle: `${timeZone.timeZones.length.toString()} Zonen`,
      isStickyHeader: true
    });

    /** @description Adds the effective time zone items */
    timeZone.timeZones.map((timeZoneItem) => {
      _timeZones.push({
        _id: timeZoneItem.text,
        leftTitle: timeZoneItem.text,
        leftDescription: tzName(timeZoneItem.text, timeZoneItem.moment.toDate(), "long"),
        rightDescription: timeZoneItem.moment.format("HH:mm:ss"),
      });
    });
  })

  return _timeZones;
}

export default ScreenTimeZone;