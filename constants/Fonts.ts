/**
 * @private
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.1
 * @version 0.0.1
 * @type */
type FontProps = {
  label: string|number;
  text: string|number;
  subtitle: string|number; 
  title: string|number;
  header: string|number;
}

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.1
 * @version 0.0.1
 * @constant */
export const SIZES = <FontProps>{
  label: 10,
  text: 11,
  subtitle: 11,
  title: 13,
  header: 16
}

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.1
 * @version 0.0.1
 * @constant */
export const FAMILIY = <FontProps>{
  label: "Inter_500Medium",
  text: "Inter_500Medium",
  subtitle: "Inter_500Medium",
  title: "Inter_300Light",
  header: "Inter_300Light"
}