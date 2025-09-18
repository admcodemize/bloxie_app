import { faAddressBook, faCalendar, faChartNetwork, faObjectsColumn } from "@fortawesome/duotone-thin-svg-icons";
/**
 * @private
 * @author Marc Stöckli - Codemize GmbH 
 * @readonly
 * @since 0.0.1
 * @version 0.0.1
 * @type */
export type RoutesPrivateHeader = {
  name: string;
  title: string;
  icon: any;
  lazy: boolean;
}

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @description Used for handling generic data inside custom top tab bar component 
 * -> Property "name" is equal to the stack screen name -> ../app/private/tabs/_layout.tsx
 * @readonly
 * @since 0.0.1
 * @version 0.0.1
 * @constant */
export const ROUTES_PRIVATE_HEADER: RoutesPrivateHeader[] = [{
  name: "index",
  title: "i18n.routes.index",
  icon: faObjectsColumn,
  lazy: true,
}, {
  name: "calendar",
  title: "i18n.routes.calendar",
  icon: faCalendar,
  lazy: true,
}, {
  name: "contact",
  title: "i18n.routes.contact",
  icon: faAddressBook,
  lazy: true,
}, {
  name: "team",
  title: "i18n.routes.team",
  icon: faChartNetwork,
  lazy: true,
}];