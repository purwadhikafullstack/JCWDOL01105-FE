import { useGetAPI } from "@/lib/service";
import Product from "./Product";
import { useAppSelector } from "@/lib/features/hook";
import { getQuery } from "@/lib/features/globalReducer";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

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
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 m-auto">
        {isFetched && products.map((data: IData) => <Product key={data.id} data={data} />)}
      </div>
      <div className="flex justify-center h-20">
        <Button onClick={() => setLimit(limit + 4)}>Load More</Button>
      </div>
    </div>
  );
};

export default ProductList;
