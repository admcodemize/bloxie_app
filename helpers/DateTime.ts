import { getWeek, LocaleWidth, Month } from "date-fns";

import { getLocalization } from "@/helpers/System";

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
 * @description Returns the week number
 * @since 0.0.1
 * @version 0.0.1 
 * @param {Object} param0 - Handles the prepartion of the weeks dates
 * @param {Date} param0.now - Initial/Start date */
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
 * @param {LocaleWidth} param0.width - Localized description width */
export const getMonthWide = ({
  number,
  width = "wide"
}: MonthDescriptionProps) => getLocalization().localize.month(number, { 
  width // 0 => January / 1 => February / etc..
});