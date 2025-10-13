import { registerRootComponent } from 'expo';
import { ExpoRoot } from 'expo-router';

/** 
 * @description Context for the mobile app. Used for a custom entry point (index.js) and not the default one (expo-router/entry)
 * -> Changes have also to be made in the babel.config.js file and the package.json file */
const ctx = require.context('./app/mobile', true, /\.[tj]sx?$/);

// The context already points to ./app/mobile, so paths are already correct
// No need to modify keys since expo-router will resolve them correctly from the mobile directory

/**
 * @private
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.4
 * @version 0.0.1
 * @component */
const App = () => {
  return <ExpoRoot 
    context={ctx} 
    initialLocation="/" />;
}

registerRootComponent(App);
