import PropertyCard from "@/components/property/propCard";
import MainNavBarTenant from "@/components/mainNavBarTenant/mainNavBarTenant";
import { useGetAPI } from "@/lib/service";
import ProtectedRouteTenant from "@/components/auth/ProtectedRouteTenant";
import { useContext } from "react";
import { AuthContext } from "@/app/AuthContext";

const TenantHome = () => {

  const {token} = useContext(AuthContext);
  const config = {
    headers: {
       Authorization: `Bearer ${token}`
    },
  }
  const { data, isLoading, isFetched, isError, refetch } = useGetAPI(`/api/propertyList`, "property",config);



  const displayCard = () => {

    if (data && isFetched) {
      return data.map((property: any, index: number) => (<PropertyCard key={index} refetch={refetch} property={property} />)
      )
    }
    else {
      //refetch()
    return null;}
  }

  return (
  <ProtectedRouteTenant>
    <>

      <MainNavBarTenant />
      <br />

      <div className="grid w-[300px] gap-3 p-4 md:w-[500px] md:grid-cols-4 lg:w-screen ">
        {displayCard()}
      </div>
      <br />
    </>
  </ProtectedRouteTenant>
  );
};

export default TenantHome;
