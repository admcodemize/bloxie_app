import React from "react";
import { Dimensions, GestureResponderEvent, View } from "react-native";

import { faArrowUpRightFromSquare, faCalendar, faCalendarCheck, faCalendarDays, faCalendarWeek, faChartNetwork, faCheckDouble, faDown, faHandHoldingHand, faRotate, faStopwatch, faUp, faUsers, faUserSecret, faWallet, faXmark } from "@fortawesome/duotone-thin-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import { STYLES } from "@/constants/Styles";
import { useDropdown } from "@/hooks/button/useDropdown";

import TouchableDropdown, { open as _open } from "@/components/button/TouchableDropdown";
import TouchableDropdownItem from "@/components/button/TouchableDropdownItem";
import TextBase from "@/components/typography/Text";

import TouchableHapticDropdown from "@/components/button/TouchableHapticDropdown";
import TouchableHapticIcon from "@/components/button/TouchableHaptichIcon";
import { useThemeColors } from "@/hooks/theme/useThemeColor";
import GlobalContainerStyle from "@/styles/GlobalContainer";
import GlobalTypographyStyle from "@/styles/GlobalTypography";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { LineChart } from "react-native-gifted-charts";

// https://www.lucidmeetings.com/meeting-types

const DROPDOWN_WIDTH = 175;

const ScreenDashboard = () => {
  const { primaryBgColor, primaryIconColor, success, error, focusedBg, secondaryBorderColor, text, primaryBorderColor } = useThemeColors();

  const refContainer = React.useRef<any>(null)
  const refTeams = React.useRef<View>(null);
  const refCalendar = React.useRef<View>(null);

  const [value, setValue] = React.useState("0.00");


  const [data1, setData1] = React.useState(() => {
    const data = [];
    const today = new Date('2025-10-11');
    let currentValue = 120; // Start with a mid-range value
    
    for (let i = 30; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      // Generate small random change between -15 and +15
      const change = (Math.random() * 30) - 15;
      currentValue = Math.max(20, Math.min(240, currentValue + change));
      
      data.push({
        value: Math.floor(currentValue),
        now: dateStr,
        dataPointLabel: `${currentValue.toFixed(2)} CHF`,
      });
    }
    
    return data;
  })

  const [data2, setData2] = React.useState(() => {
    const data = [];
    const today = new Date('2025-10-11');
    let currentValue = 40; // Start with a mid-range value
    
    for (let i = 90; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      // Generate small random change between -15 and +15
      const change = (Math.random() * 30) - 15;
      currentValue = Math.max(20, Math.min(250, currentValue + change));
      
      data.push({
        value: Math.floor(currentValue),
        now: dateStr,
        dataPointLabel: `${currentValue.toFixed(2)} CHF`,
      });
    }
    
    return data;
  })


  const [data3, setData3] = React.useState(() => {
    const data = [];
    let currentValue = 3; // Start with a mid-range value
    
    for (let i = 0; i < 30; i++) {
      // Generate small random change between -1.5 and +1.5
      const change = (Math.random() * 3) - 1.5;
      currentValue = Math.max(0, Math.min(10, currentValue + change));
      
      data.push({
        value: Math.floor(currentValue),
      });
    }
    
    return data;
  })

  const [data4, setData4] = React.useState(() => {
    const data = [];
    let currentValue = 1.5; // Start with a mid-range value
    
    for (let i = 0; i < 30; i++) {
      // Generate small random change between -1 and +1
      const change = (Math.random() * 2) - 1;
      currentValue = Math.max(0, Math.min(5, currentValue + change));
      
      data.push({
        value: Math.floor(currentValue),
      });
    }
    
    return data;
  })

  const [data, setData] = React.useState(data1);
  const [maxValue, setMaxValue] = React.useState(220);

 /**
   * @description Get the dropdown functions.
   * @see {@link hooks/container/useDropdown} */
   const { open, close } = useDropdown();

  /**
   * @description Used to open the dropdown component
   * @param {React.RefObject<View|any>} ref - The ref of the dropdown component for calculating the measurement position
   * @param {GestureResponderEvent} e - The event of the dropdown component
   * @function */
  const onPressDropdown = React.useCallback(
    (ref: React.RefObject<View|any>) =>
    (children: React.ReactNode) =>
    (e: GestureResponderEvent) => {
    /** 
     * @description Open the dropdown component based on a calculated measurement template
     * @see {@link components/button/TouchableDropdown} */
    _open({
      refTouchable: ref,
      refContainer,
      open,
      children,
      containerWidth: DROPDOWN_WIDTH
    });
  }, [open]);

  return (
    <View 
      ref={refContainer}
      //schemeProperty="secondaryBg"
      style={{ padding: STYLES.paddingHorizontal, paddingBottom: 2, gap: STYLES.sizeGap + 2 }}>












      <View style={{ gap: STYLES.sizeGap / 2 }}>
        <TextBase 
          text="Analytics" 
          style={[GlobalTypographyStyle.textSubtitle, { paddingLeft: 4 }]} />
        <TextBase 
          type="label" 
          text="Untersuche deine Daten mithilfe von Statistiken und Diagrammen um neue Erkenntnisse zu gewinnen oder Trends zu identifizieren." 
          style={[GlobalTypographyStyle.labelText, { paddingLeft: 4 }]} />
      </View>
      <View style={[GlobalContainerStyle.rowCenterBetween]}>
        <View style={[GlobalContainerStyle.rowCenterStart, { gap: STYLES.sizeGap }]}>
          <TouchableHapticDropdown
            ref={refTeams}
            icon={faChartNetwork as IconProp}
            text="codemize.com"
            backgroundColor={primaryBgColor}
            onPress={onPressDropdown(refTeams)(<TouchableDropdownBase />)} /> 
          <TouchableHapticDropdown
            ref={refCalendar}
            icon={faCalendar as IconProp}
            text="Letzte 7 Tage"
            backgroundColor={primaryBgColor}
            onPress={onPressDropdown(refCalendar)(<TouchableDropdownBaseDays />)} /> 
        </View>
        <TouchableHapticIcon
          icon={faRotate as IconProp}
          iconColor={primaryIconColor}
          backgroundColor={primaryBgColor}
          onPress={() => { setData(data2) }} />
      </View>







      <View style={{ gap: STYLES.sizeGap / 2 }}>
        <TextBase 
          text="Statistiken" 
          style={[GlobalTypographyStyle.textSubtitle, { paddingLeft: 4 }]} />
        <TextBase 
          type="label" 
          text="Überblick der wichtigsten Daten zur Performance und Effizienz deiner Termine und Buchungen."
          style={[GlobalTypographyStyle.labelText, { paddingLeft: 4 }]} />
      </View>
        <View style={{ paddingHorizontal: 4, flexDirection: "row", justifyContent: "flex-start", gap: 4 }}>
          <TextBase 
            text={`Einkommen: ${value.toString()} CHF`}
            style={[GlobalTypographyStyle.titleSubtitle, { fontSize: 10, color: text }]} />
          <TextBase 
            type="label" 
            text="18. März 2025"
            style={[GlobalTypographyStyle.labelText]} />
        </View>
        <LineChart
          areaChart
          //spacing={(Dimensions.get("window").width / data.length) - 2}
          width={Dimensions.get("window").width - 30}
          height={60}
          adjustToWidth={true}
          noOfSections={3}
          showVerticalLines={false}
          xAxisThickness={0}
          yAxisThickness={0}
          focusEnabled={false}
          disableScroll={true}
          yAxisLabelWidth={0}
            startFillColor={"#75B39B"}
            startOpacity={0.8}
            endFillColor={"#8ad3b7"}
            endOpacity={0.4}
            isAnimated={true}
            animateOnDataChange={true}
            //renderDataPointsAfterAnimationEnds={true}
            referenceLine1Position={100}
            referenceLine1Config={{
              color: `${focusedBg}40`,
              thickness: 1,
              type: "dashed",
              zIndex: 0,
              labelText: "⌀ 125.00 CHF",
              labelTextStyle: {
                fontSize: 10,
                marginLeft: 10,
                marginTop: -10,
                backgroundColor: focusedBg,
                padding: 2,
                paddingHorizontal: 4,
                borderRadius: 4,
                color: "#fff",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                gap: 2,
                fontWeight: "bold",
              },

            }}
            showReferenceLine1={true}
            
            hideOrigin={false}
            //dataPointsColor="#75B39B"
            hideDataPoints
            //dataPointsRadius1={2}

            stepValue={100}
            initialSpacing={10} // default 20

            color="#75B39B"

            rulesColor={primaryBorderColor}


            showYAxisIndices={false}
            showXAxisIndices={false}
            //showValuesAsDataPointsText={true}
            showFractionalValues={false}
            hideYAxisText={true}
            xAxisLabelsHeight={0}

            xAxisLength={Dimensions.get("window").width}
            xAxisIndicesHeight={0}
            maxValue={maxValue}
            onPress={(item: any) => console.log('item onPress: ', item)}
            pointerConfig={{
              barTouchable: true,

              //pointerStripHeight: 220 - 125 - 20,
              pointerStripColor: "#75B39B", //secondaryBorderColor,
              pointerStripWidth: 1,
              pointerStripUptoDataPoint: false,
              //activatePointersOnLongPress: false,
              autoAdjustPointerLabelPosition: false,
              //initialPointerIndex: 8,
              //activatePointersInstantlyOnTouch: true,
              resetPointerOnDataChange: true,
              //hidePointerDataPointForMissingValues: false,
              //resetPointerIndexOnRelease: true,
              persistPointer: true,
              pointerEvents: "box-only",
              pointerLabelWidth: 30,

              pointerComponent: (item: any) => {
                return (
                  <View style={{ width: 10, height: 10, backgroundColor: '#75B39B', borderRadius: 2 }} />
                )
              },
              
              pointerLabelComponent: (items: any, itemIndex: any, index: number, segmentItemIndex: number
              ) => {
                console.log("pointerLabelComponent");
          
                setValue(`${items[0].value.toFixed(2)}`);

                {/*return (
                  <View style={{ top: 20, height: 20, backgroundColor: "#75B39B", borderRadius: 4, padding: 3,
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    left: index === 0 ? 6 : index === data.length - 1 ? -14 : 0,
                   }}>
                    <TextBase text={items[0].dataPointLabel} style={[GlobalTypographyStyle.headerSubtitle, { fontSize: 10, color: "#fff", 
                      textAlign: "center" }]} />
                  </View>
                )*/}
              },
            }}
            data={data}/>

      <View style={{ gap: STYLES.sizeGap - 2 }}>






      <View style={[GlobalContainerStyle.rowCenterBetween, { gap: STYLES.sizeGap, width: "100%", backgroundColor: "#e9e9e9",
             borderRadius: 6,
             padding: STYLES.paddingVertical,
         }]}>
      <View style={[GlobalContainerStyle.rowCenterStart, { 
        
      }, { gap: STYLES.sizeGap }]}>
        <View style={[GlobalContainerStyle.columnCenterCenter, { backgroundColor: "#D2D2D2", 
          height: 32, width: 32, borderRadius: 8,
          borderWidth: 1,
          borderColor: secondaryBorderColor,
        }]}>
          <FontAwesomeIcon
            icon={faWallet as IconProp}
            size={STYLES.sizeFaIcon + 2}
            color={primaryIconColor} />
        </View>
        <View>
          <TextBase 
            text="Einkommen"
            color="#5E5E5E"
            style={[GlobalTypographyStyle.titleSubtitle, { fontSize: 10 }]} />
            <View style={[GlobalContainerStyle.rowCenterStart, { gap: STYLES.sizeGap - 2 }]}>
              <TextBase 
                text="59'490.00 CHF"
                type="header"
                color="#1B1B1B"
                style={[GlobalTypographyStyle.headerSubtitle, { fontSize: 12 }]} />
              <View style={[GlobalContainerStyle.rowCenterStart, { gap: 2 }]}>
                <FontAwesomeIcon
                  icon={faUp as IconProp}
                  size={STYLES.sizeFaIcon - 4}
                  color={success} />
                <TextBase 
                  text="3.5%"
                  type="text"
                  color={success}
                  style={[GlobalTypographyStyle.headerSubtitle, { fontSize: 10 }]} />
              </View>
            </View>
          </View>
      </View>

      <View style={[GlobalContainerStyle.rowCenterCenter, { backgroundColor: "#D2D2D2", 
          height: 26, borderRadius: 6, gap: STYLES.sizeGap,
          paddingHorizontal: STYLES.paddingHorizontal - 4,
          borderWidth: 1,
          borderColor: secondaryBorderColor,
        }]}>
          <TextBase 
            text="details"
            color="#5E5E5E"
            style={[GlobalTypographyStyle.titleSubtitle, { fontSize: 10 }]} />
          <FontAwesomeIcon
            icon={faArrowUpRightFromSquare as IconProp}
            size={STYLES.sizeFaIcon - 2}
            color={primaryIconColor} />
        </View>
        </View>



      <View style={[GlobalContainerStyle.rowCenterStart, { gap: STYLES.sizeGap }]}>
      <View style={[GlobalContainerStyle.rowCenterStart, { 
        backgroundColor: "#e9e9e9",
        borderRadius: 6,
        padding: STYLES.paddingVertical,
        width: "49%",
      }, { gap: STYLES.sizeGap }]}>
        <View style={[GlobalContainerStyle.columnCenterCenter, { backgroundColor: "#D2D2D2", 
          height: 32, width: 32, borderRadius: 8,
          borderWidth: 1,
          borderColor: secondaryBorderColor,
        }]}>
          <FontAwesomeIcon
            icon={faUsers as IconProp}
            size={STYLES.sizeFaIcon + 2}
            color={primaryIconColor} />
        </View>
        <View>
        <TextBase 
          text="Seitenbesucher"
          color="#5E5E5E"
          style={[GlobalTypographyStyle.titleSubtitle, { fontSize: 10 }]} />
          <View style={[GlobalContainerStyle.rowCenterStart, { gap: STYLES.sizeGap - 2 }]}>
            <TextBase 
              text="175k"
              type="header"
              color="#1B1B1B"
              style={[GlobalTypographyStyle.headerSubtitle, { fontSize: 12 }]} />
              <View style={[GlobalContainerStyle.rowCenterStart, { gap: 2 }]}>
            <FontAwesomeIcon
              icon={faUp as IconProp}
              size={STYLES.sizeFaIcon - 4}
              color={success} />
            <TextBase 
              text="80%"
              type="text"
              color={success}
              style={[GlobalTypographyStyle.headerSubtitle, { fontSize: 12 }]} />
              </View>
          </View>
        </View>
      </View>

      <View style={[GlobalContainerStyle.rowCenterStart, { 
        backgroundColor: "#e9e9e9",
        borderRadius: 6,
        padding: STYLES.paddingVertical,
        width: "49%",
      }, { gap: STYLES.sizeGap }]}>
        <View style={[GlobalContainerStyle.columnCenterCenter, { backgroundColor: "#D2D2D2", 
          height: 32, width: 32, borderRadius: 8,
          borderWidth: 1,
          borderColor: secondaryBorderColor,
        }]}>
          <FontAwesomeIcon
            icon={faCalendarCheck as IconProp}
            size={STYLES.sizeFaIcon + 2}
            color={primaryIconColor} />
        </View>
        <View>
        <TextBase 
          text="Neue Termine"
          color="#5E5E5E"
          style={[GlobalTypographyStyle.titleSubtitle, { fontSize: 10 }]} />
          <View style={[GlobalContainerStyle.rowCenterStart, { gap: STYLES.sizeGap - 2 }]}>
            <TextBase 
              text="15"
              type="header"
              color="#1B1B1B"
              style={[GlobalTypographyStyle.headerSubtitle, { fontSize: 12 }]} />
              <View style={[GlobalContainerStyle.rowCenterStart, { gap: 2 }]}>
            <FontAwesomeIcon
              icon={faDown as IconProp}
              size={STYLES.sizeFaIcon - 4}
              color={error} />
            <TextBase 
              text="23%"
              type="text"
              color={error}
              style={[GlobalTypographyStyle.headerSubtitle, { fontSize: 12 }]} />
              </View>
          </View>
        </View>
      </View>
      </View>

      <View style={[GlobalContainerStyle.rowCenterStart, { gap: STYLES.sizeGap }]}>
      <View style={[GlobalContainerStyle.rowCenterStart, { 
        backgroundColor: "#e9e9e9",
        borderRadius: 6,
        padding: STYLES.paddingVertical,
        width: "49%",
      }, { gap: STYLES.sizeGap }]}>
        <View style={[GlobalContainerStyle.columnCenterCenter, { backgroundColor: "#D2D2D2", 
          height: 32, width: 32, borderRadius: 8,
          borderWidth: 1,
          borderColor: secondaryBorderColor,
        }]}>
          <FontAwesomeIcon
            icon={faStopwatch as IconProp}
            size={STYLES.sizeFaIcon + 2}
            color={primaryIconColor} />
        </View>
        <View>
        <TextBase 
          text="Freie Slots"
          color="#5E5E5E"
          style={[GlobalTypographyStyle.titleSubtitle, { fontSize: 10 }]} />
          <View style={[GlobalContainerStyle.rowCenterStart, { gap: STYLES.sizeGap - 2 }]}>
            <TextBase 
              text="48"
              type="header"
              color="#1B1B1B"
              style={[GlobalTypographyStyle.headerSubtitle, { fontSize: 12 }]} />
              <View style={[GlobalContainerStyle.rowCenterStart, { gap: 2 }]}>
            <FontAwesomeIcon
              icon={faDown as IconProp}
              size={STYLES.sizeFaIcon - 4}
              color={error} />
            <TextBase 
              text="13%"
              type="text"
              color={error}
              style={[GlobalTypographyStyle.headerSubtitle, { fontSize: 12 }]} />
              </View>
          </View>
        </View>
      </View>

      <View style={[GlobalContainerStyle.rowCenterStart, { 
        backgroundColor: "#e9e9e9",
        borderRadius: 6,
        padding: STYLES.paddingVertical,
        width: "49%",
      }, { gap: STYLES.sizeGap }]}>
        <View style={[GlobalContainerStyle.columnCenterCenter, { backgroundColor: "#D2D2D2", 
          height: 32, width: 32, borderRadius: 8,
          borderWidth: 1,
          borderColor: secondaryBorderColor,
        }]}>
          <FontAwesomeIcon
            icon={faHandHoldingHand as IconProp}
            size={STYLES.sizeFaIcon + 2}
            color={primaryIconColor} />
        </View>
        <View>
        <TextBase 
          text="Neukunden"
          color="#5E5E5E"
          style={[GlobalTypographyStyle.titleSubtitle, { fontSize: 10 }]} />
          <View style={[GlobalContainerStyle.rowCenterStart, { gap: STYLES.sizeGap - 2 }]}>
            <TextBase 
              text="23"
              type="header"
              color="#1B1B1B"
              style={[GlobalTypographyStyle.headerSubtitle, { fontSize: 12 }]} />
              <View style={[GlobalContainerStyle.rowCenterStart, { gap: 2 }]}>
            <FontAwesomeIcon
              icon={faUp as IconProp}
              size={STYLES.sizeFaIcon - 4}
              color={success} />
            <TextBase 
              text="34%"
              type="text"
              color={success}
              style={[GlobalTypographyStyle.headerSubtitle, { fontSize: 12 }]} />
              </View>
          </View>
        </View>
      </View>
      </View>
      </View>

      






            <View style={[GlobalContainerStyle.columnStartStart, { gap: STYLES.sizeGap }]}>

      {/*<View style={{ gap: 2 }}>
        <TextBase 
          text="Auslastung/Kapazität" 
          style={[GlobalTypographyStyle.textSubtitle, { paddingLeft: 4 }]} />
        <TextBase 
          type="label" 
          text="Überblick der Auslastung und Kapazität deiner Termine."
          style={[GlobalTypographyStyle.labelText, { paddingLeft: 4 }]} />
      </View>



      <View style={{
        backgroundColor: "#e9e9e9",
        borderRadius: 6,
        padding: STYLES.paddingVertical,
        width: "100%",
        gap: STYLES.sizeGap,
      }}>

        <View style={[GlobalContainerStyle.rowCenterBetween, { gap: STYLES.sizeGap }]}>

        <View style={[GlobalContainerStyle.rowStartStart, { gap: STYLES.sizeGap + 4, paddingLeft: 4 }]}>
          <View>
            <View style={[GlobalContainerStyle.rowCenterStart, { gap: STYLES.sizeGap / 2 }]}>
              <TextBase 
                text="Verfügbare Zeiten"
                color="#5E5E5E"
                style={[GlobalTypographyStyle.titleSubtitle, { fontSize: 10 }]} />
              <FontAwesomeIcon
                icon={faCircle as IconProp}
                size={STYLES.sizeFaIcon - 6}
                color={"#75B39B"} />
            </View>
            <TextBase 
              text="21h 30m"
              color="#1B1B1B"
              style={[GlobalTypographyStyle.headerSubtitle, { fontSize: 12 }]} />
          </View>
          <View>
            <View style={[GlobalContainerStyle.rowCenterStart, { gap: STYLES.sizeGap / 2 }]}>
              <TextBase 
                text="Gebuchte Zeiten"
                color="#5E5E5E"
                style={[GlobalTypographyStyle.titleSubtitle, { fontSize: 10 }]} />
              <FontAwesomeIcon
                icon={faCircle as IconProp}
                size={STYLES.sizeFaIcon - 6}
                color={"#D2D2D2"} />
            </View>
            <TextBase 
              text="168h 30m"
              color="#1B1B1B"
              style={[GlobalTypographyStyle.headerSubtitle, { fontSize: 12 }]} />
          </View>
        </View>

        <View style={[GlobalContainerStyle.rowCenterCenter, { backgroundColor: "#D2D2D2", 
          height: 26, borderRadius: 6, gap: STYLES.sizeGap,
          paddingHorizontal: STYLES.paddingHorizontal - 4,
          borderWidth: 1,
          borderColor: secondaryBorderColor,
        }]}>
          <View>
            <TextBase 
              text="details"
              color="#5E5E5E"
              style={[GlobalTypographyStyle.titleSubtitle, { fontSize: 10 }]} />
          </View>
          <FontAwesomeIcon
            icon={faArrowUpRightFromSquare as IconProp}
            size={STYLES.sizeFaIcon - 2}
            color={primaryIconColor} />
        </View>

      </View>

      <View style={[GlobalContainerStyle.rowCenterBetween, { 
        gap: 2,
      }]}>
        <View style={{ backgroundColor: "#75B39B", height: 20, width: "80%", borderRadius: 4 }}>

        </View>
        <View style={{ backgroundColor: "#D2D2D2", height: 20, width: "19.5%", borderRadius: 4, borderWidth: 1,
          borderColor: secondaryBorderColor, }}>

        </View> 
      </View>
      </View>*/}




      <View style={{ gap: 2 }}>
        <TextBase 
          text="Anfragen/Buchungen" 
          style={[GlobalTypographyStyle.textSubtitle, { paddingLeft: 4 }]} />
        <TextBase 
          type="label" 
          text="Überblick der noch fehlenden Bestätigungen oder Ablehnungen."
          style={[GlobalTypographyStyle.labelText, { paddingLeft: 4 }]} />
      </View>

      <View style={{ paddingHorizontal: 4, flexDirection: "row", justifyContent: "flex-start", gap: 4 }}>
          <TextBase 
            text={`Ablehnungen: ${value}`}
            style={[GlobalTypographyStyle.titleSubtitle, { fontSize: 10, color: text }]} />
          <TextBase 
            type="label" 
            text="18. März 2025"
            style={[GlobalTypographyStyle.labelText]} />
        </View>      

      <LineChart
        areaChart 
        width={Dimensions.get("window").width - 40}
        height={60}
        adjustToWidth={true}
        noOfSections={3}
        showVerticalLines={false}
        xAxisThickness={0}
        yAxisThickness={0}
        focusEnabled={true}
        startFillColor={"#75B39B"}
        startOpacity={0.8}
        endFillColor={"#8ad3b7"}
        endOpacity={0.1}
        //curved={true}
        isAnimated={true}
        animateOnDataChange={true}
        renderDataPointsAfterAnimationEnds={true}
        referenceLine1Position={125}
        referenceLine1Config={{
          color: secondaryBorderColor,
          thickness: 1,
          type: "dashed",
        }}
        showReferenceLine1={true}
        
        hideOrigin={false}
        dataPointsColor="#75B39B"
        dataPointsColor2="#f54e67"
        hideDataPoints={true}
        dataPointsRadius1={2}
        dataPointsRadius2={2}

        stepValue={4}
        initialSpacing={10} // default 20

        color="#75B39B"
        //startFillColor="#159F85"
        //endFillColor="#159F85"
        //startOpacity={0.8}
        //endOpacity={0.3}

        color2="#f54e67"
        startFillColor2="#f54e67"
        endFillColor2="#f54e67"
        startOpacity2={0.8}
        endOpacity2={0.3}

        rulesColor={primaryBorderColor}

        thickness={2}


        showYAxisIndices={false}
        showXAxisIndices={false}
        showValuesAsDataPointsText={false}
        showFractionalValues={false}
        hideYAxisText={true}

        xAxisLength={Dimensions.get("window").width - 42}
        xAxisIndicesHeight={0}
        //maxValue={10}


        dataPointsHeight={16}
        dataPointsWidth={6}
        dataPointsColor1="#159F85"
        

        pointerConfig={{}}
        /** @ts-ignore -> It works also with typescript error..  */
        //xAxisLabelsHeight={0}
        //hideRules={true}
        //hideAxesAndRules={true}

        /*customDataPoint={() => <View
    style={{
        width: 10,
        height: 10,
        backgroundColor: 'white',
        borderWidth: 4,
        borderRadius: 10,
        borderColor: '#07BAD1',
    }}
    />}*/
        /*dataPointLabelComponent={(item: any) => (
          <TextBase 
            text={item.value.toString()} 
            style={[GlobalTypographyStyle.labelText, { fontSize: 8, color: "gray", paddingBottom: 4 }]} />
        )}*/
        
        dataPointsRadius={4}
        //yAxisColor={"#D2D2D2"}
        yAxisTextStyle={{ fontSize: 10, color: text }}
        //xAxisColor={"#D2D2D2"}
        xAxisLabelTextStyle={{ fontSize: 8, color: text, paddingLeft: 2 }}
        xAxisLabelsHeight={0}
        //xAxisLabelsAtBottom={false}
        data={data4}
        data2={data4}/>

      <View style={[GlobalContainerStyle.rowCenterStart, { gap: STYLES.sizeGap }]}>
      <View style={[GlobalContainerStyle.rowCenterStart, { 
        backgroundColor: "#e9e9e9",
        borderRadius: 6,
        padding: STYLES.paddingVertical,
        width: "49%",
      }, { gap: STYLES.sizeGap }]}>
        <View style={[GlobalContainerStyle.columnCenterCenter, { backgroundColor: "#D2D2D2", 
          height: 32, width: 32, borderRadius: 8,
          borderWidth: 1,
          borderColor: secondaryBorderColor,
        }]}>
          <FontAwesomeIcon
            icon={faCheckDouble as IconProp}
            size={STYLES.sizeFaIcon + 2}
            color={primaryIconColor} />
        </View>
        <View>
        <TextBase 
          text="Bestätigungen"
          color="#5E5E5E"
          style={[GlobalTypographyStyle.titleSubtitle, { fontSize: 10 }]} />
          <View style={[GlobalContainerStyle.rowCenterStart, { gap: STYLES.sizeGap - 2 }]}>
            <TextBase 
              text="14"
              type="header"
              color="#1B1B1B"
              style={[GlobalTypographyStyle.headerSubtitle, { fontSize: 12 }]} />
              <View style={[GlobalContainerStyle.rowCenterStart, { gap: 2 }]}>
            <FontAwesomeIcon
              icon={faDown as IconProp}
              size={STYLES.sizeFaIcon - 4}
              color={error} />
            <TextBase 
              text="13%"
              type="text"
              color={error}
              style={[GlobalTypographyStyle.headerSubtitle, { fontSize: 12 }]} />
              </View>
          </View>
        </View>
      </View>

      <View style={[GlobalContainerStyle.rowCenterStart, { 
        backgroundColor: "#e9e9e9",
        borderRadius: 6,
        padding: STYLES.paddingVertical,
        width: "49%",
      }, { gap: STYLES.sizeGap }]}>
        <View style={[GlobalContainerStyle.columnCenterCenter, { backgroundColor: "#D2D2D2", 
          height: 32, width: 32, borderRadius: 8,
          borderWidth: 1,
          borderColor: secondaryBorderColor,
        }]}>
          <FontAwesomeIcon
            icon={faXmark as IconProp}
            size={STYLES.sizeFaIcon + 2}
            color={primaryIconColor} />
        </View>
        <View>
        <TextBase 
          text="Ablehnungen"
          color="#5E5E5E"
          style={[GlobalTypographyStyle.titleSubtitle, { fontSize: 10 }]} />
          <View style={[GlobalContainerStyle.rowCenterStart, { gap: STYLES.sizeGap - 2 }]}>
            <TextBase 
              text="2"
              type="header"
              color="#1B1B1B"
              style={[GlobalTypographyStyle.headerSubtitle, { fontSize: 12 }]} />
              <View style={[GlobalContainerStyle.rowCenterStart, { gap: 2 }]}>
            <FontAwesomeIcon
              icon={faUp as IconProp}
              size={STYLES.sizeFaIcon - 4}
              color={success} />
            <TextBase 
              text="34%"
              type="text"
              color={success}
              style={[GlobalTypographyStyle.headerSubtitle, { fontSize: 12 }]} />
              </View>
          </View>
        </View>
      </View>
      </View>

      {/*<View style={{
        backgroundColor: "#e9e9e9",
        borderRadius: 6,
        padding: STYLES.paddingVertical,
        width: "100%",
        gap: STYLES.sizeGap,
      }}>

        <View style={[GlobalContainerStyle.rowCenterBetween, { gap: STYLES.sizeGap }]}>

        <View style={[GlobalContainerStyle.rowStartStart, { gap: STYLES.sizeGap + 4, paddingLeft: 4 }]}>
          <View>
            <View style={[GlobalContainerStyle.rowCenterStart, { gap: STYLES.sizeGap / 2 }]}>
              <TextBase 
                text="Bestätigungen"
                color="#5E5E5E"
                style={[GlobalTypographyStyle.titleSubtitle, { fontSize: 10 }]} />
              <FontAwesomeIcon
                icon={faCircle as IconProp}
                size={STYLES.sizeFaIcon - 6}
                color={"#75B39B"} />
            </View>
            <TextBase 
              text="23"
              color="#1B1B1B"
              style={[GlobalTypographyStyle.headerSubtitle, { fontSize: 12 }]} />
          </View>
          <View>
            <View style={[GlobalContainerStyle.rowCenterStart, { gap: STYLES.sizeGap / 2 }]}>
              <TextBase 
                text="Ablehnungen"
                color="#5E5E5E"
                style={[GlobalTypographyStyle.titleSubtitle, { fontSize: 10 }]} />
              <FontAwesomeIcon
                icon={faCircle as IconProp}
                size={STYLES.sizeFaIcon - 6}
                color={"#f54e67"} />
            </View>
            <TextBase 
              text="2"
              color="#1B1B1B"
              style={[GlobalTypographyStyle.headerSubtitle, { fontSize: 12 }]} />
          </View>
          <View>
            <View style={[GlobalContainerStyle.rowCenterStart, { gap: STYLES.sizeGap / 2 }]}>
              <TextBase 
                text="Offen"
                color="#5E5E5E"
                style={[GlobalTypographyStyle.titleSubtitle, { fontSize: 10 }]} />
              <FontAwesomeIcon
                icon={faCircle as IconProp}
                size={STYLES.sizeFaIcon - 6}
                color={"#D2D2D2"} />
            </View>
            <TextBase 
              text="30"
              color="#1B1B1B"
              style={[GlobalTypographyStyle.headerSubtitle, { fontSize: 12 }]} />
          </View>
        </View>

        <View style={[GlobalContainerStyle.rowCenterCenter, { backgroundColor: "#D2D2D2", 
          height: 26, borderRadius: 6, gap: STYLES.sizeGap,
          paddingHorizontal: STYLES.paddingHorizontal - 4,
          borderWidth: 1,
          borderColor: secondaryBorderColor,
        }]}>
          <View>
            <TextBase 
              text="details"
              color="#5E5E5E"
              style={[GlobalTypographyStyle.titleSubtitle, { fontSize: 10 }]} />
          </View>
          <FontAwesomeIcon
            icon={faArrowUpRightFromSquare as IconProp}
            size={STYLES.sizeFaIcon - 2}
            color={primaryIconColor} />
        </View>

      </View>

      <View style={[GlobalContainerStyle.rowCenterBetween, { 
        gap: 1,
      }]}>
        <View style={{ backgroundColor: "#75B39B", height: 20, width: "30%", borderRadius: 4 }}>

        </View>
        <View style={{ backgroundColor: "#f54e67", height: 20, width: "10%", borderRadius: 4 }}>

        </View> 
        <View style={{ backgroundColor: "#D2D2D2", height: 20, width: "59%", borderRadius: 4, borderWidth: 1,
          borderColor: secondaryBorderColor, }}>

        </View> 
      </View>
      </View>*/}
      </View>


      {/*<View style={{ gap: 2 }}>
        <TextBase 
          text="Ereignisse" 
          style={[GlobalTypographyStyle.textSubtitle, { paddingLeft: 4 }]} />
        <TextBase 
          type="label" 
          text="Übersicht der nächsten anstehenden Ereignissen."
          style={[GlobalTypographyStyle.labelText, { paddingLeft: 4 }]} />
      </View>

      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: STYLES.sizeGap }}>
            <View style={[GlobalContainerStyle.rowCenterStart, { 
        backgroundColor: "#e9e9e9",
        borderRadius: 6,
        padding: STYLES.paddingVertical,
        maxWidth: 250
      }, { gap: STYLES.sizeGap }]}>
        <View style={{ backgroundColor: "#0092F9", height: "100%", width: 4, borderRadius: 2 }}>

        </View>
        <View>
          <TextBase 
            text="11:00 - 12:30 Uhr / 05.10.2025"
            color="#5E5E5E"
            style={[GlobalTypographyStyle.headerSubtitle, { fontSize: 10 }]} />
          <View style={{ gap: STYLES.sizeGap - 2 }}>
            <View style={[GlobalContainerStyle.rowCenterStart, { gap: STYLES.sizeGap - 2 }]}>
              <TextBase 
                text="Bloxie: Entwicklungen"
                type="header"
                color="#5E5E5E"
                numberOfLines={1}
                style={[GlobalTypographyStyle.titleSubtitle, { fontSize: 10 }]} />
            </View>
            <View style={[GlobalContainerStyle.rowCenterStart, { gap: STYLES.sizeGap / 2, paddingBottom: 2 }]}>
              <FontAwesomeIcon
                icon={faLocationDot as IconProp}
                size={STYLES.sizeFaIcon - 2}
                color={primaryIconColor} />
              <TextBase 
                type="label" 
                text="Papiermühlestrasse 71, 3014 Bern"
                numberOfLines={1}
                style={[GlobalTypographyStyle.labelText]} />
            </View>
          </View>
          
        </View>
      </View>
      

      <View style={[GlobalContainerStyle.rowCenterStart, { 
        backgroundColor: "#e9e9e9",
        borderRadius: 6,
        padding: STYLES.paddingVertical,
        maxWidth: 250
      }, { gap: STYLES.sizeGap }]}>
        <View style={{ backgroundColor: "#D76F00", height: "100%", width: 4, borderRadius: 2 }}>

        </View>
        <View>
          <TextBase 
            text="13:00 - 15:30 Uhr / 05.10.2025"
            color="#5E5E5E"
            style={[GlobalTypographyStyle.headerSubtitle, { fontSize: 10 }]} />
          <View style={{ gap: STYLES.sizeGap - 2 }}>
            <View style={[GlobalContainerStyle.rowCenterStart, { gap: STYLES.sizeGap - 2 }]}>
              <TextBase 
                text="Bloxie: Interface"
                type="header"
                color="#5E5E5E"
                numberOfLines={1}
                style={[GlobalTypographyStyle.titleSubtitle, { fontSize: 10 }]} />
            </View>
            <View style={[GlobalContainerStyle.rowCenterStart, { gap: STYLES.sizeGap / 2, paddingBottom: 2 }]}>
              <FontAwesomeIcon
                icon={faLocationDot as IconProp}
                size={STYLES.sizeFaIcon - 2}
                color={primaryIconColor} />
              <TextBase 
                type="label" 
                text="Teams-Besprechung"
                numberOfLines={1}
                style={[GlobalTypographyStyle.labelText]} />
            </View>
          </View>
          
        </View>
      </View>      
      
        </ScrollView>
      </View>*/}


    </View>
  );
}

const TouchableDropdownBase = () => {
  const { primaryIconColor } = useThemeColors();

  return (
    <TouchableDropdown
      style={[{ width: "auto" }]}>
        <TouchableDropdownItem
          isSelected={true}
          onPress={() => () => {}}>
            <View style={[GlobalContainerStyle.rowCenterStart, { gap: STYLES.sizeGap }]}>
            <FontAwesomeIcon
              icon={faChartNetwork as IconProp}
              size={STYLES.sizeFaIcon}
              color={"#fff"} />
            <TextBase 
              text="codemize.com"
              style={[GlobalTypographyStyle.textSubtitle, { fontSize: 10, color: "#fff" }]} />
            </View>
      </TouchableDropdownItem>
      <TouchableDropdownItem
          onPress={() => () => {}}>
            <View style={[GlobalContainerStyle.rowCenterStart, { gap: STYLES.sizeGap }]}>
            <FontAwesomeIcon
              icon={faUserSecret as IconProp}
              size={STYLES.sizeFaIcon}
              color={primaryIconColor} />
            <TextBase 
              text="Privater Kalender"
              style={[GlobalTypographyStyle.labelText, { fontSize: 10, color: "#7E7D7F" }]} />
            </View>
      </TouchableDropdownItem>
    </TouchableDropdown>
  )
}


const TouchableDropdownBaseDays = () => {
  const { primaryIconColor } = useThemeColors();

  return (
    <TouchableDropdown
      style={[{ width: "auto" }]}>
        <TouchableDropdownItem
          onPress={() => () => {}}>
            <View style={[GlobalContainerStyle.rowCenterStart, { gap: STYLES.sizeGap }]}>
            <FontAwesomeIcon
              icon={faCalendarWeek as IconProp}
              size={STYLES.sizeFaIcon}
              color={primaryIconColor} />
            <TextBase 
              text="Letzte 7 Tage"
              style={[GlobalTypographyStyle.textSubtitle, { fontSize: 10, color: "#7E7D7F" }]} />
            </View>
      </TouchableDropdownItem>
      <TouchableDropdownItem
          isSelected={true}
          onPress={() => () => {}}>
            <View style={[GlobalContainerStyle.rowCenterStart, { gap: STYLES.sizeGap }]}>
            <FontAwesomeIcon
              icon={faCalendarDays as IconProp}
              size={STYLES.sizeFaIcon}
              color={"#fff"} />
            <TextBase 
              text="Letzte 30 Tage"
              style={[GlobalTypographyStyle.textSubtitle, { fontSize: 10, color: "#fff" }]} />
            </View>
      </TouchableDropdownItem>
      <TouchableDropdownItem
          onPress={() => () => {}}>
            <View style={[GlobalContainerStyle.rowCenterStart, { gap: STYLES.sizeGap }]}>
            <FontAwesomeIcon
              icon={faCalendar as IconProp}
              size={STYLES.sizeFaIcon}
              color={primaryIconColor} />
            <TextBase 
              text="Gesamter Zeitraum"
              style={[GlobalTypographyStyle.labelText, { fontSize: 10, color: "#7E7D7F" }]} />
            </View>
      </TouchableDropdownItem>
    </TouchableDropdown>
  )
}

export default ScreenDashboard;