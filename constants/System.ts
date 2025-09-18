import { PlatformProps } from "@/helpers/System";

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @readonly
 * @since 0.0.1
 * @version 0.0.1
 * @constant */
export const PLATFORM = <PlatformProps>{
  iOS: "ios",
  android: "android",
  web: "web"
}

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @readonly
 * @since 0.0.1
 * @version 0.0.1
 * @constant */
export const VALID_TIMEZONES = <string[]>[
  "America",
  "Europe",
  "Asia",
  "Africa",
  "Australia",
  "Antarctica",
  "Pacific", 
  "Indian", 
  "Atlantic"
];