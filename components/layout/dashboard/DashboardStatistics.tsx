import { useTranslation } from "react-i18next";
import { View } from "react-native";

import { STYLES } from "@/constants/Styles";

import TitleWithDescription from "@/components/typography/TitleWithDescription";

import ChartLineArea, { ChartLineAreaDataProps } from "@/components/chart/ChartLineArea";
import { ChartLineAreaPointer, INITIAL_CHART_POINTER_ITEM } from "@/components/chart/ChartLineAreaPointer";
import React from "react";

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.5
 * @version 0.0.1
 * @type */
export type DashboardStatisticsProps = {
  new?: boolean;
}

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.5
 * @version 0.0.1
 * @type */
export type DashboardStatisticsChartPointerProps = {
  value: string;
  now: Date|undefined;
  showCurrency?: boolean;
}

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.5
 * @version 0.0.1
 * @param {DashboardStatisticsProps} param0 
 * @param {boolean} param0.new - Whether the statistics are new
 * @component */
const DashboardStatistics = ({

}: DashboardStatisticsProps) => {
  const { t } = useTranslation();

  const [data, setData] = React.useState(() => {
    const data = [];
    const today = new Date('2025-10-11');
    let currentValue = 120; // Start with a mid-range value
    
    for (let i = 30; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      
      // Generate small random change between -15 and +15
      const change = (Math.random() * 30) - 10;
      currentValue = Math.max(20, Math.min(240, currentValue + change));
      
      data.push({
        value: Math.floor(currentValue),
        now: date,
        dataPointLabel: `${currentValue.toFixed(2)}`,
      });
    }
    
    return data;
  })

  /** @description The initial item that the pointer component is pointing to */
  const [chartPointerItem, setChartPointerItem] = React.useState<ChartLineAreaDataProps>(INITIAL_CHART_POINTER_ITEM);

  return (
    <View style={[{ gap: STYLES.sizeGap }]}>
      <TitleWithDescription
        title={t("i18n.screens.dashboard.statistics.title")}
        description={t("i18n.screens.dashboard.statistics.description")} />
      <ChartLineAreaPointer
        title={t("i18n.screens.dashboard.statistics.pointer.income")}
        value={chartPointerItem.value.toFixed(2)}
        now={chartPointerItem.now}
        showCurrency={true} />
      <ChartLineArea
        data={data}
        showReferenceLine1={true}
        showCurrency={true}
        onPointerComponentMove={setChartPointerItem}
        /*pointerComponentColor="#75B39B"
        pointerStripColor="#75B39B"
        startFillColor="#75B39B"
        endFillColor="#8ad3b7"*//>
      
    </View>
  )
}

export default DashboardStatistics;