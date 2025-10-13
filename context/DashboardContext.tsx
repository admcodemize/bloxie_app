import { createContext, PropsWithChildren, useContext, useState } from "react";
import { createStore, StoreApi, useStore } from "zustand";

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.5
 * @version 0.0.1
 * @enum */
export enum DashboardDropdownItemKeyDays {
  last7Days = "last7Days",
  last30Days = "last30Days",
  allTime = "allTime"
}

/**
 * @private
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.5
 * @version 0.0.1
 * @type */
type DashboardDropdownProps = {
  itemKeyTeam: string|number;
  itemKeyDays: DashboardDropdownItemKeyDays;
}

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.5
 * @version 0.0.1
 * @type */
export type DashboardContextProps = {
  dropdown: DashboardDropdownProps;
  setDropdown: (property: string, value: string|number|DashboardDropdownItemKeyDays) => void;
};

/**
 * @private
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.5
 * @version 0.0.1
 * @type */
type DashboardProviderProps = PropsWithChildren & {
  dropdown: DashboardDropdownProps;
}

const DashboardContext = createContext<StoreApi<DashboardContextProps>|undefined>(undefined);

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @description 
 * @since 0.0.5
 * @version 0.0.1 */
export default function DashboardProvider({ 
  dropdown,
  children 
}: DashboardProviderProps) {
  const [store] = useState(() =>
    createStore<DashboardContextProps>((set) => ({
      dropdown,
      setDropdown: (property: string, value: string|number|DashboardDropdownItemKeyDays) => set((state) => ({ 
        ...state,
        dropdown: { ...state.dropdown, [property]: value as string|number|DashboardDropdownItemKeyDays } 
      }))
    }))
  );

  return (
    <DashboardContext.Provider 
      value={store}>
        {children}
    </DashboardContext.Provider>
  );
};

/**
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @description 
 * @since 0.0.5
 * @version 0.0.1
 * @param {function} selector */
export function useDashboardContextStore<T>(selector: (state: DashboardContextProps) => T) {
  const context = useContext(DashboardContext);
  if (!context) throw new Error("DashboardContextContext.Provider is missing");
  return useStore(context, selector);
}
