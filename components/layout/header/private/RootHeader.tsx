import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import { NavigationRoute, ParamListBase } from "@react-navigation/native";
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, LayoutChangeEvent, ListRenderItemInfo, View } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import { KEYS } from '@/constants/Keys';
import { ROUTES_PRIVATE_HEADER } from '@/constants/Routes';
import { STYLES } from '@/constants/Styles';
import { useThemeColors } from '@/hooks/theme/useThemeColor';

import TouchableHaptic from '@/components/button/TouchableHaptic';
import Divider from '@/components/container/Divider';
import RootHeaderTrailing from '@/components/layout/header/private/trailing/RootHeaderTrailing';
import TextBase from '@/components/typography/Text';

import RootHeaderStyle from '@/styles/components/layout/header/private/RootHeader';
import GlobalButtonStyle from '@/styles/GlobalButton';
import GlobalContainerStyle from '@/styles/GlobalContainer';

/**
 * @private
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.1
 * @version 0.0.1
 * @type */
type RouteProps = {
  route: NavigationRoute<ParamListBase, keyof ParamListBase>;
  isFocused: boolean;
}

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.1
 * @version 0.0.1
 * @type */
type RootHeaderProps = {
  topTabBar: MaterialTopTabBarProps;
}

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.1
 * @version 0.0.2
 * @param {RootHeaderProps} param0
 * @param {TabNavigationState<ParamListBase>} param0.state
 * @param {MaterialTopTabDescriptorMap} param0.descriptions 
 * @param {NavigationHelpers<ParamListBase, MaterialTopTabNavigationEventMap>} param0.navigation 
 * @param {Animated.AnimatedInterpolation<number>} param0.position
 * @param {RootHeaderLeadingProps} param0.leadingCallback
 * @param {RootHeaderTrailingProps} param0.trailingCallback
 * @param {Function} param0.onLayoutList
 * @component */
const RootHeader = ({
  topTabBar
}: RootHeaderProps) => {
  /** @description Used to get the theme based colors */
  const { focusedBg, focusedContent, secondaryBgColor, primaryBgColor, primaryBorderColor, primaryIconColor, secondaryIconColor } = useThemeColors();

  /** @description Used to translate the routes */
  const { t } = useTranslation();

  /** @description Callback function which handles the navigation after user interaction */
  const onPress = React.useCallback(({ route, isFocused }: RouteProps) => {
    const e = topTabBar.navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !e.defaultPrevented) topTabBar.navigation.navigate(route.name, route.params);
  }, [topTabBar.navigation]);

  /**
   * @description Will be used to handle the visibility of the custom splashscreen which will be shown until
   * all the ressources are loaded
   * @param {LayoutChangeEvent} e */
  const layout = React.useCallback((e: LayoutChangeEvent) => {
    //if (onLayoutList) onLayoutList(e);
  }, []);

  /**
   * @description - Handles the key extraction based on rendered item
   * @param {NavigationRoute<ParamListBase, string>} item - Currently rendered item */
  const keyExtractor = React.useCallback((
    item: NavigationRoute<ParamListBase, string>
  ) => item.key, []);

  /**
   * @description - Handles the visibility of the touchable routing object
   * @param {Object} param0
   * @param {NavigationRoute<ParamListBase, string>} param0.route - Routing object 
   * @param {boolean} param0.isFocused - Handles the activity of the routing object */
  const Touchable = React.memo(({ 
    route, 
    isFocused 
  }: RouteProps) => {
    /**
     * @description This is an object containing descriptors for each route with the route keys as its properties.
     * -> A getter which returns the options such as title for the screen if they are specified. */
    const { options } = topTabBar.descriptors[route.key];
    const label = options.title ? t(options.title) : route.name

    /** @description Used to get the route data for further handling during further logic */
    const routeData = ROUTES_PRIVATE_HEADER.find(({name}) => name === route.name);

    return (
      <TouchableHaptic
        onPress={() => onPress({ route, isFocused })}
        style={[GlobalButtonStyle.spacing, GlobalContainerStyle.columnCenterCenter, RootHeaderStyle.router]}>
          <View style={[GlobalContainerStyle.rowCenterCenter, { gap: STYLES.sizeGap - 4 }]}>
            <FontAwesomeIcon
              icon={isFocused ? routeData?.iconSolid! : routeData?.iconDuotone!}
              size={STYLES.sizeFaIcon}
              color={isFocused ? focusedContent : primaryIconColor} />
              {isFocused && <TextBase 
                text={label}
                color={isFocused ? secondaryIconColor : primaryIconColor} />}
          </View>
      </TouchableHaptic>
    )
  });

  /**
   * @description - Handles the render item for displaying the touchable button for the different screens
   * @param {ListRenderItemInfo<NavigationRoute<ParamListBase, string>>} param0
   * @param {NavigationRoute<ParamListBase, string>} param0.item - Currently rendered item
   * @param {number} param0.index - Currently rendered item index */
  const renderItem = ({ 
    item, 
    index 
  }: ListRenderItemInfo<NavigationRoute<ParamListBase, string>>) => {
    /** @description Check if the currently looped through route index is focused */
    const isFocused = topTabBar.state.index === index;
    return (
      <View
        key={`${KEYS.screenContext}-touchable-${item.key}`}
        style={[GlobalContainerStyle.columnCenterCenter, RootHeaderStyle.render, {
          backgroundColor: isFocused ? focusedBg : secondaryBgColor,
          borderColor: isFocused ? focusedBg : primaryBorderColor
        }]}>
          <Touchable 
            route={item} 
            isFocused={isFocused} />
      </View>
    );
  };

  return (
    <View style={[GlobalContainerStyle.columnStartCenter, {
      borderBottomWidth: 0.5,
      borderBottomColor: primaryBorderColor,
      backgroundColor: primaryBgColor
    }]}>
      <View style={[GlobalContainerStyle.rowCenterBetween, RootHeaderStyle.view]}>
        <FlatList
          horizontal
          removeClippedSubviews={true}
          disableVirtualization={true}
          initialNumToRender={1}
          data={topTabBar.state.routes}
          onLayout={layout}
          contentContainerStyle={{ gap: STYLES.sizeGap - 2 }}
          keyExtractor={keyExtractor}
          renderItem={renderItem} />
        <View style={[GlobalContainerStyle.rowCenterCenter, { gap: STYLES.sizeGap }]}>
          <Divider vertical />
          <RootHeaderTrailing onPressNotification={() => {}} onPressSearch={() => {}} onPressSettings={() => {}} />
        </View> 
      </View>
      {/* <Calendar /> */}
    </View>
  );
}

export default RootHeader;