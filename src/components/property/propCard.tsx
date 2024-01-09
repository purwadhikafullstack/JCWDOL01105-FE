import * as React from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { useDeleteApi } from "@/lib/service";

import { Button } from "@/components/ui/button";
// import { Bold } from "lucide-react"

interface CardProps {
  property: {
    id: number;
    name: string;
    description: string;
    image_url: string;
    category: any;
    // Add other properties as needed
  };
}

const PropertyCard: React.FC<CardProps> = ({ property }: any) => {
  console.log(property);
  const navigate = useNavigate();
  console.log(property.id);

  const config = {
    headers: {
      Accept: "multipart/form-data",
    },
  };
  const { mutate } = useDeleteApi(`/api/propertyList/${property.id}`, config);

  const handleDeleteClick = async () => {
    console.log("ini testing delete id :", property.id);
    try {
      //Sending the property.id to the server
      await mutate(property.id);
    } catch (error) {
      // Handle any errors that may occur during the API call
      console.error("Error editing property data:", error);
    }
  };

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>{property.name}</CardTitle>
        <CardDescription>{property.category.category}</CardDescription>
        <CardDescription>{property.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <img src={property.image_url} />
      </CardContent>
      <CardFooter className="gridcol-3 gap-3">
        <Button
          onClick={() => {
            navigate(`/tenant/propertyEditor/${property.id}`);
          }}
        >
          Details
        </Button>
        <Button
          onClick={() => {
            handleDeleteClick();
          }}
        >
          {" "}
          Delete{" "}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
