import * as React from "react"

import { useNavigate } from "react-router"
 
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { getPropertyData } from "@/api/propertyDataAPI"
//import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
  
import { Button } from "@/components/ui/button"


  interface CardProps {
    property: {
        id:number,
        name: string;
        description: string;
        image_url: string;

        // Add other properties as needed
    };
}

const PropertyCard: React.FC<CardProps>= ({property}:any)=> {


    const navigate=useNavigate();

  return (

<Card className="" >
  <CardHeader>
    <CardTitle>{property.name}</CardTitle>
    <CardDescription>{property.description}</CardDescription>
  </CardHeader>
  <CardContent>
    <img src={property.image_url}></img>
  </CardContent>
  <CardFooter>
    <Button onClick={()=>{navigate("/propertyList")}}>Edit Property Data</Button>
  </CardFooter>
</Card>

  );
}

export default PropertyCard;
