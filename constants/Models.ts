import {
  faCalendarDays as faCalendarDaysDuotone,
  faCalendar as faCalendarDuotone,
  faCalendarWeek as faCalendarWeekDuotone
} from "@fortawesome/duotone-thin-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faCalendarDays as faCalendarDaysSolid,
  faCalendar as faCalendarSolid,
  faCalendarWeek as faCalendarWeekSolid
} from "@fortawesome/pro-solid-svg-icons";

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @readonly
 * @since 0.0.5
 * @version 0.0.1
 * @type */
export type DashboardPeriodProps = {
  key: string|number;
  title: string;
  iconDuotone: IconProp;
  iconSolid: IconProp;
}

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @description Used for handling generic data inside dashboard component 
 * @readonly
 * @since 0.0.5
 * @version 0.0.1
 * @constant */
export const DROPDOWN_DASHBOARD_PERIOD: DashboardPeriodProps[] = [{
  key: "last7Days",
  title: "i18n.dropdown.dashboard.calendar.last7Days",
  iconDuotone: faCalendarWeekDuotone as IconProp,
  iconSolid: faCalendarWeekSolid as IconProp,
}, {
  key: "last30Days",
  title: "i18n.dropdown.dashboard.calendar.last30Days",
  iconDuotone: faCalendarDaysDuotone as IconProp,
  iconSolid: faCalendarDaysSolid as IconProp,
}, {
  key: "allTime",
  title: "i18n.dropdown.dashboard.calendar.allTime",
  iconDuotone: faCalendarDuotone as IconProp,
  iconSolid: faCalendarSolid as IconProp,
}];