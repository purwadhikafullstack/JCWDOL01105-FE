import { useGetAPI } from "@/lib/service";
import { useAppSelector } from "@/lib/features/hook";
import { getQuery } from "@/lib/features/globalReducer";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Apartment } from "@mui/icons-material";
import Product from "./Product";

interface IData {
  id: string;
  name: string;
  description: string;
  image_url: string;
  location: { city: string };
}

const ProductList = () => {
  const query = useAppSelector(getQuery);
  const [limit, setLimit] = useState(8);
  const [params, setParams] = useState(`/api/property?limit=${limit}`);
  const { data: products, isFetched, refetch } = useGetAPI(params, "all-property");
  useEffect(() => {
    setParams(`/api/property?city=${query.city}&start=${query.date.from}&end=${query.date.to}&limit=${limit}`);
    refetch();
  }, [query, params, limit]);

  return (
    <div>
      {isFetched && (
        <div>
          {products.length > 0 ? (
            <div>
              <div className="flex flex-grow flex-wrap justify-center">
                {products.map((data: IData) => {
                  return <Product key={data.id} data={data} />;
                })}{" "}
              </div>
              <div className="flex justify-center h-20">
                <Button onClick={() => setLimit(limit + 4)}>Load More</Button>
              </div>
            </div>
          ) : (
            <div className="text-center mt-20">
              <Apartment sx={{ fontSize: "200px" }} />
              <p className="text-4xl">Property not Found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;
