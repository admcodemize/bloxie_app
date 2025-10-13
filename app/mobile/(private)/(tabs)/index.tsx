import DropdownOverlay from "@/components/container/DropdownOverlay";
import DashboardProvider, { DashboardDropdownItemKeyDays } from "@/context/DashboardContext";
import ScreenDashboard from "@/screens/private/tabs/Dashboard";

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.1
 * @version 0.0.2
 * @component */
const TabIndex = () => {
  return (
    <DashboardProvider 
      dropdown={{ 
        itemKeyTeam: 0, 
        itemKeyDays: DashboardDropdownItemKeyDays.last7Days
      }}>
        <ScreenDashboard />
        <DropdownOverlay />
    </DashboardProvider>
  );
}

export default TabIndex;