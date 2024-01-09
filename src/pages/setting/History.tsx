import { useGetAPI } from "@/lib/service";
import { useContext } from "react";
import { AuthContext } from "@/app/AuthContext";
import { useEffect, useState } from "react";
import { Receipt } from "@mui/icons-material";
import InfiniteScroll from "react-infinite-scroll-component";
import ReviewCard from "@/components/review/reviewCard";

interface IOrder {
  id: number;
  start_date: number;
  end_date: number;
  total_price: number;
  guest: number;
  status: string;
  room: { id: number, image_url: string, propertyId: number };
}

const History = () => {
  const { bearer } = useContext(AuthContext);
  const { data, isFetched, refetch } = useGetAPI(`/api/order/userPastOrders/`, "riwayat-pesanan", bearer);
  const max = 6;
  const [limit, setLimit] = useState(max);

  useEffect(() => {
    refetch();
  }, []);

  return <div className="flex flex-grow flex-wrap justify-center">
    {isFetched && data.rows.length > 0 ? (
      <div>
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
          <div className="flex flex-grow flex-wrap justify-center">
            {" "}
            {data.rows.map((order: IOrder) => (
              <ReviewCard key={order.id} order={order}/>
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
};

export default History;
