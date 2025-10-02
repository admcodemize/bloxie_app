import { Stack } from "expo-router";

import { getTimeZone } from "@/helpers/System";
import DateTimeProvider from "@/context/DateTimeContext";

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.1
 * @version 0.0.1 */
const PrivateLayout = () => { 
  /**
   * @description Handles the authentication state of the user
   * @see {@link @clerk/clerk-expo} */

  return (
    <DateTimeProvider timeZone={getTimeZone()}>
      <Stack
        screenOptions={{ 
          headerShown: false 
        }}>
          {/*<Stack.Protected guard={(isSignedIn && isLoaded) || true}>*/}
          <Stack.Protected guard={true}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="(modal)/timeZone" options={{ presentation: "fullScreenModal" }} />
            <Stack.Screen name="(modal)/create" options={{ presentation: "fullScreenModal" }} />
          </Stack.Protected>
      </Stack>  
    </DateTimeProvider>
  );
}

export default PrivateLayout;