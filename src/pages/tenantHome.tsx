// import { useState, useEffect } from "react";
import PropertyCard from "@/components/property/propCard";
// import { getPropertyData } from "@/api/propertyDataAPI";
import MainNavBarTenant from "@/components/mainNavBarTenant/mainNavBarTenant";
import { useGetAPI } from "@/lib/service";
import ProtectedRouteTenant from "@/components/auth/ProtectedRouteTenant";
import { useContext } from "react";
import { AuthContext } from "@/app/AuthContext";

const TenantHome = () => {
  const { token } = useContext(AuthContext);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data, isLoading, isFetched, isError, refetch } = useGetAPI(`/api/propertyList`, "property", config);

  const displayCard = () => {
    if (data && isFetched) {
      return data.map((property: any, index: number) => <PropertyCard key={index} property={property} />);
    } else refetch();
  };

  return (
    <ProtectedRouteTenant>
      <>
        <MainNavBarTenant />
        <br />

        <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">{displayCard()}</div>
        <br />
        <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">{displayCard()}</div>
        <br />
      </>
    </ProtectedRouteTenant>
  );
};

export default TenantHome;
