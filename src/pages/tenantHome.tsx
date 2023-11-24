import { UserInterface } from "@/lib/interface";
import { useQuery } from "@tanstack/react-query";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useState, useEffect } from "react";
import axios from "axios";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PropertyCard from "@/components/property/propCard";
import { getPropertyData } from "@/api/propertyDataAPI";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

import { useGetAPI , usePostApi} from "@/lib/service";
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

  // fetchPropertyData();
 // console.log(typeof (propData));
  const displayCard = () => {

    return propData.map((property: any, index: number) => ( <PropertyCard key={index} property={property} /> )
    )
  }

// const {data,isError,isFetched}=useGetAPI("/api/propertyList","property");


// console.log(isFetched && data);


// console.log(propData)




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
