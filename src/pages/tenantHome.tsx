import { useState, useEffect } from "react";
import PropertyCard from "@/components/property/propCard";
import { getPropertyData } from "@/api/propertyDataAPI";
import MainNavBarTenant from "@/components/mainNavBarTenant/mainNavBarTenant";
import { useGetAPI } from "@/lib/service";
import ProtectedRouteTenant from "@/components/auth/ProtectedRouteTenant";
import { useContext } from "react";
import { AuthContext } from "@/app/AuthContext";

const TenantHome = () => {
  // ///// TestAPI
  // const { data: user, isFetched } = useQuery({
  //   queryKey: ["user"],
  //   queryFn: async () => {
  //     const res = await axios.get("https://jsonplaceholder.typicode.com/users");
  //     return res.data;
  //   },
  // });


  // const fetchPropertyData = async () => {
  //   try {
  //     const result = await getPropertyData()
  //     console.log(result);
  //     setPropData(result.data.data);
  //   }
  //   catch (error) {
  //     console.error("Error Message :", error);
  //   }

  // };
  // const [propData, setPropData] = useState([]);

  // useEffect(() => { fetchPropertyData() }, [])
  const { id } = useContext(AuthContext);
  const { data, isLoading, isFetched, isError, refetch } = useGetAPI(`/api/propertyList/${id}`, "property");

  console.log(data);

  const displayCard = () => {

    if (data && isFetched) {
      return data.map((property: any, index: number) => (<PropertyCard key={index} property={property} />)
      )
    }
    else (refetch())
  }

  return (
  <ProtectedRouteTenant>
    <>

      <MainNavBarTenant />
      <br />

      <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
        {displayCard()}
      </div>
      <br />
      <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
        {displayCard()}
      </div>
      <br />
    </>
  </ProtectedRouteTenant>
  );
};

export default TenantHome;
