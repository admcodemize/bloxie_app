import { ROUTES_PRIVATE_HEADER } from '@/constants/Routes';
import { STYLES } from '@/constants/Styles';
import { useThemeColors } from '@/hooks/theme/useThemeColor';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { Dimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TouchableHaptic from '../button/TouchableHaptic';
import Divider from '../container/Divider';
import TextBase from '../typography/Text';
import RootFooter from './footer/private/RootFooter';

const DIM = Dimensions.get("window");

const ScreenTabs = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();

  const { bottom } = useSafeAreaInsets();

  const { primaryBgColor, primaryBorderColor, focusedBg, focusedContent, secondaryBgColor } = useThemeColors();


  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
      gap: 6,
      backgroundColor: primaryBgColor,
      borderWidth: 1,
      borderColor: primaryBorderColor,
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      //width: (DIM.width - (STYLES.paddingHorizontal * 2) - 20),
      height: STYLES.layoutFooterHeight + (bottom),
      paddingBottom: bottom - 10,
      paddingHorizontal: 14
      //borderRadius: 14,
       }}>
    <View style={{ 
      flex: 1,
      gap: 8,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',

    }}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const routes = ROUTES_PRIVATE_HEADER.find(({ name }) => name === route.name);

        const onPress = () => {
          console.log(route.key)
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,

          });

          if (!isFocused) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableHaptic
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: isFocused ? focusedBg : secondaryBgColor,
              borderRadius: 6,
              borderWidth: isFocused ? 0 : 1,
              borderColor: primaryBorderColor,
              width: isFocused ? "auto" : STYLES.sizeTouchable,
              height: STYLES.sizeTouchable,
             }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, paddingHorizontal: 8,

             }}>
            <FontAwesomeIcon
              icon={isFocused ? routes?.iconSolid as IconProp : routes?.iconDuotone as IconProp}
              size={STYLES.sizeFaIcon}
              color={isFocused ? focusedContent : colors.text}
            />
            {isFocused && <TextBase type="text" text={String(routes?.title)} style={{ color: isFocused ? focusedContent : colors.text }} />}
            </View>
          </TouchableHaptic>
        );
      })}
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
      <Divider vertical />
      <RootFooter />
      </View>
    </View>
  );
}

export default ScreenTabs;