import { addDays, eachDayOfInterval, endOfWeek, format, getDate, getDay, getMonth, getWeek, LocaleWidth, Month, startOfWeek } from "date-fns";
import * as Moment from "moment-timezone";

import { STYLES } from "@/constants/Styles";
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
 * @version 0.0.2
 * @type */
export type TimeZoneGroupProps = {
  name: string;
  timeZones: TimeZoneItemsProps[];
};

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.1
 * @version 0.0.2
 * @type */
export type TimeZoneItemsProps = {
  text: string;
  moment: Moment.Moment;
};

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.7
 * @version 0.0.1
 * @type */
export type DatesInWeekProps = {
  number: number;
  now: Date;
}

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.7
 * @version 0.0.1
 * @type */
export type DatesInWeekInfoProps = {
  number: number;
  now: Date;
  day: number;
  shortText: string;
  longText: string;
}

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.7
 * @version 0.0.1
 * @type */
export type WeeksProps = {
  now?: Date;
  weeksInPast?: number;
  weeksInFuture?: number;
}

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.7
 * @version 0.0.1
 * @type */
export type WeeksObjProps = {
  now?: Date;
  days?: number;
}

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.7
 * @version 0.0.1
 * @type */
export type WeeksObjInfoProps = {
  datesInWeek: DatesInWeekInfoProps[];
  startOfWeek: Date;
  endOfWeek: Date;
  week: number;
  month: number;
}

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.7
 * @version 0.0.1
 * @type */
export type HoursProps = {
  idx: number;
  now: Date;
  hour: string;
}

export const MINUTES_IN_DAY = (STYLES.calendarHourHeight * 24);
export const MINUTES_IN_DAY_WITH_BORDER = (STYLES.calendarHourHeight * 24) + (STYLES.calendarHourBorderHeight * 24);
export const PIXELS_PER_MINUTE = STYLES.calendarHourHeight / 60;
export const PIXELS_PER_MINUTE_WITH_BORDER = (STYLES.calendarHourHeight + STYLES.calendarHourBorderHeight) / 60;
export const BORDER_HEIGHT = STYLES.calendarHourBorderHeight;

export const TOTAL_MINUTES = 1440;
export const BORDERS_PER_DAY = 23;
export const GRID_MINUTES = 15;
export const TOTAL_BORDER_HEIGHT = BORDER_HEIGHT * BORDERS_PER_DAY;
export const MAX_TOP = TOTAL_MINUTES * PIXELS_PER_MINUTE + TOTAL_BORDER_HEIGHT;

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
 * @description Returns the locale formatted time
 * @since 0.0.2
 * @version 0.0.1
 * @param {Date} now - Initial/Start date */
 export const getLocaleTime = ({
  now = new Date()
}: NowDateProps) => format(now, "pp", { locale: getLocalization() });

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @description Returns the time zones with the date and time formatted
 * @since 0.0.1
 * @version 0.0.2
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
    ((basedOnLocalization) ? zone.includes(getTimeZone().split("/")[0]) : true))
  .sort((a, b) => a.localeCompare(b))
  .forEach(zone => {
    /**
     * @description We need to group the time zones by the first part of the zone
     * Example: [America: [America/New_York, America/Los_Angeles, America/Chicago, America/Denver, America/Phoenix]] */
    let timeZoneGroup = timeZoneGroups.find((timeZone) => timeZone.name === zone.split("/")[0]);
    if (!timeZoneGroup) {
      timeZoneGroup = { name: zone.split("/")[0], timeZones: [] };
      timeZoneGroups.push(timeZoneGroup);
    }

    timeZoneGroup.timeZones.push({ text: zone, moment: Moment.tz(zone) });
  });
  
  return timeZoneGroups;
}

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @description Returns the current/previous and future weeks based on a day counter
 * @since 0.0.7
 * @version 0.0.1
 * @param {WeeksProps} param0 - Handles the prepartion of the week properties included current/previous and future week(s)
 * @param {Date} param0.now - Initial/Start date
 * @param {number} param0.weeksInPast - Weeks in the past (Determine previous week(s) datess)
 * @param {number} param0.weeksInFuture - Weeks in the future (Determine next week(s) dates) */
export const getWeeks = ({
  now = new Date(),
  weeksInPast = 2,
  weeksInFuture = 2
}: WeeksProps): WeeksObjInfoProps[] => {
  const weeks: WeeksObjInfoProps[] = [];

  for (let idx = weeksInPast; idx > 0; idx--) weeks.push(getWeeksObj({ now, days: -((idx) * 7) }));
  weeks.push(getWeeksObj({ now }));
  for (let idx = 1; idx <= weeksInFuture; idx++) weeks.push(getWeeksObj({ now, days: +((idx) * 7) }));

  return weeks;
};

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @description Returns an object with dates and more in defined weeks
 * @since 0.0.7
 * @version 0.0.1
 * @param {WeeksObjProps} param0 - Handles the prepartion of the weeks dates
 * @param {Date} param0.now - Initial/Start date
 * @param {number} param0.days - Days added to the imported date parameter "now" */
export const getWeeksObj = ({
  now = new Date(),
  days = 0
}: WeeksObjProps): WeeksObjInfoProps => ({
  datesInWeek: getDatesInWeek({ now: addDays(now, days), number: 0 }),
  startOfWeek: startOfWeek(addDays(now, days), { locale: getLocalization() }),
  endOfWeek: endOfWeek(addDays(now, days), { locale: getLocalization() }),
  week: getWeekNumber({ now: addDays(now, days) }),
  month: getMonth(addDays(now, days))
});

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @description Returns the dates in a week based on a date
 * @since 0.0.7
 * @version 0.0.1
 * @param {DatesInWeekProps} param0 - Handles the prepartion of the weeks dates
 * @param {Date} param0.now - Initial/Start date
 * @param {number} param0.number - Number of the week */
 export const getDatesInWeek = ({
  now = new Date(),
  number = getDate(now)
}: DatesInWeekProps): DatesInWeekInfoProps[] => {
  const datesInWeek: DatesInWeekInfoProps[] = [];

  eachDayOfInterval({ 
    start: startOfWeek(now, { locale: getLocalization() }), 
    end: endOfWeek(now, { locale: getLocalization() })
  }).forEach(date => datesInWeek.push({ 
    number: getDate(date),
    now: date,
    day: getDay(date),
    shortText: format(date, "EEE", { locale: getLocalization() }),
    longText: format(date, "EEEE", { locale: getLocalization() })
   }));

   return datesInWeek;
};

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @description Returns an array of object for each hour of a day
 * @since 0.0.7
 * @version 0.0.1
 * @param {number} interval - Interval of hours*/
export const getHours = (
  interval: number = 24
): HoursProps[] => {
  const hours: HoursProps[] = [];
  const now: Date = new Date();

  Array.from({ length: interval }).forEach((_, idx) => {
    hours.push({
      idx,
      now,
      hour: format(new Date(now.getFullYear(), now.getMonth(), now.getDate(), idx, 0, 0), "p", { locale: getLocalization() }),
    });
  });

  return hours;
};