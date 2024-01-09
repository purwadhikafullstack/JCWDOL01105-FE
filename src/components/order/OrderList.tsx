import { useGetAPI } from "@/lib/service";
import { useContext } from "react";
import { AuthContext } from "@/app/AuthContext";
import { useEffect, useState } from "react";
import { Receipt } from "@mui/icons-material";
import InfiniteScroll from "react-infinite-scroll-component";
import Order from "./Order";

interface IOrder {
  id: number;
  start_date: number;
  end_date: number;
  total_price: number;
  guest: number;
  status: string;
  room: { name: string; image_url: string };
}

const OrderList = () => {
  const { bearer } = useContext(AuthContext);
  const { data, isFetched, refetch } = useGetAPI(`/api/order/user`, "orderlist", bearer);

  const max = 6;
  const [limit, setLimit] = useState(max);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="flex flex-grow flex-wrap justify-center text-base">
      {isFetched && data.rows.length > 0 ? (
        <div className="">
          {" "}
          <InfiniteScroll
            dataLength={data.rows.length}
            next={() => {
              if (limit < data.count) setLimit(limit + max / 2);
            }}
            hasMore={true}
            style={{ display: "flex", flexDirection: "column-reverse" }}
            loader={<div></div>}
          >
            <div className="flex flex-grow flex-wrap justify-center overflow-scroll h-[75vh]">
              {" "}
              {data.rows.map((order: IOrder) => (
                <Order key={order.id} order={order} />
              ))}{" "}
            </div>
          </InfiniteScroll>
        </div>
      ) : (
        <div className="text-center mt-20">
          <Receipt sx={{ fontSize: "200px" }} />
          <p className="text-4xl">Belum ada transaksi</p>
        </div>
      )}
    </div>
  );
};

export default OrderList;
