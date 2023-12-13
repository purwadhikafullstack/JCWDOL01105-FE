import ProtectedRouteTenant from "@/components/auth/ProtectedRouteTenant";
import SpecialPriceForm from '@/components/property/specialPriceForm';
const PropSpecialPrice=()=>{

    return (
        <ProtectedRouteTenant>
           <SpecialPriceForm/>
      </ProtectedRouteTenant>
    )
}
export default PropSpecialPrice;