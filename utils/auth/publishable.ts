/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @description Returns the publishable key for the clerk authentication service
 * @since 0.0.1
 * @version 0.0.1 */
export const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!
if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
  )
}