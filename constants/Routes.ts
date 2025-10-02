import {
  faAddressBook as faAddressBookDuotone,
  faCalendar as faCalendarDuotone,
  faChartNetwork as faChartNetworkDuotone,
  faObjectsColumn as faObjectsColumnDuotone
} from "@fortawesome/duotone-thin-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faAddressBook as faAddressBookSolid,
  faCalendar as faCalendarSolid,
  faChartNetwork as faChartNetworkSolid,
  faObjectsColumn as faObjectsColumnSolid
} from "@fortawesome/pro-thin-svg-icons";

/**
 * @private
 * @author Marc Stöckli - Codemize GmbH 
 * @readonly
 * @since 0.0.1
 * @version 0.0.2
 * @type */
export type RoutesPrivateHeader = {
  name: string;
  title: string;
  iconDuotone: IconProp;
  iconSolid: IconProp;
  lazy: boolean;
}

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @description Used for handling generic data inside custom top tab bar component 
 * -> Property "name" is equal to the stack screen name -> ../app/private/tabs/_layout.tsx
 * @readonly
 * @since 0.0.1
 * @version 0.0.2
 * @constant */
export const ROUTES_PRIVATE_HEADER: RoutesPrivateHeader[] = [{
  name: "index",
  title: "i18n.routes.index",
  iconDuotone: faObjectsColumnDuotone as IconProp,
  iconSolid: faObjectsColumnSolid as IconProp,
  lazy: true,
}, {
  name: "calendar",
  title: "i18n.routes.calendar",
  iconDuotone: faCalendarDuotone as IconProp,
  iconSolid: faCalendarSolid as IconProp,
  lazy: true,
}, {
  name: "contact",
  title: "i18n.routes.contact",
  iconDuotone: faAddressBookDuotone as IconProp,
  iconSolid: faAddressBookSolid as IconProp,
  lazy: true,
}, {
  name: "team",
  title: "i18n.routes.team",
  iconDuotone: faChartNetworkDuotone as IconProp,
  iconSolid: faChartNetworkSolid as IconProp,
  lazy: true,
}];