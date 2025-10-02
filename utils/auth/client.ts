import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import * as SecureStore from "expo-secure-store";

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH
 * @description Returns the auth client used for better-auth instance
 * @since 0.0.2
 * @version 0.0.1 */
export const authClient = createAuthClient({
	baseURL: "https://bloxie.ch",
	disableDefaultFetchPlugins: true,
	plugins: [
		expoClient({
			scheme: "bloxie",
			storage: SecureStore,
      storagePrefix: "bloxie",
		}),
	],
});