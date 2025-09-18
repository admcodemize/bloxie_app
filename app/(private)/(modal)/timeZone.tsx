import SafeAreaContextViewBase from "@/components/container/SafeAreaContextView";
import ScreenTimeZone from "@/screens/private/modal/TimeZone";

/** 
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.1
 * @version 0.0.1
 * @component */
const ModalTimeZone = () => {
  return (
    <SafeAreaContextViewBase>
      <ScreenTimeZone />
    </SafeAreaContextViewBase>
  )
}

export default ModalTimeZone;