import { useState, useEffect } from "react";
import PropertyCard from "@/components/property/propCard";
import { getPropertyData } from "@/api/propertyDataAPI";
import MainNavBarTenant from "@/components/mainNavBarTenant/mainNavBarTenant";


const TenantHome = () => {
  // ///// TestAPI
  // const { data: user, isFetched } = useQuery({
  //   queryKey: ["user"],
  //   queryFn: async () => {
  //     const res = await axios.get("https://jsonplaceholder.typicode.com/users");
  //     return res.data;
  //   },
  // });


  const fetchPropertyData = async () => {
    try {
      const result = await getPropertyData()
      console.log(result);
      setPropData(result.data.data);
    }
    catch (error) {
      console.error("Error Message :", error);
    }

  };
  const [propData, setPropData] = useState([]);

  useEffect(() => { fetchPropertyData() }, [])

  const displayCard = () => {

    return propData.map((property: any, index: number) => ( <PropertyCard key={index} property={property} /> )
    )
  }

  return (
    <>
    <MainNavBarTenant/>
    <br/>

    <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
      {displayCard()}
    </div>
    <br/>
    </>
  );
};

export default TenantHome;
