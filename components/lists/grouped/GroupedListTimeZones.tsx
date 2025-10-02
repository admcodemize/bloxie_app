
import TouchableHaptic from "@/components/button/TouchableHaptic";
import ListContentTitleDescription from "@/components/lists/ListContentTitleDescription";
import TextBase from "@/components/typography/Text";
import { useThemeColors } from "@/hooks/theme/useThemeColor";
import GroupedListTimeZonesStyle from "@/styles/components/lists/grouped/GroupedListTimeZones";
import GlobalContainerStyle from "@/styles/GlobalContainer";
import { GlobaleTypographyTitleDescriptionProps } from "@/types/GlobalTypography";
import type { FlashListRef } from "@shopify/flash-list";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import React from "react";
import { GestureResponderEvent, View } from "react-native";

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.2
 * @version 0.0.1
 * @type */
export type GroupedListTimeZonesProps = {
  data: GroupedListTimeZonesDataProps[];
  selectedKey?: string;
  onPress: (item: GroupedListTimeZonesDataProps) => void;
}

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.2
 * @version 0.0.1
 * @type */
export type GroupedListTimeZonesDataProps = {
  _id: string;
  isStickyHeader?: boolean;
  leading?: GlobaleTypographyTitleDescriptionProps;
  trailing?: GlobaleTypographyTitleDescriptionProps;
}

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.2
 * @version 0.0.1
 * @description Grouped list for time zones
 * @param {GroupedListTimeZonesProps} param0
 * @param {GroupedListTimeZonesDataProps[]} param0.data - Data to render
 * @param {string} param0.selectedKey - Selected key
 * @param {Function} param0.onPress - On press function for handling the selected key in the parent component
 * @function */
const GroupedListTimeZones = ({
  data,
  selectedKey,
  onPress = () => {}
}: GroupedListTimeZonesProps) => {
  const { primaryBorderColor, secondaryBgColor, info, success } = useThemeColors();

  const listRef = React.useRef<FlashListRef<GroupedListTimeZonesDataProps>>(null);
  const [items, setItems] = React.useState<GroupedListTimeZonesDataProps[]>(data);

  /**
   * @description Builds sticky header indices from the currently rendered items only
   * @function */
  const stickyIndices = React.useMemo(() => (
    items.reduce<number[]>((acc, item, idx) => {
      if (item.isStickyHeader) acc.push(idx);
      return acc;
    }, [])
  ), [items]);

  React.useEffect(() => setItems(data), [data]);
  React.useEffect(() => {
    /** @description Reset position and cached measurements when item count changes */
    listRef.current?.scrollToOffset({ offset: 0, animated: false });
    listRef.current?.clearLayoutCacheOnUpdate?.();
  }, [items.length]);

  /**
   * @description Callback function which handles the onPress event
   * @param {GlobalGroupedListDataProps} item - Item data
   * @function */
  const onPressInternal = React.useCallback(
    (item: GroupedListTimeZonesDataProps) => 
    (e: GestureResponderEvent) => {
    onPress(item);
  }, [onPress]);
  /**
   * @description Used to extract a unique key for a given item at the specified index
   * @param {ListVirtualizedGroupedDataProps} item - The specific rendereditem
   * @param {number} index - The index
   * @function */
  const keyExtractor = React.useCallback((item: GroupedListTimeZonesDataProps, index: number) => item._id, []);

  /**
   * @description Renders the list item
   * @param {ListRenderItemInfo<ListVirtualizedGroupedDataProps>} param0
   * @param {GroupedListTimeZonesDataProps} param0.item - Currently rendered item
   * @function */
  const renderItem = React.useCallback(({ item }: ListRenderItemInfo<GroupedListTimeZonesDataProps>) => {
    if (item.isStickyHeader) {
      return (
        <View style={[GroupedListTimeZonesStyle.stickyHeader, {
          backgroundColor: secondaryBgColor,
        }]}> 
          <View style={[GlobalContainerStyle.rowStartBetween, { gap: 4 }]}> 
            <ListContentTitleDescription {...item.leading} /> 
            <ListContentTitleDescription {...item.trailing} /> 
          </View> 
        </View>
      );
    }
    
    return (
      <TouchableHaptic onPress={onPressInternal(item)}>
        <View style={[GlobalContainerStyle.rowStartBetween, GroupedListTimeZonesStyle.item]}> 
          <View style={[GlobalContainerStyle.columnStartStart, GroupedListTimeZonesStyle.gap]}> 
            <View style={[GlobalContainerStyle.rowCenterStart, GroupedListTimeZonesStyle.gap]}> 
              {item._id === selectedKey && (
                <View style={[GroupedListTimeZonesStyle.active, { backgroundColor: success }]}> 
                  <TextBase 
                    type="label" 
                    text={"i18n.list.active"} /> 
                </View>
              )} 
              {item.leading?.title && <TextBase text={item.leading.title} />} 
            </View> 
            {item.leading?.description && (
              <TextBase type="label" text={item.leading.description} style={{ color: info }} />
            )}
          </View> 
          <View style={[GlobalContainerStyle.columnStartStart, GroupedListTimeZonesStyle.gap, { alignItems: "flex-end" }]}> 
            <ListContentTitleDescription {...item.trailing} /> 
          </View> 
        </View> 
      </TouchableHaptic>
    );
  }, [items, stickyIndices, selectedKey, onPressInternal]);

  return (
    <>
    <FlashList
      ref={listRef}
      //key={`items-${items.length}-${items[0]?._id || 'empty'}`}
      data={items}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
      drawDistance={1000}
      onEndReachedThreshold={0.5}
      //stickyHeaderIndices={stickyIndices}
      getItemType={(item) => item.isStickyHeader ? "sticky" : "item"}
      maxItemsInRecyclePool={0}
    />
    </>
  )
}

export default GroupedListTimeZones;