import { expo } from "@better-auth/expo";
import { betterAuth } from "better-auth";

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH
 * @description Returns the auth server used for better-auth instance
 * @since 0.0.2
 * @version 0.0.1 */
export const auth = betterAuth({
  appName: "bloxie",
  appUrl: "https://bloxie.ch",
  baseURL: "https://bloxie.ch",
  database: {

  },
  emailAndPassword: {
    enabled: true,
  },
  plugins: [expo()],
  socialProviders: {
    apple: {
      clientId: process.env.APPLE_CLIENT_ID!,
      clientSecret: process.env.APPLE_CLIENT_SECRET!,
    },
  },
  trustedOrigins: ["bloxie://"],
});