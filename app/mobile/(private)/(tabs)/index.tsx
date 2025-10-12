import DropdownOverlay from "@/components/container/DropdownOverlay";
import ScreenDashboard from "@/screens/private/tabs/Dashboard";

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.1
 * @version 0.0.1
 * @component */
const TabIndex = () => {
  return (
    <>
      <ScreenDashboard />
      <DropdownOverlay />
    </>
  );
}

export default TabIndex;