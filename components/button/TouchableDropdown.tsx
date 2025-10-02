import { PropsWithChildren } from "react";
import { ScrollView, View, ViewStyle } from "react-native";


import { DropdownContextPositionProps, DropdownContextProps, useDropdownContextStore } from "@/context/DropdownContext";
import { useThemeColors } from "@/hooks/theme/useThemeColor";

import { measureInWindowLeft } from "@/helpers/System";
import TouchableDropdownStyle from "@/styles/components/button/TouchableDropdown";

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.2
 * @version 0.0.1
 * @type */
export type TouchableDropdownProps = PropsWithChildren & ViewStyle & {
  isRightFloat?: boolean;
  title?: string;
  style?: ViewStyle|ViewStyle[];
  gapBetweenItems?: number;
}

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.2
 * @version 0.0.1
 * @type */
export type OpenDropdownProps = PropsWithChildren & {
  refTouchable: React.RefObject<View|null>;
  refContainer: React.RefObject<View>;
  containerWidth?: number;
  open: (children: React.ReactNode, position: DropdownContextPositionProps|null) => void;
}

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.2
 * @version 0.0.1
 * @param {OpenDropdownProps} param0 
 * @param {React.RefObject<View>} param0.refTouchable - The touchable ref
 * @param {React.RefObject<View>} param0.refContainer - The container ref which will be used to measure the layout as reference
 * @param {number} param0.containerWidth - The dropdown width
 * @param {Function} param0.open - The open function
 * @param {React.ReactNode} param0.children - The children (content of the dropdown)
 * @function */
export const open = ({
  refTouchable,
  refContainer,
  containerWidth = 175,
  open,
  children,
}: OpenDropdownProps) => {
  refTouchable?.current?.measureLayout(refContainer?.current, (x, y, width, height) => {
    open(children, { 
      top: y + height + 6,
      left: measureInWindowLeft(containerWidth, { y, x, width, height }) 
    })
  });
}

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @description Returns a positioned dropdown based on parent component
 * @since 0.0.2
 * @version 0.0.1
 * @param {Object} param0 
 * @param {boolean} param0.isRightFloat - Check's if dropdown is right floated
 * @param {string} param0.title - Header title
 * @param {ViewStyle} param0.style - Custom dropdown style */
const TouchableDropdown = ({ 
  title,
  style,
  gapBetweenItems = 4,
  children,
  ...props
}: TouchableDropdownProps) => {  
  const { primaryBorderColor, secondaryBgColor } = useThemeColors();

  /**
   * @description Handles the visibility of the overall dropdown component
   * @see {@link context/DropdownContext} */
  const close = useDropdownContextStore((state: DropdownContextProps) => state.close);

  return (
    <View 
      style={[TouchableDropdownStyle.view, {
        backgroundColor: secondaryBgColor,
        borderColor: primaryBorderColor
      }, style]}
      {...props}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[{ 
            gap: gapBetweenItems 
          }]}>
            {children}
        </ScrollView>
    </View>
  )
}

export default TouchableDropdown;