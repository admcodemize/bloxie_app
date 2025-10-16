import React from "react";
import { View } from "react-native";




import DashboardAnalytics from "@/components/layout/dashboard/DashboardAnalytics";
import DashboardStatistics from "@/components/layout/dashboard/DashboardStatistics";
import TitleWithDescription from "@/components/typography/TitleWithDescription";
import { useThemeColors } from "@/hooks/theme/useThemeColor";
import DashboardStyle from "@/styles/screens/private/tabs/Dashboard";
import { useTranslation } from "react-i18next";

// https://www.lucidmeetings.com/meeting-types


/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.4
 * @version 0.0.1
 * @component */
const ScreenDashboard = (

) => {
  const { dashboardCardTitle, primaryIconColor, success, error, focusedBg, secondaryBorderColor, text, primaryBorderColor } = useThemeColors();

  const refContainer = React.useRef<any>(null)

  const { t } = useTranslation();


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



  const onPressRefresh = React.useCallback(() => {

  }, []);

  const onPressTeams = React.useCallback(() => {

  }, []);

  const onPressDays = React.useCallback(() => {

  }, []);

  return (
    <View 
      ref={refContainer}
      style={DashboardStyle.view}>
        <DashboardAnalytics
          refContainer={refContainer}
          onPressRefresh={onPressRefresh}
          onPressTeams={onPressTeams}
          onPressDays={onPressDays} />
        <DashboardStatistics new={true} />
      






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
  );
}




export default ScreenDashboard;