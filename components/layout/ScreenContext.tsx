import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions
} from "@react-navigation/material-top-tabs";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { withLayoutContext } from "expo-router";
import * as React from "react";
import { Dimensions } from "react-native";

import { KEYS } from "@/constants/Keys";
import { ROUTES_PRIVATE_HEADER } from "@/constants/Routes";

import { useThemeColor } from "@/hooks/theme/useThemeColor";

import RootHeader from "@/components/layout/header/private/RootHeader";

const { Navigator } = createMaterialTopTabNavigator();

/**
 * @private
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.1
 * @version 0.0.1
 * @type */
type LayoutContextProps = {

}

/**
 * @private
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.1
 * @version 0.0.1
 * @description Returns a navigator that automatically injects matched routes and renders nothing when there are no children. */
const LayoutContextBase = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

const DIM = Dimensions.get("window");

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @description Returns the root layout context for the private views which handles the root header and there buttons 
 * @since 0.0.1
 * @version 0.0.1 */
const LayoutContext = ({

}: LayoutContextProps) => {
  /** 
   * @description Used when swiping between the tabs with initial lazy mode
   * -> Without setting the primary background the lazy swipe flashes the default white screen */
  const secondaryBgColor = useThemeColor("secondaryBg");
  
  /**
   * @description Initializes the tab bar buttons which handles the different calendar views such as list/day/week or member 
   * @param {MaterialTopTabBarProps} props - The props for the tab bar */
  const tabBar = React.useCallback((
    props: MaterialTopTabBarProps
  ): React.ReactNode => (
    <RootHeader
      topTabBar={props} />
  ), []);

  /**
   * @description Will be used to handle the visibility of the custom splashscreen which will be shown until
   * all the ressources are loaded */
  const listenerFocus = React.useCallback(() => ({ 
    focus: () => {
      //if (onScreenListenerFocus) onScreenListenerFocus()
    } 
  }), []);

  return (
    <LayoutContextBase
      tabBar={tabBar}
      initialLayout={{ width: DIM.width }}
      screenOptions={{
        swipeEnabled: true,
        animationEnabled: true,
        tabBarContentContainerStyle: { backgroundColor: secondaryBgColor },
        sceneStyle: { backgroundColor: secondaryBgColor },
      }}>
        {ROUTES_PRIVATE_HEADER.map((route) => (
          <LayoutContextBase.Screen 
            key={`${KEYS.screenContext}-${route.name}`}
            name={route.name}
            //redirect={!isSignedIn}
            listeners={listenerFocus}
            options={{
              title: route.title,
              lazy: route.lazy,
            }} />
        ))}
    </LayoutContextBase>
  )
}

export default LayoutContext;