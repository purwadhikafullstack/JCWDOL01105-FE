import { useGetAPI } from "@/lib/service";
import { useAppSelector } from "@/lib/features/hook";
import { getFacility, getFilter, getQuery, random } from "@/lib/features/globalReducer";
import { useEffect, useState } from "react";
import { Apartment } from "@mui/icons-material";
import InfiniteScroll from "react-infinite-scroll-component";
import Product from "./Product";
import SkeletonProduct from "./SkeletonProduct";

interface IData {
  id: string;
  name: string;
  description: string;
  image_url: string;
  location: { city: string };
  favorites: { status: boolean; userId: string }[];
  rooms: { price: number }[];
}

const ProductList = () => {
  const query = useAppSelector(getQuery);
  const filter = useAppSelector(getFilter);
  const rand = useAppSelector(random);
  const facility = useAppSelector(getFacility);

  const [limit, setLimit] = useState(4);
  const [params, setParams] = useState(
    `/api/property?city=${query.city}&start=${query.date.from}&end=${query.date.to}&limit=${limit}&apartement=${filter.apartement}&hotel=${filter.hotel}&villa=${filter.villa}&price=${filter.price}&sort=${filter.sort}&facility=${facility}`
  );

  const { data: products, isLoading, refetch } = useGetAPI(params, "all-property");

  useEffect(() => {
    setParams(
      `/api/property?city=${query.city}&start=${query.date.from}&end=${query.date.to}&limit=${limit}&apartement=${filter.apartement}&hotel=${filter.hotel}&villa=${filter.villa}&price=${filter.price}&sort=${filter.sort}&facility=${facility}`
    );
    setTimeout(() => {
      refetch();
    }, 100);
  }, [query, params, limit, facility, rand]);

  return (
    <div>
      {isLoading ? (
        <div>
          <SkeletonProduct />
        </div>
      ) : products.rows.length > 0 ? (
        <InfiniteScroll
          dataLength={products.rows.length}
          next={() => {
            if (limit < products.count) setLimit(limit + 4);
          }}
          hasMore={true}
          style={{ display: "flex", flexDirection: "column-reverse" }}
          loader={<div></div>}
        >
          <div className="flex flex-grow flex-wrap justify-center">
            {" "}
            {products.rows.map((data: IData) => {
              return <Product key={data.id} data={data} />;
            })}{" "}
          </div>
        </InfiniteScroll>
      ) : (
        <div className="text-center mt-20">
          <Apartment sx={{ fontSize: "200px" }} />
          <p className="text-4xl">Property Tidak Ditemukan</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
