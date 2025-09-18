import BottomSheet from "@/components/container/BottomSheet";
import { STYLES } from "@/constants/Styles";
import { faAddressBook, faBookOpenCover, faBusinessTime, faChartNetwork, faFileContract, faHandshake } from "@fortawesome/duotone-thin-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { View } from "react-native";
import ListItemGroup from "../container/ListItemGroup";
import ListItemWithChildren from "../list/ListItemWithChildren";

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.1
 * @version 0.0.1
 * @component */
const Create = () => {
  return (
    <BottomSheet 
      name="create" 
      title="Schnellzugriffe">
        <View style={{ paddingHorizontal: STYLES.paddingHorizontal - 2, gap: STYLES.sizeGap + 10 }}>
          <ListItemGroup title="Verwalten">
            <View style={{ gap: STYLES.sizeGap }}>
              <ListItemWithChildren icon={faHandshake as IconProp} title="Besprechung" description="Anlegen einer neuen Besprechung" />
              <ListItemWithChildren icon={faFileContract as IconProp} title="Besprechungs-Typ" description="Verwendung für neue Besprechungen" />
              <ListItemWithChildren icon={faAddressBook as IconProp} title="Kontakt" description="Anlegen eines neuen Kontakts" />
              <ListItemWithChildren icon={faChartNetwork as IconProp} title="Mitarbeiter" description="Anlegen eines neuen Team-Mitglied" />
            </View>
          </ListItemGroup>
          <ListItemGroup title="Konfiguration">
            <View style={{ gap: STYLES.sizeGap }}>
              <ListItemWithChildren icon={faBookOpenCover  as IconProp} title="Buchungsseite" description="Öffentlicher Kalender deiner buchbaren Termine" />
              <ListItemWithChildren icon={faBusinessTime as IconProp} title="Verfügbarkeiten" description="VWochen-/Datumsbasierte Anwesenheitszeiten" />
            </View>
          </ListItemGroup>
        </View>
    </BottomSheet>
  );
};

export default Create;