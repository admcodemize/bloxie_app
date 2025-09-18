import { View } from "react-native";

import { faAddressBook, faBookOpenCover, faBusinessTime, faChartNetwork, faFileContract, faHandshake } from "@fortawesome/duotone-thin-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import { STYLES } from "@/constants/Styles";

import BottomSheet from "@/components/container/BottomSheet";
import ListItemGroup from "@/components/container/ListItemGroup";
import ListItemWithChildren from "@/components/list/item/ListItemWithChildren";

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.1
 * @version 0.0.1
 * @component */
const ScreenCreate = () => {
  return (
    <BottomSheet 
      name="create" 
      title={"i18n.sheets.create.title"}>
        <View style={{ 
          paddingHorizontal: STYLES.paddingHorizontal - 2, 
          gap: STYLES.sizeGap + 10 
        }}>
          <ListItemGroup title={"i18n.sheets.create.groups.manage"}>
            <View style={{ gap: STYLES.sizeGap }}>
              <ListItemWithChildren icon={faHandshake as IconProp} title={"i18n.sheets.create.items.meeting.title"} description={"i18n.sheets.create.items.meeting.description"} />
              <ListItemWithChildren icon={faFileContract as IconProp} title={"i18n.sheets.create.items.type.title"} description={"i18n.sheets.create.items.type.description"} />
              <ListItemWithChildren icon={faAddressBook as IconProp} title={"i18n.sheets.create.items.contact.title"} description={"i18n.sheets.create.items.contact.description"} />
              <ListItemWithChildren icon={faChartNetwork as IconProp} title={"i18n.sheets.create.items.employee.title"} description={"i18n.sheets.create.items.employee.description"} />
            </View>
          </ListItemGroup>
          <ListItemGroup title={"i18n.sheets.create.groups.configuration"}>
            <View style={{ gap: STYLES.sizeGap }}>
              <ListItemWithChildren icon={faBookOpenCover  as IconProp} title={"i18n.sheets.create.items.bookingPage.title"} description={"i18n.sheets.create.items.bookingPage.description"} />
              <ListItemWithChildren icon={faBusinessTime as IconProp} title={"i18n.sheets.create.items.availability.title"} description={"i18n.sheets.create.items.availability.description"} />
            </View>
          </ListItemGroup>
        </View>
    </BottomSheet>
  );
};

export default ScreenCreate;