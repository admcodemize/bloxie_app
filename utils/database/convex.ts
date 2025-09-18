import { ConvexReactClient } from "convex/react";

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @description Returns the convex database client used for connecting the app
 * @since 0.0.1
 * @version 0.0.1 */
export const client = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, { 
  unsavedChangesWarning: false 
});

if (!client) {
  throw new Error(
    'Missing convex cloud url. Please set CONVEX_CLOUD_URL in your .env',
  )
}