import { useGetAPI } from "@/lib/service";
import { useAppSelector } from "@/lib/features/hook";
import { getQuery, random } from "@/lib/features/globalReducer";
import { useContext, useEffect, useState } from "react";
import { Favorite as FavoriteIcon } from "@mui/icons-material";
import { AuthContext } from "@/app/AuthContext";
import InfiniteScroll from "react-infinite-scroll-component";
import Favorite from "./Favorite";

interface IData {
  id: string;
  status: boolean;
  property: {
    id: string;
    name: string;
    image_url: string;
    location: { city: string };
    rooms: { price: number }[];
  };
}

const FavoriteList = () => {
  const query = useAppSelector(getQuery);
  const rand = useAppSelector(random);
  const max = 6;

  const [limit, setLimit] = useState(max);

  const { bearer } = useContext(AuthContext);
  const { data: products, isFetched, refetch } = useGetAPI("/api/property/favorite", "property-favorite", bearer);

  useEffect(() => {
    setTimeout(() => {
      refetch();
    }, 100);
  }, [query, limit, rand]);

  return (
    <div>
      {isFetched && (
        <div>
          {products.rows.length > 0 ? (
            <InfiniteScroll
              dataLength={products.rows.length}
              next={() => {
                if (limit < products.count) setLimit(limit + max / 2);
              }}
              hasMore={true}
              style={{ display: "flex", flexDirection: "column-reverse" }}
              loader={<div></div>}
            >
              <div className="flex flex-grow flex-wrap justify-center">
                {" "}
                {products.rows.map((data: IData) => {
                  return <Favorite key={data.id} data={data.property} status={data.status} />;
                })}{" "}
              </div>
            </InfiniteScroll>
          ) : (
            <div className="text-center mt-20">
              <FavoriteIcon sx={{ fontSize: "200px" }} className="hover:text-[#FC5185] hover:animate-bounce" />
              <p className="text-4xl">Kamu tidak memiliki daftar favorit</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FavoriteList;
