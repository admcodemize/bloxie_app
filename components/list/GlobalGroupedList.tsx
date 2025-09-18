import { useThemeColors } from "@/hooks/theme/useThemeColor";
import React from "react";
import { FlatList, View } from "react-native";

import { STYLES } from "@/constants/Styles";
import GlobalContainerStyle from "@/styles/GlobalContainer";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import TextBase from "../typography/Text";

/**
 * @private
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.1
 * @version 0.0.1
 * @type */
type GlobalGroupedListProps = {
  data: GlobalGroupedListDataProps[];
}

export type GlobalGroupedListDataProps = {
  _id: string;
  leftTitle?: string;
  leftDescription?: string;
  rightTitle?: string;
  rightDescription?: string;
  icon?: IconProp;
  isStickyHeader?: boolean;
}

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.1
 * @version 0.0.1
 * @param {GlobalSimpleListProps} param0
 * @component */
const GlobalGroupedList = ({
  data
}: GlobalGroupedListProps) => {
  const { info, primaryBorderColor, secondaryBgColor } = useThemeColors();
  const [stickyHeaderIndices, setStickyHeaderIndices] = React.useState<number[]>([]);

  /**
   * @description Builds the sticky header indices based on the data which are imported from the parent component
   * @function */
  React.useEffect(() => setStickyHeaderIndices([0, ...data.map((event, idx) => event.isStickyHeader ? idx : 0).filter(Number)]), [data]);

  /**
   * @description Used to extract a unique key for a given item at the specified index
   * @function */
  const keyExtractor = React.useCallback((item: GlobalGroupedListDataProps) => item._id, []);

  const renderItem = React.useCallback(({ item }: { item: GlobalGroupedListDataProps }) => 
    <View>
      {item.isStickyHeader ? (
        <View style={{
          backgroundColor: secondaryBgColor,
          borderColor: primaryBorderColor,
          borderBottomWidth: 1,
          borderTopWidth: 1,
          paddingVertical: 8,
          paddingHorizontal: STYLES.paddingHorizontal
        }}>
          <View style={[GlobalContainerStyle.rowStartBetween, { gap: 4 }]}>
            {item.leftTitle && <TextBase 
              text={item.leftTitle}
              i18nTranslation={false} />}
            {item.rightTitle && <TextBase 
              type="label"
              text={item.rightTitle}
              i18nTranslation={false} />}
          </View>
        </View>
      ) : (
        <View style={[GlobalContainerStyle.rowCenterBetween, {
          paddingVertical: 8,
          paddingHorizontal: STYLES.paddingHorizontal
        }]}>
          <View style={[GlobalContainerStyle.columnStartCenter, { gap: 4 }]}>
            {item.leftTitle && <TextBase 
              text={item.leftTitle}
              i18nTranslation={false} />}
            {item.leftDescription && <TextBase 
              type="label"
              text={item.leftDescription}
              i18nTranslation={false}
              style={{ color: info }} />}
          </View>
          <View style={[GlobalContainerStyle.columnStartCenter, { gap: 4, alignItems: "flex-end" }]}>
            {item.rightTitle && <TextBase 
              text={item.rightTitle}
              i18nTranslation={false} />}
            {item.rightDescription && <TextBase 
              type="label"
              text={item.rightDescription}
              i18nTranslation={false}
              style={{ color: info }} />}
          </View>
        </View>
      )}
    </View>, []);

  return (
    <FlatList
      snapToInterval={10}
      snapToAlignment={"start"}
      decelerationRate={"fast"}
      showsHorizontalScrollIndicator={false}
      stickyHeaderIndices={stickyHeaderIndices}
      showsVerticalScrollIndicator={false}
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem} />
  )
}

export default GlobalGroupedList;