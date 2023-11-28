import { useGetAPI } from "@/lib/service";
import Product from "./Product";

interface IData {
  id: string;
  name: string;
  description: string;
  image_url: string;
  location: { city: string };
}

const ProductList = () => {
  const { data: products, isFetched } = useGetAPI("/api/property", "all-property");
  return (
    <div className="flex flex-wrap justify-around">
      {isFetched && products.map((data: IData) => <Product key={data.id} data={data} />)}
    </div>
  );
};

export default ProductList;
