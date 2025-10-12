import SafeAreaContextViewBase from "@/components/container/SafeAreaContextView";
import ScreenCreate from "@/screens/private/modal/Create";

/** 
 * @public
 * @author Marc Stöckli - Codemize GmbH 
 * @since 0.0.2
 * @version 0.0.1
 * @component */
const ModalCreate = () => {
  return (
    <SafeAreaContextViewBase>
      <ScreenCreate />
    </SafeAreaContextViewBase>
  )
}

export default ModalCreate;