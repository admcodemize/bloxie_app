import { View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import { useThemeColors } from "@/hooks/theme/useThemeColor";
import { STYLES } from "@/constants/Styles";

import GlobalContainerStyle from "@/styles/GlobalContainer";
import DashboardCardIconStyle from "@/styles/components/layout/dashboard/card/DashboardCardIcon";

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.6
 * @version 0.0.1
 * @type */
export type DashboardCardIconProps = {
  icon: IconProp;
}

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.6
 * @version 0.0.1
 * @param {Object} param0
 * @param {IconProp} param0.icon - Fontawesome icon
 * @component */
const DashboardCardIcon = ({
  icon
}: DashboardCardIconProps) => {
  const { secondaryBorderColor, primaryIconColor, dashboardCardIconBg } = useThemeColors();

  return (
    <View 
      style={[GlobalContainerStyle.columnCenterCenter, DashboardCardIconStyle.icon, { 
        backgroundColor: dashboardCardIconBg, 
        borderColor: secondaryBorderColor,
      }]}>
        <FontAwesomeIcon
          icon={icon}
          size={STYLES.sizeFaIcon + 2}
          color={primaryIconColor} />
    </View>
  )
}

export default DashboardCardIcon;