import { tzName } from "@date-fns/tz";
import { router } from "expo-router";
import { t } from "i18next";
import React from "react";
import { View } from "react-native";

import { faGlobe } from "@fortawesome/duotone-thin-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import GroupedListTimeZones, { GroupedListTimeZonesDataProps } from "@/components/lists/grouped/GroupedListTimeZones";
import { STYLES } from "@/constants/Styles";
import { useDateTimeContextStore } from "@/context/DateTimeContext";
import { getTimeZones, TimeZoneGroupProps } from "@/helpers/DateTime";
import { useThemeColors } from "@/hooks/theme/useThemeColor";

import SearchField from "@/components/container/SearchField";
import StackModalHeader from "@/components/container/StackModalHeader";
import ViewBase from "@/components/container/View";
import TextBase from "@/components/typography/Text";

import GlobalContainerStyle from "@/styles/GlobalContainer";
import GlobalTypographyStyle from "@/styles/GlobalTypography";

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.1
 * @version 0.0.1
 * @component */
const ScreenTimeZone = () => {
  const { info, primaryBorderColor } = useThemeColors();

  const zones = React.useMemo(() => getZones({}), []);
  const [timeZones, setTimeZones] = React.useState<GroupedListTimeZonesDataProps[]>(getZones({}));

  /**
   * @description Handles the setting of the time zone based on the newly selected one
   * @see {@link @/context/DateTimeContext} */
  const setTimeZone = useDateTimeContextStore((state) => state.setTimeZone);
  const timeZone = useDateTimeContextStore((state) => state.timeZone);

  /**
   * @description Handles the includes check of the text and the search for returning the exact match
   * @function */
  const includes = (text: string, search: string) => text.toLowerCase().includes(search.toLowerCase());

  /**
   * @description Handles the live change of the search field and the filtering of the time zones
   * -> The filtering by property "isStickyHeader" is needed so when searching by description the sticky header
   * does not disappear!
   * @function */
  const onLiveChange = React.useCallback((text: string) => {
    const _zones = getTimeZones({ basedOnLocalization: false });
    const _filteredZones = _zones.filter((item) => item.timeZones.some((zone) => includes(zone.text, text)));
    
    const filteredZones: TimeZoneGroupProps[] = [];
    if (_filteredZones.length > 0) {
      _filteredZones.forEach((zone) => {
        filteredZones.push({ 
          name: zone.name,
          timeZones: zone.timeZones.filter((zone) => includes(zone.text, text))
        });
      });
    }

    console.log("getZones", getZones({ timeZones: filteredZones }));

    /** @description Sets the time zones based on the filtered zones or returning all the time zones if the search is empty*/
    text.length > 0 ? setTimeZones(getZones({ timeZones: filteredZones })) : setTimeZones(zones);
}, []);

  return (
    <ViewBase>
      <StackModalHeader 
        icon={faGlobe as IconProp}
        title={"i18n.modal.timeZone.title"} />
      <View style={[GlobalContainerStyle.columnStartStart, { 
        padding: STYLES.paddingHorizontal,
        gap: STYLES.sizeGap + 4,
        borderBottomWidth: 1,
        borderColor: primaryBorderColor
      }]}>
        <TextBase 
          text={"i18n.modal.timeZone.description"}
          style={[GlobalTypographyStyle.labelText, { color: info }]} />
        <SearchField 
          placeholder=""
          stickyPlayholder={"i18n.modal.timeZone.stickyHeaderPlaceholder"} 
          onLiveChange={onLiveChange} />
      </View>
      <GroupedListTimeZones
        data={timeZones}
        selectedKey={timeZone}
        onPress={(item) => {
          /** @description Sets the time zone based on the newly selected one */
          setTimeZone(item._id);
          router.back()
        }} />
    </ViewBase>
  )
}

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.2
 * @version 0.0.1
 * @type */
type TimeZoneProps = {
  timeZones?: TimeZoneGroupProps[];
}

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.1
 * @version 0.0.2
 * @description Returns the time zones with the date and time formatted in the correct grouping list format
 * @param {TimeZoneProps} param0
 * @param {boolean} param0.basedOnLocalization - Whether to return the time zones based on localization
 * -> Example: Current localization is Europe/Zurich and basedOnLocalization is true, returns all the time zones in the Europe zone
 * @function */
const getZones = ({
  timeZones = getTimeZones({ basedOnLocalization: false }),
}: TimeZoneProps) => {
  let _timeZones: GroupedListTimeZonesDataProps[] = [];
  timeZones.map((timeZone) => {
    /** @description Adds the time zone sticky header items */
    _timeZones.push({
      _id: timeZone.name,
      leading: { title: timeZone.name },
      trailing: { description: `${timeZone.timeZones.length.toString()} ${t("i18n.modal.timeZone.stickyHeader")}` },
      isStickyHeader: true
    });

    /** @description Adds the effective time zone items */
    timeZone.timeZones.map((timeZoneItem) => {
      _timeZones.push({
        _id: timeZoneItem.text,
        leading: { title: timeZoneItem.text, description: tzName(timeZoneItem.text, timeZoneItem.moment.toDate(), "long") },
        //trailing: { description: formatTime({ now: timeZoneItem.moment.toDate() }) },
        trailing: { description: timeZoneItem.moment.format("HH:mm:ss") },
        isStickyHeader: false
      });
    });
  })

  return _timeZones;
}

export default ScreenTimeZone;