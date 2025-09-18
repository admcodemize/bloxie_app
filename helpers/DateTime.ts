import { getWeek, LocaleWidth, Month } from "date-fns";
import * as Moment from "moment-timezone";

import { VALID_TIMEZONES } from "@/constants/System";
import { getLocalization, getTimeZone } from "@/helpers/System";

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.1
 * @version 0.0.1
 * @type */
export type NowDateProps = {
  now?: Date;
}

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.1
 * @version 0.0.1
 * @type */
export type MonthDescriptionProps = {
  number: Month;
  width?: LocaleWidth
}

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.1
 * @version 0.0.1
 * @type */
export type TimeZoneProps = {
  basedOnLocalization?: boolean;
}

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.1
 * @version 0.0.1
 * @type */
export type TimeZoneGroupProps = {
  name: string;
  timeZones: TimeZoneItemsProps[];
};

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.1
 * @version 0.0.1
 * @type */
export type TimeZoneItemsProps = {
  text: string;
  moment: Moment.Moment;
};

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @description Returns the week number
 * @since 0.0.1
 * @version 0.0.1 
 * @param {Object} param0 - Handles the prepartion of the weeks dates
 * @param {Date} param0.now - Initial/Start date
 * @function */
 export const getWeekNumber = ({ 
  now = new Date() 
}: NowDateProps): number => getWeek(now, {
  locale: getLocalization(),
  weekStartsOn: getLocalization().options?.weekStartsOn || 0
});

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @description Returns the description of the month
 * @since 0.0.5
 * @version 0.0.7
 * @param {Object} param0
 * @param {Month} param0.number - Internal number of the month
 * @param {LocaleWidth} param0.width - Localized description width 
 * @function */
export const getMonthWide = ({
  number,
  width = "wide"
}: MonthDescriptionProps) => getLocalization().localize.month(number, { 
  width // 0 => January / 1 => February / etc..
});

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @description Returns the time zones with the date and time formatted
 * @since 0.0.1
 * @version 0.0.1
 * @param {TimeZoneProps} param0
 * @param {boolean} param0.basedOnLocalization - Whether to return the time zones based on localization
 * -> Example: Europe/Zurich returns all the time zones in the Europe zone
 * @function */
export const getTimeZones = ({
  basedOnLocalization = true
}: TimeZoneProps): TimeZoneGroupProps[] => {
  const timeZoneGroups: TimeZoneGroupProps[] = [];
  Moment.tz.names()
  .filter((zone) => VALID_TIMEZONES.some((validZone) => zone.includes(validZone)) && 
    (basedOnLocalization && zone.includes(getTimeZone().split("/")[0])))
  .sort((a, b) => a.localeCompare(b))
  .forEach(zone => {
    /**
     * @description We need to group the time zones by the first part of the zone
     * Example: [America: [America/New_York, America/Los_Angeles, America/Chicago, America/Denver, America/Phoenix]] */
    let timeZoneGroup = timeZoneGroups.find((timeZone) => timeZone.name === zone.split("/")[0]);
    if (!timeZoneGroup) {
      timeZoneGroup = {
        name: zone.split("/")[0],
        timeZones: []
      };
      timeZoneGroups.push(timeZoneGroup);
    }

    timeZoneGroup.timeZones.push({
      text: zone,
      moment: Moment.tz(zone)
    });
  })

  return timeZoneGroups;
}