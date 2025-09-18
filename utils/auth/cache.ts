import * as SecureStore from "expo-secure-store";
import { TokenCache } from "@clerk/clerk-expo";

import { fetchTyped } from "@/helpers/Async";
import { isWeb } from "@/helpers/System";

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @description Returns the stored token cache (active user session) by clerk
 * @since 0.0.1
 * @version 0.0.1 */
const createTokenCache = (): TokenCache => {
  return {
    /**
     * @public
     * @author Marc Stöckli - Codemize GmbH 
     * @description Returns an existing token if found
     * @since 0.0.1
     * @version 0.0.1 */
    getToken: async (key: string) => {
      const [err, item] = await fetchTyped(SecureStore.getItemAsync(key));
      if (err) {
        await fetchTyped(SecureStore.deleteItemAsync(key));
        return null;
      }

      return item;
    },
    /**
     * @public
     * @author Marc Stöckli - Codemize GmbH 
     * @description Creates a new token
     * @since 0.0.1
     * @version 0.0.1 */
    saveToken: (key: string, token: string) => SecureStore.setItemAsync(key, token),
  }
}

/**
 * @public
 * @description SecureStore is not supported on the web
 * @since 0.0.1
 * @version 0.0.1  */
export const tokenCache = isWeb() ? undefined : createTokenCache()