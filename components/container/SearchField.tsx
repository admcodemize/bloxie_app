import { STYLES } from "@/constants/Styles";
import { useThemeColors } from "@/hooks/theme/useThemeColor";
import { faTelescope, faXmark } from "@fortawesome/duotone-thin-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { TextInput, View } from "react-native";

import GlobalContainerStyle from "@/styles/GlobalContainer";
import GlobalTypographyStyle from "@/styles/GlobalTypography";

import SearchFieldStyle from "@/styles/components/container/SearchField";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import React from "react";
import { useTranslation } from "react-i18next";
import TouchableHaptic from "../button/TouchableHaptic";
import Divider from "./Divider";

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.1
 * @version 0.0.1
 * @type */
type SearchFieldProps = {
  value?: string;
  placeholder?: string;
  onLiveChange?: (value: string) => void;
}

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.1
 * @version 0.0.1
 * @param {SearchFieldProps} param0
 * @param {string} param0.value - The initial search value
 * @param {string} param0.placeholder - The placeholder text
 * @param {Function} param0.onChange - The function to call when the search value changes
 * @component */
const SearchField = ({
  value = "",
  placeholder = "i18n.searchField.placeholder",
  onLiveChange = () => {}
}: SearchFieldProps) => {
  const { t } = useTranslation();
  const { primaryIconColor, primaryBorderColor, info, text, secondaryBgColor } = useThemeColors();

  /** @description Handles the initial search value which can be passed as a prop */
  const [searchValue, setSearchValue] = React.useState(value);

  React.useEffect(() => {
    onLiveChange(searchValue);
  }, [searchValue]);

  /**
   * @description Handles the on press event for clearing the search value
   * @function */
  const onPressClear = React.useCallback(() => setSearchValue(""), []);

  return (
    <View style={[GlobalContainerStyle.rowCenterBetween, SearchFieldStyle.view, { 
      borderColor: primaryBorderColor, 
      backgroundColor: secondaryBgColor
    }]}>
      <View style={[GlobalContainerStyle.rowCenterStart, { gap: STYLES.sizeGap }]}>
        <FontAwesomeIcon 
          icon={faTelescope as IconProp} 
          size={STYLES.sizeFaIcon} 
          color={primaryIconColor} />
        <Divider vertical />
        <TextInput 
          placeholder={t(placeholder)} 
          placeholderTextColor={info}
          value={searchValue}
          onChangeText={setSearchValue}
          style={[GlobalTypographyStyle.standardText, { 
            flex: 1,
            color: text
          }]}  />
        <Divider vertical />
        <TouchableHaptic
          onPress={onPressClear}>
            <FontAwesomeIcon 
              icon={faXmark as IconProp} 
              size={STYLES.sizeFaIcon} 
              color={primaryIconColor} />
        </TouchableHaptic>
      </View>
    </View>
  );
};

export default SearchField;