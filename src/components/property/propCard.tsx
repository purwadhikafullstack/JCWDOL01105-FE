import * as React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryObserverResult, QueryObserverRefetchErrorResult } from "react-query";
import { useDeleteApi } from "@/lib/service";

import { Button } from "@/components/ui/button";
import { AuthContext } from "@/app/AuthContext";

interface CardProps {
  property: {
    id: number;
    name: string;
    description: string;
    image_url: string;
    category: any;
    // Add other properties as needed
  };

  refetch: () => Promise<QueryObserverResult<any, Error> | QueryObserverRefetchErrorResult<any, Error>>; // Adjust the type according to your useGetAPI function
}

const PropertyCard: React.FC<CardProps> = ({ property, refetch }: any) => {
  console.log(property);
  const navigate = useNavigate();
  console.log(property.id);
  const { token } = useContext(AuthContext);

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };
  const { mutate } = useDeleteApi(`/api/propertyList/${property.id}`, config);

  const handleDeleteClick = async () => {
    console.log("ini testing delete id :", property.id);
    try {
      //Sending the property.id to the server
      await mutate(property.id, { onSuccess: refetch });
    } catch (error) {
      // Handle any errors that may occur during the API call
      console.error("Error editing property data:", error);
    }
  };

  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="break-words overflow-hidden whitespace-nowrap overflow-ellipsis">
          {property.name}
        </CardTitle>
        <CardDescription>{property.category.category}</CardDescription>
        <CardDescription>{property.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <img className="h-[172px] w-full" src={property.image_url} />
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
